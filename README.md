# 🧽 스폰지클럽 1기 사전 서베이

GitHub Pages로 호스팅하는 정적 서베이 사이트. 응답은 Google Sheets에 자동 누적됩니다.

## 구조
- `index.html` — 단일 파일 서베이 (Tailwind CDN + 바닐라 JS)
- `apps-script.gs` — 응답을 시트에 적재하는 Google Apps Script

## Google Sheets 연동 셋업 (1회만)

1. **새 Google 스프레드시트 생성** → 적당한 이름(예: `스폰지클럽 1기 응답`)
2. 메뉴 **확장 프로그램 → Apps Script** 클릭
3. 기본 코드 전부 지우고 [`apps-script.gs`](apps-script.gs) 내용 붙여넣기 → 💾 저장
4. 우측 상단 **배포 → 새 배포**
   - 유형: ⚙️ → **웹 앱**
   - 설명: `스폰지클럽 서베이 v1`
   - **다음 사용자 인증으로 실행**: `나(claude.selfish@gmail.com)`
   - **액세스 권한이 있는 사용자**: `모든 사용자`
   - **배포** 클릭 → 권한 승인
5. 발급된 **웹 앱 URL** 복사 (`https://script.google.com/macros/s/.../exec`)
6. `index.html`에서 `REPLACE_WITH_GAS_WEB_APP_URL` 부분을 위 URL로 교체
7. 변경사항 커밋 + push → Pages 자동 재배포

## 동작 확인

- 사이트에서 1건 제출 → 시트에 헤더 자동 생성 + 첫 행 추가되면 OK
- 시트 이름은 `submissions` (자동 생성됨)

## 로컬 미리보기

```bash
open index.html
# 또는
python3 -m http.server 8080
```

## 배포 (GitHub Pages)

이 저장소의 Settings → Pages → Source: `main` / `(root)` 로 설정되어 있습니다.
`main`에 push 하면 자동 재배포됩니다.
