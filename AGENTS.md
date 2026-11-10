# FitTracker Pro 운영 정보

## 커뮤니티 구현 기준

- 커뮤니티의 최신 기획은 [AGENT.md](./AGENT.md)의 오운완·오운왕 설계다.
- 기존 ‘입장 시 최근 30일 운동 공유 필수’ 기획 대신, 오늘 운동 전체 완료 후 수동 공유 또는 명시적으로 선택한 자동 공유를 기준으로 구현한다.
- 닉네임 추천 샘플 1,000개는 `planning/ouwan-nicknames.json`에 있다.
- 기획 문서와 `planning/` 디렉터리 전체를 공개 자산으로 배포하지 않는다.

## 운영 사이트

- 운영 URL: `https://gym.brightnetworks.kr/`
- Android 및 iOS 앱은 위 운영 URL을 원격 WebView로 표시한다.
- 일반적인 HTML, CSS, JavaScript 변경은 웹만 배포하면 앱에 반영되며 네이티브 앱을 다시 빌드할 필요가 없다.
- WebView URL, 네이티브 브리지, 앱 권한 또는 네이티브 코드를 변경한 경우에는 해당 앱 빌드와 배포가 별도로 필요하다.

## 웹 배포

- 호스팅: Cloudflare Workers Static Assets
- Worker 이름: `fittracker-pro`
- 설정 파일: `wrangler.jsonc`
- 공개 자산 빌드: `npm run build:web`
- 운영 배포 명령: `npm run deploy`
- 배포 전 검사: `node --check app.js && git diff --check`
- 배포 후 확인: `curl -fsS https://gym.brightnetworks.kr/` 및 변경된 정적 파일을 직접 요청해 응답을 검증한다.

## WebView 운영 URL 위치

- Android: `android_app/app/src/main/java/kr/brightnetworks/fittracker/MainActivity.kt`
- iOS: `ios_app/FitTracker/ContentView.swift`
- Capacitor: `capacitor.config.json`
- 모든 운영 URL은 HTTPS를 사용한다.

## 운동 데이터 동기화

- 기기간 동기화의 기준 저장소는 `https://admin.brightnetworks.kr/api/gym/sync`이며 카카오 ID로 사용자를 식별한다.
- 카카오 로그인 직후에는 반드시 서버 기록을 먼저 불러와 로컬 기록과 병합한 다음 업로드한다. 순서를 바꾸면 오래된 PC 기록이 최신 휴대폰 기록을 덮을 수 있다.
- 온라인 복귀 및 화면 재활성화 시 서버 기록을 다시 불러온다.
- Firebase 익명 인증 UID는 기기마다 다르므로 카카오 계정의 기기간 동기화 식별자로 사용하지 않는다.

## 정적 자산

- `scripts/build-web.mjs`가 공개 가능한 웹 파일만 `dist/`에 복사한다.
- `wrangler.jsonc`는 `dist/`만 정적 자산으로 배포한다.
- 저장소 루트 전체를 정적 자산 디렉터리로 변경하지 않는다. 네이티브 소스, 개발 설정, 배포 설정, 비공개 키 및 에이전트 문서가 공개될 수 있다.
