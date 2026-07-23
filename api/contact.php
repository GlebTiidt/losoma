<?php
declare(strict_types=1);

const MAX_BODY_BYTES = 20480;
const DUPLICATE_TTL_SECONDS = 120;

const SERVICE_LABELS = [
    'hausmeisterservice' => 'Hausmeisterservice',
    'treppenhausreinigung' => 'Treppenhaus- & Gemeinschaftsreinigung',
    'gewerbliche-reinigung' => 'Gewerbliche Reinigung',
    'grundreinigung' => 'Grundreinigung',
    'industriereinigung' => 'Industriereinigung',
    'winterdienst' => 'Winterdienst',
    'garten-landschaftspflege' => 'Garten- & Landschaftspflege',
    'fassaden-hoehenarbeiten' => 'Fassaden- & Höhenarbeiten',
    'solaranlagenreinigung' => 'Solaranlagenreinigung',
];

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body, array $headers = []): never
{
    http_response_code($status);

    foreach ($headers as $name => $value) {
        header($name . ': ' . $value);
    }

    echo json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function normalize_string(mixed $value, int $maxLength): string
{
    $text = trim((string) ($value ?? ''));
    $text = preg_replace('/\s+/u', ' ', $text) ?? '';
    return mb_substr($text, 0, $maxLength);
}

function load_config(): array
{
    $configuredPath = getenv('LOSOMA_CONTACT_CONFIG');
    $configPath = is_string($configuredPath) && $configuredPath !== ''
        ? $configuredPath
        : dirname(__DIR__, 2) . '/private/contact-config.php';

    if (!is_file($configPath)) {
        throw new RuntimeException('Contact config is missing.');
    }

    $config = require $configPath;

    if (!is_array($config)) {
        throw new RuntimeException('Contact config is invalid.');
    }

    foreach (['webhook_url', 'webhook_secret', 'recipient', 'state_dir'] as $key) {
        if (!isset($config[$key]) || !is_string($config[$key]) || trim($config[$key]) === '') {
            throw new RuntimeException('Contact config is incomplete.');
        }
    }

    return $config;
}

function client_ip(array $config): string
{
    if (($config['trust_proxy_headers'] ?? false) === true) {
        foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR'] as $header) {
            $raw = (string) ($_SERVER[$header] ?? '');
            $candidate = trim(explode(',', $raw)[0] ?? '');

            if (filter_var($candidate, FILTER_VALIDATE_IP)) {
                return $candidate;
            }
        }
    }

    $remoteAddress = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    return filter_var($remoteAddress, FILTER_VALIDATE_IP) ? $remoteAddress : 'unknown';
}

