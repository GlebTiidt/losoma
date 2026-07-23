<?php
declare(strict_types=1);

// Copy to domains/losoma.de/private/contact-config.php on Hostinger.
// Never place the real file in public_html or Git.
return [
    'webhook_url' => '',
    'webhook_secret' => '',
    'recipient' => 'maxim@losoma.de',
    'state_dir' => __DIR__ . '/contact-state',
    'rate_limit_max' => 5,
    'rate_limit_window_seconds' => 600,
    'trust_proxy_headers' => false,
    'recaptcha' => [
        'enabled' => false,
        'secret_key' => '',
        'min_score' => 0.5,
        'expected_action' => 'contact',
        'allowed_hostnames' => ['losoma.de', 'www.losoma.de'],
    ],
];
