const SHEET_NAME = "Anfragen";
const SPREADSHEET_ID = "1yaw-UptCIAixOORNwTrwnbrqoeraSiU4iEoV8HMyvxU";
const RECIPIENT_EMAIL = "maxim@losoma.de";

function doPost(event) {
  if (!event || !event.postData || !event.postData.contents) {
    return jsonResponse({ ok: false, message: "Request body is missing" });
  }

  let payload;

  try {
    payload = JSON.parse(event.postData.contents);
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: "Invalid JSON" });
  }

  const props = PropertiesService.getScriptProperties();
  const expectedSecret = String(
    props.getProperty("CONTACT_WEBHOOK_SECRET") || "",
  ).trim();
  const receivedSecret = String(payload.webhook_secret || "").trim();

  if (!expectedSecret || receivedSecret !== expectedSecret) {
    return jsonResponse({ ok: false, message: "Unauthorized" });
  }

  let spreadsheet;

  try {
    spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: "Spreadsheet access failed" });
  }

  const lock = LockService.getScriptLock();

  if (!lock.tryLock(10000)) {
    return jsonResponse({ ok: false, message: "Spreadsheet is busy" });
  }

  try {
    const sheet = spreadsheet.getSheetByName(SHEET_NAME)
      || spreadsheet.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Zeitpunkt",
        "Name",
        "E-Mail",
        "Telefon",
        "Leistung",
        "Nachricht",
        "Quelle",
        "User Agent",
      ]);
    }

    sheet.appendRow([
      safeCell(payload.submitted_at || new Date().toISOString()),
      safeCell(payload.name),
      safeCell(payload.email),
      safeCell(payload.phone),
      safeCell(payload.service_label || payload.service),
      safeCell(payload.message),
      safeCell(payload.sourcePath || payload.source_path),
      safeCell(payload.user_agent),
    ]);
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: "Spreadsheet write failed" });
  } finally {
    lock.releaseLock();
  }

  const emailOptions = {
    to: String(payload.recipient || RECIPIENT_EMAIL).trim(),
    subject: `Neue Losoma Anfrage: ${payload.service_label || "Kontaktformular"}`,
    htmlBody: [
      `<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>`,
      `<p><strong>E-Mail:</strong> ${escapeHtml(payload.email)}</p>`,
      `<p><strong>Telefon:</strong> ${escapeHtml(payload.phone)}</p>`,
      `<p><strong>Leistung:</strong> ${escapeHtml(payload.service_label || payload.service)}</p>`,
      `<p><strong>Nachricht:</strong><br>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>`,
      `<p><strong>Quelle:</strong> ${escapeHtml(payload.sourcePath || payload.source_path)}</p>`,
    ].join(""),
  };

  const replyTo = String(payload.email || "").trim();

  if (replyTo) {
    emailOptions.replyTo = replyTo;
  }

  try {
    MailApp.sendEmail(emailOptions);
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: "Email delivery failed" });
  }

  return jsonResponse({ ok: true });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function safeCell(value) {
  const text = String(value || "");
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
