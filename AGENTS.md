<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PLAYER LAB 웹사이트

고다지 풋볼 플레이어 랩(유소년 축구 진단 클리닉)의 소개 사이트입니다.

## 작성자에 대해

Flutter 앱 개발자이고 웹 개발은 이번이 처음입니다. React, CSS, 서버/브라우저 구분이 모두 새로운 개념입니다.
**배우면서 진행하는 것이 목적이므로**, 코드를 던져주기보다 왜 그렇게 하는지 설명을 함께 주세요.
Flutter 개념에 빗대어 설명하면 이해가 빠릅니다(위젯↔컴포넌트, setState↔useState, pubspec.yaml↔package.json 등).
답변은 한국어로 합니다.

## 기술 스택

- Next.js 16 App Router + TypeScript
- 배포는 Vercel (아직 안 함)
- DB는 Supabase (아직 안 붙임). **강사진 정보만** 저장합니다
- **Tailwind는 쓰지 않습니다.** 원본 시안의 CSS를 그대로 유지합니다

## 원본 시안

`/Users/newhyper/Downloads/player-lab.html` (1,575줄) 한 장짜리 HTML에서 이식하고 있습니다.
그중 685줄이 손으로 짠 CSS이고, 이건 `src/app/globals.css`에 **한 줄도 고치지 않고** 복사했습니다.
새 마크업을 쓸 때도 기존 클래스(`.wrap` `.sec` `.box` `.btn` `.rv` 등)를 재사용하고, CSS는 되도록 건드리지 않습니다.

원본은 페이지 9개가 URL 하나에 들어 있고 자바스크립트로 `.page` div를 켜고 껐습니다.
이식하면서 페이지마다 진짜 주소를 갖게 했고, 원본의 라우터 코드는 버렸습니다.
다만 `.page.on` 의 fade 애니메이션은 살리려고 각 페이지 최상위에 `<div className="page on">` 을 유지합니다.

## 페이지 구성

| 주소 | 내용 | 상태 |
|---|---|---|
| `/` | 홈 | 이식 완료 |
| `/about` | 플레이어랩 소개 | 머리말만 |
| `/scan` | 선수진단 | 머리말만 |
| `/process` | 진행 절차 | 머리말만 |
| `/coach` | 전문 강사진 | 머리말만 |
| `/rx` | 훈련 처방 | 머리말만 |
| `/price` | 검진 비용 | 머리말만 |
| `/report` | 검진 결과지 예시 | 머리말만 |
| `/apply` | 무료 선수진단 신청 | 머리말만 |

## 범위에서 **빠진** 것

한 번 정한 내용이니 다시 제안하지 마세요.

- **회원가입·로그인 없음.** 인증 관련 코드 일절 없습니다
- **신청 폼은 만들지 않습니다.** 구글폼 링크로 연결만 합니다. 원본의 3단계 문진 폼과 `submitForm()` 은 버립니다
- **결과지는 선수별 동적 페이지가 아닙니다.** 지금의 가상 데이터 샘플 한 장을 소개용으로 그대로 둡니다
- **카카오 관련 기능 없음.** 공유 버튼, 알림톡, 카카오 로그인 전부 해당 없음

## 강사진 데이터 (예정)

원본 자바스크립트의 `DEPT` 배열에 10개 분야의 강사·커리큘럼·운영 기준이 들어 있습니다.
같은 정보가 HTML 카드에도 중복으로 들어 있어서, Supabase 테이블 하나로 합칠 예정입니다.

코치 사진은 **실제 사진**을 씁니다. 원본의 손그림 SVG 아바타 10개는 그때 삭제합니다.
`.av` 클래스는 크기와 모서리만 지정하므로 `<svg>` 를 `<img>` 로 바꾸고 `object-fit:cover` 만 더하면 됩니다.

**사진 교체 규칙:** 같은 파일명에 덮어쓰지 말고 항상 새 파일명으로 올린 뒤 DB의 주소를 함께 갱신합니다.
덮어쓰면 브라우저 캐시(기본 1시간) 때문에 사용자에게 옛날 사진이 계속 보입니다.

강사진 페이지는 새로고침하면 최신 데이터가 바로 보이도록 **매 요청 렌더링**으로 둡니다.
정적 생성이나 시간 기반 갱신(ISR)은 "고쳤는데 왜 안 바뀌지" 문제를 만들어서 이 단계에서는 쓰지 않습니다.

## 아직 안 정한 것

- 도메인 (미정, Vercel 임시 주소로 먼저 배포)
- 구글폼 주소 (미정)
- 코치 실명 공개 여부 — 지금은 `박○○ 코치` 처럼 마스킹되어 있음
