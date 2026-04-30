# 🧽 스폰지클럽 1기 사전 서베이

Vercel + Vercel KV 기반 자체 서베이 시스템.

## 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 응답 페이지 (사용자용) |
| `admin.html` | 관리자 페이지 (`/admin` 경로) |
| `api/submit.js` | POST — 응답 저장 |
| `api/list.js` | GET — 응답 목록 (Bearer 인증) |
| `api/csv.js` | GET — CSV 다운로드 (Bearer 인증) |
| `api/count.js` | GET — 응답 개수 (공개) |
| `vercel.json` | `/admin` → `admin.html` 라우팅 |

## 배포 (Vercel)

1. https://vercel.com 가입 → GitHub 연동
2. `selfishclub/sponge` repo Import → Deploy
3. 대시보드 → **Storage → Create Database → Upstash for Redis** 활성화
   - 환경변수(`KV_*`) 자동 주입됨
4. **Settings → Environment Variables**:
   - `ADMIN_TOKEN` = 운영진 비밀번호 (어드민 로그인용)
5. Redeploy

## 동작 확인

- 사이트: `https://{project}.vercel.app/`
- 어드민: `https://{project}.vercel.app/admin`
  - 로그인: `ADMIN_TOKEN` 입력
  - 응답 표 + 통계 + CSV/TSV 내보내기

## 로컬 개발

```bash
npm install
npx vercel dev
```
