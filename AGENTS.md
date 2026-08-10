# Frontend Agent Router

프론트엔드 작업 전에는 루트 `AGENTS.md`를 확인한 뒤 아래 기준 문서만 필요한 만큼 엽니다.

- 프론트엔드 기준: `../docs/frontend/index.md`
- 구현 가이드: `../docs/frontend/guide.md`
- API 기준: `../docs/api/index.md`
- API 상태표: `../docs/api/api-status.md`
- FE/BE API 계약 동기화 스킬: `../.agents/skills/matchuri-api-contract-sync/SKILL.md`

## Source Of Truth

- API 소비 계약은 `src/features/**/infrastructure/api/`와 `dto/`를 우선합니다.
- 도메인 타입은 `src/features/**/domain/`을 우선합니다.

## Layer Invariant

- 의존성 흐름: `domain/types -> config -> infrastructure/api -> application -> ui`.
- 하위 레이어는 상위 레이어를 import하지 않습니다.
- `domain`과 `infrastructure`는 `ui`를 참조하지 않습니다.

Next.js는 현재 버전의 변경 사항이 클 수 있으므로, 코드 작성 전에 로컬 패키지 문서나 설치된 타입을 우선 확인합니다.
