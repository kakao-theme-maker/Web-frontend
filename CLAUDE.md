# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

카카오톡 테마를 선택하고 커스터마이징하는 React 웹 프로젝트

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # TypeScript 체크 + Vite 빌드
npm run lint     # ESLint 실행
npm run preview  # 프로덕션 빌드 프리뷰
```

## 기술 스택

- **빌드**: Vite 7 + SWC
- **프레임워크**: React 19 + TypeScript (strict mode)
- **스타일링**: TailwindCSS (커스텀 스타일 X)
- **상태 관리**: Zustand
- **서버 상태**: TanStack React Query
- **라우팅**: React Router DOM v7
- **폼**: React Hook Form
- **HTTP**: Axios
- **린트**: ESLint 9 flat config

## 폴더 구조 (develop 브랜치)

```
src/
├── components/
│   ├── common/    # 공통 디자인 컴포넌트
│   ├── icons/     # 아이콘 컴포넌트
│   └── ui/        # 외부 디자인 컴포넌트
├── pages/         # 라우터용 페이지 컴포넌트
├── routes/        # React Router 설정 (AppRoutes.tsx, ProtectedRoutes.tsx)
├── services/      # API 호출, 데이터/훅 관리
└── utils/         # 유틸 함수, clsx, providers
```

## 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `Button.tsx` |
| 폴더 이름 | kebab-case | `common-ui/` |
| Props | PascalCase | `ButtonProps` |
| API/Service | PascalCase | `UserService` |
| React Query | PascalCase | `UseGetUser` |
| 상태 변수 | PascalCase | `UserState` |
| 인터페이스 | I + PascalCase | `IUser` |
| 상수 | SCREAMING_SNAKE_CASE | `API_BASE_URL` |
| Boolean | is/has 접두사 | `isLoading`, `hasError` |

## Git Workflow

- `main` - 기본 셋팅 및 icons constant 변수만
- `develop` - 개발 통합 브랜치 (폴더 구조 생성)

## 규칙

- interface는 `types.ts`로 묶어서 관리
- TailwindCSS만 사용 (커스텀 스타일 X)
