const SHEET_NAME = 'Registrations';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    _appendRow(data);
    _sendConfirmation(data);
  } catch (err) {
    // swallow — don't surface errors to client
  }
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function _appendRow(d) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['ID', 'Name', 'Email', 'Instagram', 'Registered At']);
    sheet.setFrozenRows(1);
  }
  sheet.appendRow([d.id, d.name, d.email, d.instagram || '', d.registered_at]);
}

function _sendConfirmation(d) {
  const firstName = d.name.split(' ')[0];
  MailApp.sendEmail({
    to: d.email,
    subject: "TSA CAFE — You're on the list",
    htmlBody: `
      <div style="font-family:Georgia,serif;color:#0d0b08;max-width:480px;margin:0 auto">
        <p style="letter-spacing:.12em;font-size:11px;text-transform:uppercase;color:#c5a369">
          T's Armoire
        </p>
        <h1 style="font-size:2rem;margin:.25em 0">Thank you, ${firstName}.</h1>
        <p style="line-height:1.7">
          We've received your interest in <strong>TSA CAFE</strong> on <strong>May 12</strong>.
          Our guest list is curated and intimate — if selected, we'll reach out to you directly.
          Keep an eye on your inbox.
        </p>
        <p style="line-height:1.7;color:#888;font-size:.875rem">
          — The T's Armoire Team
        </p>
      </div>
    `
  });
}
