# 프로젝트 파일 개요
- React에서 사용하여 카카오톡 테마를 선택하고 커스터마이징하는 프로젝트

## 명령어

```bash
# 개발 서버
npm run dev

# 프로젝트 코드 빌드
npm run build

# 린트 명령어
npm run lint

# 개발 빌드 Preview하기
npm run preview
```

## 아키텍처

- 폴더 구조는 다음과 같이 구성됩니다. (폴더 구조는 develop 브랜치에서 생성되야 합니다)

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
- React Queery 네임 : Pascal Case
- 상태 변수 네이밍 : Pascal Case
- 인터페이스 네이밍: Pascal Case (인터페이스 앞에 I 붙이기)
- 상수 네이밍 : Screaming Snake Case
- boolean 네이밍 : 앞에 is or has 붙이기

## 스타일링
tailwindCSS 사용하여 스타일링 할 것. 커스텀 스타일 X

## 따로 규칙
- interface는 types.ts로 묶어서 관리하기
- main에는 기본 셋팅 및 icons constant 변수만 설정해두기

