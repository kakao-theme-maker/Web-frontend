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

## 아키텍처
### 책임 분리 원칙
- Screen 컴포넌트는 데이터 페칭과 상태 관리만 담당하며, UI 렌더링은 하위 컴포넌트에 위임합니다.
- 재사용 가능한 UI 요소는 공통 컴포넌트로 분리합니다.
- 비즈니스 로직은 Custom Hook으로 분리하여 컴포넌트를 단순하게 유지합니다.
### 컴포넌트 길이
- 단일 컴포넌트는 200줄 이내를 권장합니다. 초과 시 분리를 검토하세요.
- JSX 반환부는 100줄 이내를 권장합니다.
### 폴더 구조
- src/components : UI 구성용 컴포넌트 모음
- src/components/common: 자주 및 공통으로 사용되는 디자인 컴포넌트
- src/components/icons : 아이콘 컴포넌트
- src/components/ui : 외부에서 제공되는 디자인 컴포넌트
- src/pages : 라우터에 들어가는 컴포넌트를 따로 분리하기
- src/routes : React Router Dom 기반으로 라우팅하는 파일
ex) AppRoutes.tsx / ProtectedRoutes.tsx
- src/services : API 호출 처리 / 데이터 관리 / 훅 관리
- src/utils : 유틸 공통 함수 /clsx /providers 등이 있다.

## 네이밍 컨벤션
- 컴포넌트 파일 : Pascal Case
- 폴더 이름 : Kebab Case
- props 네임 : Pascal Case 
- API / Service 네임 : Pascal Case
- React Query 네임 : Pascal Case
- 상태 변수 네이밍 : Pascal Case
- 인터페이스 네이밍: Pascal Case (인터페이스 앞에 I 붙이기)
- 상수 네이밍 : Screaming Snake Case
- boolean 네이밍 : 앞에 is or has 붙이기
- 일반 커스텀 훅(use*)은 camelCase

## Git Workflow
- `main` - 기본 셋팅 및 icons constant 변수만
- `develop` - 개발 통합 브랜치 (폴더 구조 생성)

## 규칙
- interface는 `types.ts`로 묶어서 관리
- TailwindCSS만 사용 (커스텀 스타일 X)
