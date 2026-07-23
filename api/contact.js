const crypto = require("crypto");

const DEFAULT_RATE_LIMIT_MAX = 5;
const DEFAULT_RATE_LIMIT_WINDOW_SECONDS = 10 * 60;
const DUPLICATE_TTL_MS = 2 * 60 * 1000;
const MAX_BODY_BYTES = 20 * 1024;

const rateBuckets = new Map();
const recentSubmissions = new Map();

const serviceLabels = {
  hausmeisterservice: "Hausmeisterservice",
  treppenhausreinigung: "Treppenhaus- & Gemeinschaftsreinigung",
  "gewerbliche-reinigung": "Gewerbliche Reinigung",
  grundreinigung: "Grundreinigung",
  industriereinigung: "Industriereinigung",
  winterdienst: "Winterdienst",
  "garten-landschaftspflege": "Garten- & Landschaftspflege",
  "fassaden-hoehenarbeiten": "Fassaden- & Höhenarbeiten",
  solaranlagenreinigung: "Solaranlagenreinigung",
};

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.trim()) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function cleanupMap(map, now) {
  for (const [key, value] of map.entries()) {
    if (value.expiresAt <= now) {
      map.delete(key);
    }
  }
}

function checkRateLimit(ip) {
  const now = Date.now();
  const windowSeconds = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_SECONDS) || DEFAULT_RATE_LIMIT_WINDOW_SECONDS;
  const maxRequests = Number(process.env.CONTACT_RATE_LIMIT_MAX) || DEFAULT_RATE_LIMIT_MAX;
  const windowMs = windowSeconds * 1000;

  cleanupMap(rateBuckets, now);

  const bucket = rateBuckets.get(ip);

  if (!bucket || bucket.expiresAt <= now) {
    rateBuckets.set(ip, { count: 1, expiresAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  bucket.count += 1;

  if (bucket.count > maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.expiresAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

function normalizeString(value, maxLength) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function buildSubmissionHash(payload) {
  const normalized = [
    payload.name.toLowerCase(),
    payload.email.toLowerCase(),
    payload.phone,
    payload.service,
    payload.message.toLowerCase(),
  ].join("|");

  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function checkDuplicate(hash) {
  const now = Date.now();

  cleanupMap(recentSubmissions, now);

  if (recentSubmissions.has(hash)) {
    return true;
  }

  recentSubmissions.set(hash, { expiresAt: now + DUPLICATE_TTL_MS });

  return false;
}

function validatePayload(body) {
  const payload = {
    name: normalizeString(body.name, 120),
    email: normalizeString(body.email, 180).toLowerCase(),
    phone: normalizeString(body.phone || body.phone_display, 40),
    service: normalizeString(body.service, 80),
    message: normalizeString(body.message, 2000),
    companyWebsite: normalizeString(body.company_website, 200),
    privacyConsent: body.privacy_consent === true || body.privacy_consent === "yes",
    sourcePath: normalizeString(body.source_path, 240),
  };

  if (payload.companyWebsite) {
    return { ok: true, payload, spam: true };
  }

  if (!payload.name || !/^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*$/u.test(payload.name)) {
    return { ok: false, status: 400, message: "Invalid name." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email)) {
    return { ok: false, status: 400, message: "Invalid email." };
  }

  if (!/^\+?[0-9 ()/.-]{6,40}$/.test(payload.phone)) {
    return { ok: false, status: 400, message: "Invalid phone." };
  }

  if (!serviceLabels[payload.service]) {
    return { ok: false, status: 400, message: "Invalid service." };
  }

  if (!payload.privacyConsent) {
    return { ok: false, status: 400, message: "Privacy consent is required." };
  }

  return { ok: true, payload, spam: false };
}

async function deliverSubmission(payload, req) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("CONTACT_WEBHOOK_URL is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-contact-secret": process.env.CONTACT_WEBHOOK_SECRET || "",
    },
    body: JSON.stringify({
      ...payload,
      service_label: serviceLabels[payload.service],
      submitted_at: new Date().toISOString(),
      recipient: process.env.CONTACT_TO_EMAIL || "maxim@losoma.de",
      user_agent: req.headers["user-agent"] || "",
      webhook_secret: process.env.CONTACT_WEBHOOK_SECRET || "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook failed with ${response.status}.`);
  }

  const responseText = await response.text();

  if (!responseText) {
    throw new Error("Contact webhook returned an empty response.");
  }

  let result = null;

  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error("Contact webhook returned a non-JSON response.");
  }

  if (result.ok !== true) {
    const rejectionMessage = typeof result.message === "string"
      ? result.message.slice(0, 200)
      : "No rejection message provided";

    console.error(`Contact webhook rejection: ${rejectionMessage}`);
    throw new Error("Contact webhook rejected the submission.");
  }
}

module.exports = async function contactHandler(req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");

  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    res.status(405).end(JSON.stringify({ ok: false, message: "Method not allowed." }));
    return;
  }

  const bodyText = typeof req.body === "string" ? req.body : JSON.stringify(req.body || {});

  if (Buffer.byteLength(bodyText, "utf8") > MAX_BODY_BYTES) {
    res.status(413).end(JSON.stringify({ ok: false, message: "Request body is too large." }));
    return;
  }

  const ip = getClientIp(req);
  const rateLimit = checkRateLimit(ip);

  if (!rateLimit.allowed) {
    res.setHeader("retry-after", String(rateLimit.retryAfter));
    res.status(429).end(JSON.stringify({ ok: false, message: "Too many requests." }));
    return;
  }

  let body = {};

  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    res.status(400).end(JSON.stringify({ ok: false, message: "Invalid JSON." }));
    return;
  }

  const validation = validatePayload(body);

  if (!validation.ok) {
    res.status(validation.status).end(JSON.stringify({ ok: false, message: validation.message }));
    return;
  }

  if (validation.spam) {
    res.status(200).end(JSON.stringify({ ok: true }));
    return;
  }

  const hash = buildSubmissionHash(validation.payload);

  if (checkDuplicate(hash)) {
    res.status(409).end(JSON.stringify({ ok: false, message: "Duplicate submission." }));
    return;
  }

  try {
    await deliverSubmission(validation.payload, req);
    res.status(200).end(JSON.stringify({ ok: true }));
  } catch (error) {
    console.error(error);
    res.status(503).end(JSON.stringify({ ok: false, message: "Contact delivery is not configured." }));
  }
};