function mutate_json_state(string $path, callable $callback): mixed
{
    $handle = fopen($path, 'c+');

    if ($handle === false || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('Contact state is unavailable.');
    }

    try {
        rewind($handle);
        $raw = stream_get_contents($handle);
        $state = is_string($raw) && $raw !== '' ? json_decode($raw, true) : [];
        $state = is_array($state) ? $state : [];
        [$nextState, $result] = $callback($state);
        $encoded = json_encode($nextState, JSON_UNESCAPED_SLASHES);

        if (!is_string($encoded)) {
            throw new RuntimeException('Contact state cannot be encoded.');
        }

        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, $encoded);
        fflush($handle);
        return $result;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function ensure_state_dir(string $stateDir): void
{
    if (!is_dir($stateDir) && !mkdir($stateDir, 0700, true) && !is_dir($stateDir)) {
        throw new RuntimeException('Contact state directory cannot be created.');
    }

    if (!is_writable($stateDir)) {
        throw new RuntimeException('Contact state directory is not writable.');
    }
}

function enforce_rate_limit(array $config, string $ip): void
{
    $now = time();
    $maxRequests = max(1, (int) ($config['rate_limit_max'] ?? 5));
    $windowSeconds = max(60, (int) ($config['rate_limit_window_seconds'] ?? 600));
    $key = hash('sha256', $ip);
    $path = rtrim($config['state_dir'], '/') . '/rate-limits.json';

    $result = mutate_json_state($path, static function (array $state) use (
        $now,
        $maxRequests,
        $windowSeconds,
        $key
    ): array {
        $state = array_filter(
            $state,
            static fn (mixed $bucket): bool => is_array($bucket)
                && (int) ($bucket['expires_at'] ?? 0) > $now
        );
        $bucket = $state[$key] ?? null;

        if (!is_array($bucket)) {
            $state[$key] = ['count' => 1, 'expires_at' => $now + $windowSeconds];
            return [$state, ['allowed' => true, 'retry_after' => 0]];
        }

        $bucket['count'] = (int) ($bucket['count'] ?? 0) + 1;
        $state[$key] = $bucket;
        $retryAfter = max(1, (int) $bucket['expires_at'] - $now);

        return [$state, [
            'allowed' => $bucket['count'] <= $maxRequests,
            'retry_after' => $retryAfter,
        ]];
    });

    if (($result['allowed'] ?? false) !== true) {
        respond(429, ['ok' => false, 'message' => 'Too many requests.'], [
            'Retry-After' => (string) ($result['retry_after'] ?? 60),
        ]);
    }
}

function reject_duplicate(array $config, array $payload): void
{
    $now = time();
    $normalized = implode('|', [
        mb_strtolower($payload['name']),
        mb_strtolower($payload['email']),
        $payload['phone'],
        $payload['service'],
        mb_strtolower($payload['message']),
    ]);
    $hash = hash('sha256', $normalized);
    $path = rtrim($config['state_dir'], '/') . '/recent-submissions.json';

    $isDuplicate = mutate_json_state($path, static function (array $state) use ($now, $hash): array {
        $state = array_filter(
            $state,
            static fn (mixed $expiresAt): bool => (int) $expiresAt > $now
        );
        $duplicate = isset($state[$hash]);

        if (!$duplicate) {
            $state[$hash] = $now + DUPLICATE_TTL_SECONDS;
        }

        return [$state, $duplicate];
    });

    if ($isDuplicate === true) {
        respond(409, ['ok' => false, 'message' => 'Duplicate submission.']);
    }
}

function verify_recaptcha(array $config, string $token): void
{
    $recaptcha = $config['recaptcha'] ?? [];

    if (($recaptcha['enabled'] ?? false) !== true) {
        return;
    }

    $secret = trim((string) ($recaptcha['secret_key'] ?? ''));

    if ($secret === '' || $token === '') {
        respond(400, ['ok' => false, 'message' => 'CAPTCHA verification failed.']);
    }

    $handle = curl_init('https://www.google.com/recaptcha/api/siteverify');
    curl_setopt_array($handle, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'secret' => $secret,
            'response' => $token,
            'remoteip' => client_ip($config),
        ]),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 10,
    ]);
    $raw = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);
    $result = is_string($raw) ? json_decode($raw, true) : null;
    $expectedAction = (string) ($recaptcha['expected_action'] ?? 'contact');
    $allowedHostnames = $recaptcha['allowed_hostnames'] ?? ['losoma.de', 'www.losoma.de'];
    $score = (float) ($result['score'] ?? 0);
    $minimumScore = (float) ($recaptcha['min_score'] ?? 0.5);

    if (
        $status !== 200
        || !is_array($result)
        || ($result['success'] ?? false) !== true
        || !hash_equals($expectedAction, (string) ($result['action'] ?? ''))
        || !in_array((string) ($result['hostname'] ?? ''), $allowedHostnames, true)
        || $score < $minimumScore
    ) {
        respond(400, ['ok' => false, 'message' => 'CAPTCHA verification failed.']);
    }
}

