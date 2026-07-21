const SHEET_NAME = "Anfragen";
const RECIPIENT_EMAIL = "losoma@web.de";

function doPost(event) {
  const props = PropertiesService.getScriptProperties();
  const expectedSecret = props.getProperty("CONTACT_WEBHOOK_SECRET");
  const spreadsheetId = props.getProperty("SPREADSHEET_ID");
  const payload = JSON.parse(event.postData.contents || "{}");

  if (!expectedSecret || payload.webhook_secret !== expectedSecret) {
    return jsonResponse({ ok: false, message: "Unauthorized" });
  }

  const spreadsheet = spreadsheetId
    ? SpreadsheetApp.openById(spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    return jsonResponse({ ok: false, message: "Spreadsheet is not configured" });
  }

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
    payload.submitted_at || new Date().toISOString(),
    payload.name || "",
    payload.email || "",
    payload.phone || "",
    payload.service_label || payload.service || "",
    payload.message || "",
    payload.sourcePath || payload.source_path || "",
    payload.user_agent || "",
  ]);

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: `Neue Losoma Anfrage: ${payload.service_label || "Kontaktformular"}`,
    replyTo: payload.email || undefined,
    htmlBody: [
      `<p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>`,
      `<p><strong>E-Mail:</strong> ${escapeHtml(payload.email)}</p>`,
      `<p><strong>Telefon:</strong> ${escapeHtml(payload.phone)}</p>`,
      `<p><strong>Leistung:</strong> ${escapeHtml(payload.service_label || payload.service)}</p>`,
      `<p><strong>Nachricht:</strong><br>${escapeHtml(payload.message).replace(/\n/g, "<br>")}</p>`,
      `<p><strong>Quelle:</strong> ${escapeHtml(payload.sourcePath || payload.source_path)}</p>`,
    ].join(""),
  });

  return jsonResponse({ ok: true });
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
