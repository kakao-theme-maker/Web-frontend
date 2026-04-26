# AGENTS.md

이 파일은 이 저장소에서 AI 코딩 에이전트가 작업할 때 참고할 프로젝트 가이드입니다.

## 프로젝트 개요

카카오톡 테마를 선택하고 커스터마이징하는 React 웹 프로젝트입니다.

## 주요 명령어

```bash
npm run dev      # 개발 서버 실행
npm run build    # TypeScript 체크 + Vite 빌드
npm run lint     # ESLint 실행
npm run preview  # 프로덕션 빌드 프리뷰
```

## 기술 스택

- 빌드: Vite 7 + SWC
- 프레임워크: React 19 + TypeScript strict mode
- 스타일링: TailwindCSS
- 상태 관리: Zustand
- 서버 상태: TanStack React Query
- 라우팅: React Router DOM v7
- 폼: React Hook Form
- HTTP: Axios
- 린트: ESLint 9 flat config

## 작업 방식

- 기존 코드 구조와 패턴을 먼저 확인한 뒤 작업합니다.
- 원인, 해결 방안, 선택 이유가 필요한 작업은 구현 전에 간단히 설명합니다.
- 새로운 기능이나 페이지를 개발할 때는 먼저 작업 계획을 세웁니다.
- 사용자가 이미 수정한 변경사항은 되돌리지 않습니다.
- 변경 범위는 요청과 직접 관련된 파일로 좁게 유지합니다.
- 작업 후 가능한 경우 `npm run lint` 또는 `npm run build`로 검증합니다.

## 아키텍처 원칙

- Screen 컴포넌트는 데이터 페칭과 상태 관리만 담당하고, UI 렌더링은 하위 컴포넌트에 위임합니다.
- 재사용 가능한 UI 요소는 공통 컴포넌트로 분리합니다.
- 비즈니스 로직은 Custom Hook으로 분리하여 컴포넌트를 단순하게 유지합니다.
- 단일 컴포넌트는 200줄 이내를 권장하며, 초과 시 분리를 검토합니다.
- JSX 반환부는 100줄 이내를 권장합니다.

## 폴더 구조

- `src/components`: UI 구성용 컴포넌트 모음
- `src/components/common`: 자주 사용되는 공통 디자인 컴포넌트
- `src/components/icons`: 아이콘 컴포넌트
- `src/components/ui`: 외부에서 제공되는 디자인 컴포넌트
- `src/pages`: 라우터에 연결되는 페이지 컴포넌트
- `src/routes`: React Router DOM 기반 라우팅 파일
- `src/services`: API 호출, 데이터 관리, 훅 관리
- `src/utils`: 공통 유틸 함수, `clsx`, providers 등

라우팅 예시는 `AppRoutes.tsx`, `ProtectedRoutes.tsx`를 참고합니다.

## 네이밍 컨벤션

- 컴포넌트 파일: PascalCase
- 폴더 이름: kebab-case
- props 타입: PascalCase
- API / Service 이름: PascalCase
- React Query 관련 이름: PascalCase
- 상태 변수: camelCase
- 인터페이스: PascalCase, 앞에 `I` 접두사 사용
- 상수: SCREAMING_SNAKE_CASE
- boolean 변수: `is` 또는 `has` 접두사 사용
- 일반 커스텀 훅: `use*` 형태의 camelCase

## 스타일 규칙

- TailwindCSS만 사용합니다.
- 불필요한 커스텀 CSS는 추가하지 않습니다.
- 기존 공통 컴포넌트와 디자인 패턴을 우선 사용합니다.

## 타입 규칙

- interface는 관련 `types.ts` 파일로 묶어서 관리합니다.
- 기존 타입 정의 위치가 있다면 새 타입도 같은 책임 범위에 추가합니다.

## Git Workflow

- `main`: 기본 셋팅 및 icons constant 변수만 관리
- `develop`: 개발 통합 브랜치
