/**
 * Nguyên Kim — Nhận phản hồi từ website khảo sát.
 *
 * Cách dùng: mở Google Sheet đã tạo > Extensions > Apps Script,
 * thay toàn bộ nội dung mặc định bằng file này rồi triển khai dưới dạng Web app.
 */
const SPREADSHEET_ID = '1KnlrbpRAFwiVJLX-Rcy3IbNsTsQkU0GftcTg6tlr3WU';
const SHEET_NAME = 'Phản hồi';

function doGet() {
  return jsonResponse({ ok: true, message: 'NKC Survey endpoint is ready.' });
}

function doPost(event) {
  try {
    const data = JSON.parse(event.postData.contents || '{}');
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Không tìm thấy trang tính “' + SHEET_NAME + '”.');
    }

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.purpose || '',
      listToText(data.channels),
      data.attentionChoice || '',
      listToText(data.attentionReason),
      data.understandProduct || '',
      data.firstInfo || '',
      listToText(data.remember),
      data.readability || '',
      data.infoAmount || '',
      data.mainBenefit || '',
      data.wantMore || '',
      listToText(data.difficulty),
      listToText(data.improve),
      data.feedback || '',
      data.respondent?.name || '',
      data.respondent?.company || '',
      data.respondent?.position || '',
      data.respondent?.contact || '',
      data.valueTradeoff || '',
      data.decisionSwitch || '',
      data.fullName || data.respondent?.name || '',
      data.phone || data.respondent?.phone || data.respondent?.contact || '',
      data.email || data.respondent?.email || ''
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function listToText(value) {
  return Array.isArray(value) ? value.join(' | ') : (value || '');
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
