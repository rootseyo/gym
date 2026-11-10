# 오운완 총 중량·레벨·사진·Instagram 배포 기록 — 2026-09-15

## 구현 내용

- 오운왕 순위의 `N일`을 한 줄로 고정하고, 기간 내 공개 게시물의 총 중량을 함께 표시한다.
- 피드 카드와 상세 화면에 `중량 × 실제 횟수` 합계를 표시한다. 유산소 운동은 총 중량에서 제외한다.
- 내 설정에서 헬스 초보·중수·고수를 선택하고 프로필, 피드, 랭킹과 상세에 표시한다.
- 본인 오운완 게시물에 JPEG·PNG·WebP 운동 사진 1장을 첨부·교체·삭제할 수 있다. 서버가 방향을 보정하고 최대 1600px JPEG로 재인코딩해 메타데이터를 제거한다.
- Android는 사진 또는 1080×1350 공유 카드를 Instagram 앱으로 전달한다. 웹·iOS는 시스템 공유를 사용하고, 지원되지 않으면 공유 카드를 저장한다.

## Admin 서버

- `GymCommunityMember.fitnessLevel`과 `GymCompletionPhoto`를 추가한 마이그레이션 `20260915000000_add_ouwan_levels_and_photos`를 적용했다.
- 운영 Next.js 빌드 ID: `2useNVJrRew0wyCLD592R`.
- 전체 22개 마이그레이션이 최신 상태이고 PM2 `admin-payment`가 online임을 확인했다.
- 배포 전 백업: `/home/sean/work/admin/backups/ouwan-20260915/database-before.dump`, `source-before.tgz`, `next-before/`.
- 임시 PostgreSQL에서 API 통합 테스트 11개가 통과했다. 사진 소유권·형식 정리·조회·삭제, 레벨과 총 중량 응답을 포함한다.

## 웹

- 공개 자산 30개 빌드, JavaScript 문법 검사, diff 검사, 오운완 공통 로직 테스트 5개와 모바일 브라우저 검증을 통과했다.
- 공개 빌드에서 `planning/`, 네이티브 소스와 운영 문서를 제외했다.
- Worker 버전: `7d87bfe9-22c2-4b50-8d3e-24aa2bbfc3a5`.
- 운영 `community.html`, `community.js`, `community.css`, `community-auth.js`, `ouwan-core.js`를 직접 내려받아 로컬 배포본과 SHA-256이 일치함을 확인했다.

## Android 1.0.10

- package: `kr.brightnetworks.fittracker`
- versionName `1.0.10`, versionCode `11`.
- 릴리스 번들 생성과 lint 검사가 통과했다.
- AAB SHA-256: `676e29f24c4376cb5f1fb64388dcf5086b63381a449028b5c7dd773c02909906`.
- APK SHA-256: `813df4577120b5749854ff39ca91b7f38eebaefdb91ced3fda8be805455fe56e`.
- `fastlane production`으로 AAB와 한국어 변경사항을 업로드했다.
- Play API 재조회 결과 production 트랙의 `1.0.10`, versionCode `11`, status `completed`와 한국어 출시 노트가 로컬 파일과 일치했다.

Google Play의 사용자별 업데이트 노출 시점은 스토어 배포 처리에 따라 달라질 수 있다.
