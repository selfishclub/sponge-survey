// 공통 상수 및 유틸 — Vercel Functions 공용

export const HEADERS = [
  'submittedAt',
  'Q1_이름',
  'Q2_이메일',
  'Q3_연락처',
  '연령대',
  'Q4_GitHub이메일',
  'Q5_현재하는일',
  'Q6_카테고리',
  'Q6_기타입력',
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
  'Q22_다짐',
];

const KEY_MAP = {
  q1: 'Q1_이름',
  q2: 'Q2_이메일',
  q3: 'Q3_연락처',
  q_age: '연령대',
  q4: 'Q4_GitHub이메일',
  q5: 'Q5_현재하는일',
  q6: 'Q6_카테고리',
  q6_other: 'Q6_기타입력',
  q8: 'Q8_AI사용경험',
  q9: 'Q9_바이브코딩',
  q10: 'Q10_Claude사용',
  q11: 'Q11_막힌점',
  q12: 'Q12_시간확보',
  q13: 'Q13_포기할것',
  q14: 'Q14_불참주차',
  q15: 'Q15_사유',
  q16: 'Q16_W6오프라인',
  q17: 'Q17_지역',
  q18: 'Q18_부조장',
  q19: 'Q19_부조장이유',
  q20: 'Q20_기억되고싶은모습',
  q21: 'Q21_집중영역',
  q22: 'Q22_다짐',
};

export function normalize(raw) {
  const q14 = Array.isArray(raw.q14) ? raw.q14.join(', ') : (raw.q14 || '');
  const result = { submittedAt: raw.submittedAt || new Date().toISOString() };
  for (const [src, dst] of Object.entries(KEY_MAP)) {
    if (src === 'q14') {
      result[dst] = q14;
    } else {
      result[dst] = raw[src] ?? '';
    }
  }
  return result;
}

export function csvEscape(value) {
  const s = (value ?? '').toString();
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function checkAuth(req) {
  const auth = req.headers.authorization || req.headers.Authorization || '';
  const token = auth.replace(/^Bearer\s+/i, '').trim();
  return process.env.ADMIN_TOKEN && token && token === process.env.ADMIN_TOKEN;
}