function deliver(array $config, array $payload): void
{
    $delivery = [
        'name' => $payload['name'],
        'email' => $payload['email'],
        'phone' => $payload['phone'],
        'service' => $payload['service'],
        'service_label' => SERVICE_LABELS[$payload['service']],
        'message' => $payload['message'],
        'sourcePath' => $payload['source_path'],
        'submitted_at' => gmdate('c'),
        'recipient' => $config['recipient'],
        'user_agent' => normalize_string($_SERVER['HTTP_USER_AGENT'] ?? '', 500),
        'webhook_secret' => $config['webhook_secret'],
    ];
    $handle = curl_init($config['webhook_url']);
    curl_setopt_array($handle, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($delivery, JSON_UNESCAPED_UNICODE),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'X-Contact-Secret: ' . $config['webhook_secret'],
        ],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_MAXREDIRS => 3,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_TIMEOUT => 15,
    ]);
    $raw = curl_exec($handle);
    $status = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
    curl_close($handle);
    $result = is_string($raw) ? json_decode($raw, true) : null;

    if ($status < 200 || $status >= 300 || !is_array($result) || ($result['ok'] ?? false) !== true) {
        throw new RuntimeException('Contact webhook rejected the submission.');
    }
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Method not allowed.'], ['Allow' => 'POST']);
}

$declaredLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);

if ($declaredLength > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'message' => 'Request body is too large.']);
}

$rawBody = file_get_contents('php://input');

if (!is_string($rawBody) || strlen($rawBody) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'message' => 'Request body is too large.']);
}

$body = json_decode($rawBody, true);

if (!is_array($body)) {
    respond(400, ['ok' => false, 'message' => 'Invalid JSON.']);
}

$payload = [
    'name' => normalize_string($body['name'] ?? '', 120),
    'email' => mb_strtolower(normalize_string($body['email'] ?? '', 180)),
    'phone' => normalize_string($body['phone'] ?? $body['phone_display'] ?? '', 40),
    'service' => normalize_string($body['service'] ?? '', 80),
    'message' => normalize_string($body['message'] ?? '', 2000),
    'company_website' => normalize_string($body['company_website'] ?? '', 200),
    'privacy_consent' => ($body['privacy_consent'] ?? false) === true
        || ($body['privacy_consent'] ?? '') === 'yes',
    'source_path' => normalize_string($body['source_path'] ?? '', 240),
    'recaptcha_token' => normalize_string($body['recaptcha_token'] ?? '', 4096),
];

if ($payload['company_website'] !== '') {
    respond(200, ['ok' => true]);
}

if ($payload['name'] === '' || preg_match('/^[\p{L}\p{M}][\p{L}\p{M}\s\x{2019}\x{0027}.-]*$/u', $payload['name']) !== 1) {
    respond(400, ['ok' => false, 'message' => 'Invalid name.']);
}

if (filter_var($payload['email'], FILTER_VALIDATE_EMAIL) === false) {
    respond(400, ['ok' => false, 'message' => 'Invalid email.']);
}

if (preg_match('/^\+?[0-9 ()\/.-]{6,40}$/', $payload['phone']) !== 1) {
    respond(400, ['ok' => false, 'message' => 'Invalid phone.']);
}

if (!array_key_exists($payload['service'], SERVICE_LABELS)) {
    respond(400, ['ok' => false, 'message' => 'Invalid service.']);
}

if ($payload['privacy_consent'] !== true) {
    respond(400, ['ok' => false, 'message' => 'Privacy consent is required.']);
}

try {
    $config = load_config();
    ensure_state_dir($config['state_dir']);
    enforce_rate_limit($config, client_ip($config));
    verify_recaptcha($config, $payload['recaptcha_token']);
    reject_duplicate($config, $payload);
    deliver($config, $payload);
    respond(200, ['ok' => true]);
} catch (Throwable $error) {
    error_log('Losoma contact error: ' . $error->getMessage());
    respond(503, ['ok' => false, 'message' => 'Contact delivery is unavailable.']);
}
