/**
 * 스폰지클럽 1기 사전 서베이 — Google Apps Script 백엔드
 *
 * 사용 방법:
 * 1. 새 Google 스프레드시트 생성
 * 2. 확장 프로그램 → Apps Script
 * 3. 이 파일의 코드 전체를 복사해서 붙여넣기
 * 4. 배포 → 새 배포 → 유형: 웹 앱
 *    - 다음 사용자 인증으로 실행: 나
 *    - 액세스 권한이 있는 사용자: 모든 사용자
 * 5. 발급되는 웹 앱 URL을 index.html의 SURVEY_ENDPOINT에 입력
 */

const SHEET_NAME = 'submissions';

const HEADERS = [
  'submittedAt',
  'Q1_이름',
  'Q2_이메일',
  'Q3_연락처',
  'Q4_GitHub이메일',
  'Q5_현재하는일',
  'Q6_카테고리',
  'Q6_기타입력',
  'Q7_참여이유',
  'Q8_AI사용경험',
  'Q9_바이브코딩',
  'Q10_Claude사용',
  'Q11_막힌점',
  'Q12_시간확보',
  'Q13_포기할것',
  'Q14_불참주차',
  'Q15_사유',
  'Q16_W6오프라인',
  'Q17_지역',
  'Q18_부조장',
  'Q19_부조장이유',
  'Q20_기억되고싶은모습',
  'Q21_집중영역',
  'Q22_다짐'
];

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
    }

    // 헤더 초기화
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#0a0a0a')
        .setFontColor('#ffffff');
      sheet.setColumnWidths(1, HEADERS.length, 180);
    }

    const data = JSON.parse(e.postData.contents);
    const q14 = Array.isArray(data.q14) ? data.q14.join(', ') : (data.q14 || '');

    const row = [
      data.submittedAt || new Date().toISOString(),
      data.q1 || '',
      data.q2 || '',
      data.q3 || '',
      data.q4 || '',
      data.q5 || '',
      data.q6 || '',
      data.q6_other || '',
      data.q7 || '',
      data.q8 || '',
      data.q9 || '',
      data.q10 || '',
      data.q11 || '',
      data.q12 || '',
      data.q13 || '',
      q14,
      data.q15 || '',
      data.q16 || '',
      data.q17 || '',
      data.q18 || '',
      data.q19 || '',
      data.q20 || '',
      data.q21 || '',
      data.q22 || ''
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Sponge Club Survey API is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
