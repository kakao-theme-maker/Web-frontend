# 프론트엔드 인수인계서

작성 기준: 현재 `D:\dev\react\Web-frontend` 워킹트리  
검증 기준: `npm run build` 통과

이 문서는 새로 합류한 프론트엔드 개발자가 프로젝트 구조와 작업 방식을 빠르게 파악하기 위한 압축본입니다. 세부 구현은 각 파일을 따라가며 확인하면 됩니다.

## 목차

- [1. 빠른 시작](#quick-start)
- [2. 프로젝트 한눈에 보기](#overview)
- [3. 실행과 환경 변수](#run-env)
- [4. 앱 진입점, 라우팅, 레이아웃](#routing-layout)
- [5. 폴더 구조와 컨벤션](#structure-convention)
- [6. 스타일과 아이콘 사용법](#style-icons)
- [7. 인증, API, React Query](#auth-api-query)
- [8. 공통 Hook과 유틸](#hooks-utils)
- [9. 주요 도메인 흐름](#domain-flows)
- [10. 타입과 데이터 매핑](#types-mapping)
- [11. 기능 추가 레시피](#recipes)
- [12. 검증 체크리스트](#checklist)
- [13. 주의점과 개선 후보](#risks)
- [14. 첫날 온보딩 순서](#onboarding)
- [15. 빠른 파일 맵](#file-map)

<a id="quick-start"></a>

## 1. 빠른 시작

처음 들어오면 이 순서대로 보면 됩니다.

1. `README.md`, `AGENTS.md`, 이 문서를 읽습니다.
2. `.env`에 `VITE_API_BASE_URL`을 설정합니다.
3. `npm install` 후 `npm run build`로 현재 상태를 확인합니다.
4. `src/main.tsx` -> `src/routes/AppRoutes.tsx` -> `src/layouts/MobileLayout.tsx` 순서로 앱 뼈대를 봅니다.
5. `src/services/api/ApiClient.ts`에서 인증/refresh 흐름을 확인합니다.
6. `src/constants/queryKeys.ts`와 `src/services/hooks`에서 서버 상태 관리 방식을 봅니다.
7. 커뮤니티 흐름을 `/community/theme` 테마 탭과 `/community/design` 디자인 에셋 탭 기준으로 따라갑니다.

<a id="overview"></a>

## 2. 프로젝트 한눈에 보기

카카오톡 테마와 디자인 컴포넌트를 선택하고 커뮤니티 게시글로 공유하는 React 웹 프론트엔드입니다.

핵심 사용자 흐름:

- 로그인, 회원가입, 카카오 로그인
- 홈에서 인기 테마와 저장 테마 확인
- 커뮤니티의 테마/디자인 에셋 게시글 목록, 상세, 작성, 수정, 삭제
- 알림 탭
- 게시글 좋아요, 북마크, 댓글, 댓글 좋아요
- 마이페이지 프로필 수정, 내가 올린 글, 저장한 글, 커스텀 컴포넌트 확인

기술 스택:

| 영역 | 기술 |
| --- | --- |
| 빌드 | Vite 7, SWC |
| 프레임워크 | React 19, TypeScript strict mode |
| 라우팅 | React Router DOM v7 |
| 서버 상태 | TanStack React Query v5 |
| 클라이언트 상태 | Zustand |
| 폼 | React Hook Form |
| HTTP | Axios |
| 스타일 | TailwindCSS |
| SVG | `vite-plugin-svgr` |
| 린트 | ESLint 9 flat config |

UI는 데스크톱 브라우저 안에 모바일 프레임을 띄우는 방식입니다. 실제 앱 프레임은 주로 `340px x 700px` 기준으로 설계되어 있습니다.

<a id="run-env"></a>

## 3. 실행과 환경 변수

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

명령어:

- `npm run dev`: Vite 개발 서버
- `npm run build`: `tsc -b` 후 Vite production build
- `npm run lint`: ESLint
- `npm run preview`: build 결과 프리뷰

환경 변수:

```bash
VITE_API_BASE_URL=백엔드_API_BASE_URL
```

API base URL은 `src/services/api/ApiClient.ts`에서 읽습니다.

```ts
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
```

주의:

- 실제 `.env` 값은 커밋하지 않습니다.
- Axios는 `withCredentials: true`입니다. 인증은 httpOnly 쿠키 기반 흐름을 전제로 합니다.
- 개발 서버에서 `504 (Outdated Optimize Dep)`가 뜨면 Vite 캐시 문제일 가능성이 큽니다. 개발 서버를 끄고 `node_modules/.vite`를 지운 뒤 재실행합니다.

<a id="routing-layout"></a>

## 4. 앱 진입점, 라우팅, 레이아웃

앱 진입점은 `src/main.tsx`입니다.

```tsx
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </QueryClientProvider>
);
```

현재 주요 진입은 `App.tsx`가 아니라 `AppRoutes`입니다.

라우팅 파일:

- `src/routes/AppRoutes.tsx`
- `src/routes/ProtectedRoutes.tsx`

`AppRoutes`는 `AuthInitializer`로 감싸져 있습니다. 앱 시작 시 `useAuthInit()`이 `/api/users/me`를 호출해 인증 상태를 복원하고, 끝나기 전에는 로딩 스피너를 보여줍니다.

라우트 요약:

| 경로 | 레이아웃 | 보호 | 화면 |
| --- | --- | --- | --- |
| `/login` | `AuthLayout` | 공개 | 로그인 |
| `/signup` | `AuthLayout` | 공개 | 회원가입 |
| `/auth/kakao/callback` | 없음 | 공개 | 카카오 콜백 |
| `/` | `MobileLayout` | 보호 | 홈 |
| `/community` | `MobileLayout` | 보호 | `/community/theme`로 redirect |
| `/community/theme` | `MobileLayout` | 보호 | 커뮤니티 테마 탭 |
| `/community/design` | `MobileLayout` | 보호 | 커뮤니티 디자인 에셋 탭 |
| `/community/theme/write/select` | `MobileLayout` | 보호 | 테마 선택 |
| `/community/theme/write` | `MobileLayout` | 보호 | 테마 글 작성 |
| `/community/theme/edit/:boardId` | `MobileLayout` | 보호 | 테마 글 수정 |
| `/community/theme/:boardId` | `MobileLayout` | 보호 | 테마 상세 |
| `/community/design/write/select` | `MobileLayout` | 보호 | 디자인 에셋 선택 |
| `/community/design/write` | `MobileLayout` | 보호 | 디자인 에셋 글 작성 |
| `/community/design/edit/:boardId` | `MobileLayout` | 보호 | 디자인 에셋 글 수정 |
| `/community/design/:boardId` | `MobileLayout` | 보호 | 디자인 에셋 상세 |
| `/notify` | `MobileLayout` | 보호 | 알림 |
| `/mypage` | `MobileLayout` | 보호 | 마이페이지 |

`ProtectedRoutes`는 `useAuthStore(state => state.isAuthenticated)`만 보고 접근을 허용합니다. 실패하면 `/login`으로 redirect합니다.

레이아웃:

- `AuthLayout`: 로그인/회원가입용 모바일 프레임
- `MobileLayout`: 인증 후 앱 프레임, header, scroll container, bottom tab 담당
- `BottomTabBar`: Home, 게시글, 알림, 마이 탭
- `MobileHeader`: 로고, 제목, 뒤로가기, 메뉴 버튼

`MobileLayout` 주의점:

- `id="phone-root"`가 프레임 루트입니다. 댓글 포털 등에서 기준으로 사용할 수 있습니다.
- header title, bottom tab active, detail page 여부가 pathname 조건으로 계산됩니다.
- `/community/theme`, `/community/design`은 커뮤니티 탭 목록 경로라 뒤로가기 버튼을 숨깁니다.
- 새 route를 추가하면 `MobileLayout`의 route flag도 같이 확인해야 합니다.

<a id="structure-convention"></a>

## 5. 폴더 구조와 컨벤션

핵심 폴더:

```text
src/
  components/       UI 컴포넌트
  constants/        query key, typography 등 전역 상수
  layouts/          모바일 프레임, header, bottom tab
  pages/            라우터에 직접 연결되는 Screen
  routes/           AppRoutes, ProtectedRoutes
  services/
    api/            Axios client, API service
    hooks/          API와 화면 로직을 감싼 custom hook
  stores/           Zustand store
  types/            도메인 타입
  utils/            공통 유틸
```

`components` 하위 역할:

- `auth`: 로그인/회원가입 폼
- `common`: Button, Text, TabMenu, Alert, Confirm, ImageSlider, MoreMenu
- `community`: 커뮤니티 공통 UI
- `community/theme`: 테마 전용 카드, 프리뷰, 탭
- `community/design`: 디자인 에셋 전용 카드, 프리뷰, 탭
- `home`: 홈 탭/그리드/준비중 UI
- `icons`: SVG 아이콘
- `mypage`: 프로필, 마이페이지 탭/카드
- `ui`: 현재 예약 폴더

컨벤션:

| 대상 | 규칙 |
| --- | --- |
| 컴포넌트 파일 | PascalCase |
| 폴더 | kebab-case |
| interface | PascalCase + `I` 접두사 |
| 상태 변수 | camelCase |
| 상수 | SCREAMING_SNAKE_CASE |
| boolean | `is` 또는 `has` 접두사 |
| custom hook | `use*` camelCase |

아키텍처 원칙:

- `pages`는 데이터 연결, 상태 조립, navigation 중심입니다.
- UI 렌더링은 `components`로 분리합니다.
- API 요청은 `services/api`, React Query/비즈니스 로직은 `services/hooks`에 둡니다.
- 서버 raw 타입과 UI 타입은 분리합니다.

<a id="style-icons"></a>

## 6. 스타일과 아이콘 사용법

스타일은 TailwindCSS를 사용합니다.

관련 파일:

- `tailwind.config.js`
- `src/index.css`
- `src/constants/typography.ts`
- `src/components/common/Text.tsx`
- `src/utils/cn.ts`

`index.css`는 Pretendard import, CSS variable 컬러, `.scrollbar-hidden`, 전역 font-family를 정의합니다.

```css
:root {
  --color-primary: 3 82 255;
  --color-primary-foreground: 255 255 255;
  --color-secondary-100: 217 217 217;
  --color-secondary-200: 215 215 215;
  --color-secondary-300: 212 212 212;
  --color-secondary-400: 196 196 196;
}
```

텍스트 스타일은 가능하면 `Text` 컴포넌트와 `TYPOGRAPHY` variant를 사용합니다. 조건부 class는 `cn`을 사용합니다.

### 아이콘 사용법

로컬 SVG는 `vite-plugin-svgr`로 React 컴포넌트처럼 사용합니다. 타입 선언은 `src/vite-env.d.ts`에 있습니다.

```ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
```

규칙:

- SVG를 컴포넌트로 쓰려면 import path 끝에 `?react`를 붙입니다.
- 아이콘은 `src/components/icons/{domain}/icon-name.svg`에 둡니다.
- 크기와 색상은 사용하는 쪽에서 `className`으로 제어합니다.
- 클릭 가능한 아이콘은 `button` 또는 `Link` 안에 넣고 `aria-label`을 제공합니다.
- 장식용이면 `aria-hidden`을 검토합니다.

기본 버튼 예시:

```tsx
import BackArrowIcon from "../components/icons/header/back-arrow.svg?react";

export default function BackButton() {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className="flex h-8 w-8 items-center justify-center"
      aria-label="뒤로가기"
    >
      <BackArrowIcon className="h-5 w-5" />
    </button>
  );
}
```

아이콘 컴포넌트를 props/data로 넘길 때:

```tsx
import { Link } from "react-router-dom";
import HomeIcon from "../components/icons/bottom-tab-menu/bottom-home.svg?react";
import CommunityIcon from "../components/icons/bottom-tab-menu/bottom-community.svg?react";
import Text from "../components/common/Text";

interface IBottomTabItem {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  text: string;
  href: string;
  isActive: boolean;
}

function BottomTabBarItem({ icon: Icon, text, href, isActive }: IBottomTabItem) {
  return (
    <li className="flex flex-col items-center justify-center gap-1">
      <Link to={href} className="flex flex-col items-center justify-center gap-1">
        <Icon className={`h-5 w-5 ${isActive ? "text-primary opacity-100" : "opacity-90"}`} />
        <Text variant="REGULAR_12">{text}</Text>
      </Link>
    </li>
  );
}

const bottomTabBarItems: IBottomTabItem[] = [
  { icon: HomeIcon, text: "홈", href: "/", isActive: true },
  { icon: CommunityIcon, text: "게시글", href: "/community", isActive: false },
];
```

고정 아이콘을 바로 렌더링할 때:

```tsx
import HeaderIcon from "../components/icons/header/header.svg?react";
import Text from "../components/common/Text";

export default function HeaderTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2">
      <HeaderIcon className="h-5 w-6" aria-hidden />
      <Text variant="SEMIBOLD_15">{title}</Text>
    </div>
  );
}
```

PNG/JPG 같은 래스터 이미지는 `?react` 대상이 아닙니다. 일반 `<img src={...} alt="..." />` 패턴을 사용합니다.

<a id="auth-api-query"></a>

## 7. 인증, API, React Query

인증 관련 파일:

- `src/stores/authStore.ts`
- `src/services/hooks/auth/useAuthInit.ts`
- `src/services/hooks/auth/useLogin.ts`
- `src/services/hooks/auth/useSignUp.ts`
- `src/services/hooks/auth/useKakaoLogin.ts`
- `src/pages/auth/KakaoCallback.tsx`
- `src/services/api/AuthService.ts`
- `src/services/api/ApiClient.ts`

Zustand auth store:

- `userEmail`
- `isAuthenticated`
- `setAuthenticated(userEmail?)`
- `clearAuth()`

프론트는 `userEmail`만 localStorage에 저장합니다. 실제 인증은 httpOnly 쿠키 기반으로 보이며, 앱 시작 시 `/api/users/me`로 복원합니다.

API client:

- 파일: `src/services/api/ApiClient.ts`
- `baseURL: VITE_API_BASE_URL ?? ''`
- `timeout: 10_000`
- `withCredentials: true`

401 refresh 흐름:

1. response interceptor에서 401 감지
2. refresh 중이면 failed queue에 넣고 대기
3. refresh 중이 아니면 `/api/auth/reissue` 호출
4. 성공하면 대기 요청과 원래 요청 재시도
5. 실패하면 `/api/auth/local/sign-out` best-effort 호출 후 auth store clear

API service:

| Service | 주요 역할 |
| --- | --- |
| `AuthService` | 로그인, 회원가입, 로그아웃, 카카오 URL, dev auth |
| `UserService` | 내 정보, 내가 올린 글, 북마크 글, 커스텀 컴포넌트, 프로필 수정 |
| `ThemeService` | 테마 목록/상세/유저 테마/인기/저장/작성/수정/삭제 |
| `DesignService` | 디자인 에셋 목록/상세/유저 디자인/작성/수정/삭제 |
| `BoardInteractionService` | 좋아요, 북마크, 댓글 CRUD, 댓글 좋아요 |

Query key는 `src/constants/queryKeys.ts`의 `QUERY_KEYS`를 사용합니다.

```ts
QUERY_KEYS.comments(boardId)
QUERY_KEYS.themeBoards()
QUERY_KEYS.themeBoardDetails(pinnedPostId?)
QUERY_KEYS.designBoards()
QUERY_KEYS.designBoardDetails(pinnedPostId?)
QUERY_KEYS.homeThemes(type)
QUERY_KEYS.userProfile()
QUERY_KEYS.myUploadPosts()
QUERY_KEYS.myBookmarkedPosts()
QUERY_KEYS.myCustomComponents()
QUERY_KEYS.userThemes(userEmail)
QUERY_KEYS.userDesignComponents(userEmail)
```

새 query를 추가할 때는 먼저 `QUERY_KEYS`에 추가합니다. 기존 key 문자열은 캐시 동작에 영향이 있으므로 신중하게 바꿉니다.

<a id="hooks-utils"></a>

## 8. 공통 Hook과 유틸

자주 보는 hook:

| Hook | 역할 |
| --- | --- |
| `useIntersectionObserver` | 무한 스크롤 sentinel |
| `useVerticalSwipe` | 상세 페이지 세로 스와이프/휠/터치 처리 |
| `useBookmark` | 게시글 북마크 optimistic update |
| `usePrefer` | 게시글 좋아요 optimistic update |
| `useComments` | 댓글 조회 |
| `useCreateComment` | 댓글 작성 |
| `useCommentActions` | 댓글 수정/삭제 모달과 mutation |
| `useCommentLike` | 댓글 좋아요 optimistic update |
| `useBoardWriteForm` | 게시글 작성/수정 폼 공통 상태 |

유틸:

- `src/utils/cn.ts`: `clsx` + `tailwind-merge`
- `src/utils/date.ts`: 날짜 포맷
- `src/utils/query.ts`: React Query 캐시에서 게시글 업데이트/삭제

주의:

- `useBookmark`의 `hasUnbookmarkRemoval`은 저장글 탭처럼 북마크 해제 시 목록에서 제거해야 할 때 씁니다.
- `useBoardWriteForm`은 새 파일 선택 시 이전 blob URL은 revoke하지만 unmount cleanup은 아직 없습니다.

<a id="domain-flows"></a>

## 9. 주요 도메인 흐름

### 커뮤니티 - 테마 탭

주요 파일:

- 목록: `src/pages/theme-community/List.tsx`
- 상세: `src/pages/theme-community/Detail.tsx`
- 선택: `src/pages/theme-community/BoardThemeSelect.tsx`
- 작성: `src/pages/theme-community/BoardWrite.tsx`
- 수정: `src/pages/theme-community/BoardThemeEdit.tsx`

주요 hook:

- `useThemeBoards`
- `useThemeBoardDetails`
- `useUserThemes`
- `useBoardWrite`
- `useThemeBoardEdit`
- `useDeleteThemeBoard`

흐름:

- `/community`는 `/community/theme`로 redirect됩니다.
- 테마 탭 목록은 `/community/theme`에서 `useThemeBoards()`와 `ActivityTab`을 사용합니다. page size는 20입니다.
- 상세는 `/community/theme/:boardId`에서 URL의 `boardId`를 `pinned_post_id`로 사용하고 `BoardSwipeDetailView`가 세로 스와이프를 담당합니다.
- 작성은 `/community/theme/write/select`에서 테마 선택 후 router state로 `/community/theme/write`에 전달합니다.
- 작성 submit은 `FormData`에 `board_info` JSON blob과 선택된 `preview_image`를 넣습니다.
- 수정은 router state의 `board`로 form을 초기화합니다. state가 없으면 `navigate(-1)`합니다.

테마 작성 `board_info` 주요 필드:

- `title`
- `content`
- `themeComponentId`
- `publicFlag`
- `post_tags`

### 커뮤니티 - 디자인 에셋 탭

주요 파일:

- 목록 컨테이너: `src/pages/theme-community/List.tsx`
- 목록 UI: `src/components/community/design/tab/DesignActivityTab.tsx`
- 상세: `src/pages/design-community/Detail.tsx`
- 선택: `src/pages/design-community/BoardDesignSelect.tsx`
- 작성: `src/pages/design-community/BoardDesignWrite.tsx`
- 수정: `src/pages/design-community/BoardDesignEdit.tsx`

주요 hook:

- `useDesignBoards`
- `useDesignBoardDetails`
- `useUserDesignComponents`
- `useDesignBoardWrite`
- `useDesignBoardEdit`
- `useDeleteDesignBoard`

디자인 에셋 탭은 `/community/design`에서 렌더링됩니다. 탭 클릭은 URL을 바꾸므로 새로고침해도 선택 탭이 유지됩니다. 작성/상세/수정 경로는 `/community/design/write/select`, `/community/design/write`, `/community/design/:boardId`, `/community/design/edit/:boardId`입니다.

테마 탭과 구조가 거의 같습니다. 차이는 선택 대상이 디자인 컴포넌트이고, 작성 payload에는 `designComponentId`가 들어가며, 수정 API는 `PATCH /api/design-boards/{postId}`입니다. 테마 수정은 `PUT /api/theme-boards/{postId}`입니다.

디자인 에셋 UI 진입은 `/community/design` 하위 경로만 사용합니다.

### 알림

주요 파일:

- 화면: `src/pages/notification/Notification.tsx`
- 하단 탭: `src/layouts/BottomTabBar.tsx`
- 헤더/활성 상태: `src/layouts/MobileLayout.tsx`

흐름:

- 하단 알림 탭은 `/notify`로 이동합니다.
- 현재 알림 API 연결은 없고, 빈 상태 문구를 보여줍니다.

### 공통 상세 카드와 작성 폼

공통 상세:

- `src/components/community/BoardDetailCard.tsx`
- `src/components/community/board-detail/*`
- `src/components/community/BoardSwipeDetailView.tsx`
- `src/components/community/CommentModal.tsx`

공통 작성 폼:

- `src/components/community/BoardWriteForm.tsx`
- `src/components/community/board-write-form/*`
- `src/services/hooks/common/useBoardWriteForm.ts`

`BoardDetailCard`는 header, action bar, content, modals, comment portal을 조립합니다. `BoardWriteForm`은 썸네일, 제목/내용, 태그, 공개 여부, 제출 버튼을 렌더링합니다.

### 홈

파일:

- `src/pages/home/Home.tsx`
- `src/components/home/HomeTabs.tsx`
- `src/components/home/HomeThemeGrid.tsx`
- `src/components/home/PreparingTab.tsx`
- `src/services/hooks/theme/useHomeThemes.ts`

탭:

- 인기 테마
- 저장 테마
- 준비중/만들기 탭

`Home.tsx`는 active tab과 `scrollToTop()`만 관리합니다. `HomeThemeGrid`는 현재 내부에서 `useHomeThemes(type)`을 호출합니다.

### 마이페이지

파일:

- `src/pages/mypage/MyPage.tsx`
- `src/components/mypage/ProfileSection.tsx`
- `src/components/mypage/ActivityTab.tsx`
- `src/components/mypage/SavedTab.tsx`
- `src/components/mypage/CustomTab.tsx`

hook:

- `useUserProfile`
- `useProfileEdit`
- `useMyUploadPosts`
- `useMyBookmarkedPosts`
- `useMyCustomComponents`

탭:

- activity: 내가 올린 글
- saved: 저장한 글
- custom: 커스텀 컴포넌트

저장글 탭은 북마크 해제 시 목록에서 제거되도록 `useBookmark(..., hasUnbookmarkRemoval: true)` 흐름을 씁니다.

<a id="types-mapping"></a>

## 10. 타입과 데이터 매핑

타입 파일:

- `src/types/auth/types.ts`
- `src/types/community/common.ts`
- `src/types/community/theme.ts`
- `src/types/community/design.ts`
- `src/types/mypage/types.ts`
- `src/services/api/types.ts`

원칙:

- 서버 응답 타입은 `Raw` suffix를 사용합니다.
- raw 타입은 서버 필드명을 유지합니다.
- UI 타입은 프론트 컨벤션에 맞춥니다.
- hook에서 raw-to-UI mapping을 처리하고, component에는 UI 타입을 넘깁니다.

예시:

```ts
// raw
liked: boolean;
bookmarked: boolean;
is_public: boolean;

// UI
isLiked: boolean;
isBookmarked: boolean;
isPublic: boolean;
```

새 API 연결 순서:

1. raw response 타입 추가
2. UI 타입 추가
3. Service 함수 추가
4. Query key 추가
5. Hook에서 API 호출과 mapping 구현
6. Page에서 hook 연결
7. Component는 UI 타입만 사용

<a id="recipes"></a>

## 11. 기능 추가 레시피

새 페이지:

1. `src/pages/{domain}/NewPage.tsx` 추가
2. UI는 `src/components/{domain}`에 분리
3. API가 있으면 `services/api`에 service 추가
4. 서버 상태가 있으면 `services/hooks/{domain}`에 hook 추가
5. query key가 있으면 `constants/queryKeys.ts`에 추가
6. `AppRoutes.tsx`에 route 추가
7. header/bottom tab 처리가 필요하면 `MobileLayout.tsx` 확인

새 API:

1. raw 타입 추가
2. service endpoint 함수 추가
3. query/mutation hook 작성
4. loading/error/empty 상태 정의
5. mutation 성공 시 invalidate 대상 확인
6. optimistic update가 필요하면 rollback snapshot 구현

새 게시글성 도메인:

- 재사용 후보: `BoardSelectPage`, `BoardWriteForm`, `BoardSwipeDetailView`, `BoardDetailCard`, `CommentModal`, `useBookmark`, `usePrefer`, 댓글 hook들
- 새로 필요한 것: 선택 대상 타입, 작성 payload id 필드, service endpoint, 목록 card, preview/detail card

<a id="checklist"></a>

## 12. 검증 체크리스트

자동 검증:

```bash
npm run lint
npm run build
```

수동 확인:

- 로그인/회원가입/카카오 콜백
- 홈 탭 전환, 인기/저장 테마 무한 스크롤
- 커뮤니티 테마 탭(`/community/theme`) 목록, 상세, 세로 스와이프, 좋아요, 북마크, 댓글
- 테마 글 작성, 수정, 삭제
- 커뮤니티 디자인 에셋 탭(`/community/design`) 목록, 상세, 작성, 수정, 삭제
- 알림 탭(`/notify`) 진입과 하단 탭 활성 상태
- 마이페이지 프로필 이미지/이름 수정
- 내가 올린 글, 저장한 글, 커스텀 컴포넌트 탭
- 저장글에서 북마크 해제 시 목록 제거

<a id="risks"></a>

## 13. 주의점과 개선 후보

우선순위 높은 주의점:

- 일부 한글 문자열/주석이 깨져 보입니다. 특히 `MobileLayout.tsx`, `BottomTabBar.tsx`, `MyPage.tsx`, `ApiClient.ts`, `DesignService.ts`, `index.css`를 확인해야 합니다.
- `MobileLayout`의 route 판별은 pathname 조건 기반입니다. route 추가 시 같이 수정해야 합니다.
- `DesignService.ts`에는 API endpoint 확인 필요 주석이 남아 있습니다.
- `HomeThemeGrid`가 직접 data fetching을 합니다. 원칙상 Screen으로 올릴 수 있지만 현재 구조도 기능상 문제는 없습니다.
- `useBoardWriteForm`의 blob URL unmount cleanup은 아직 없습니다.
- `src/components/ui`와 일부 `.gitkeep`은 예약/빈 폴더입니다.
- Prettier가 없어 quote, semicolon, 줄바꿈 스타일이 조금 섞여 있습니다.
- unit/e2e test 스크립트는 없습니다.

추후 개선 후보:

- 깨진 한글 라벨 복구
- route meta 상수화
- formatter 도입 여부 결정
- mapping 함수와 query cache 유틸 테스트 추가
- auth refresh 성공/실패 테스트 추가
- 게시글 작성 FormData 생성 로직 테스트 추가

<a id="onboarding"></a>

## 14. 첫날 온보딩 순서

1. `src/main.tsx`: Provider와 앱 진입 확인
2. `src/routes/AppRoutes.tsx`: route tree와 `AuthInitializer` 확인
3. `src/layouts/MobileLayout.tsx`: 모바일 프레임, header, bottom tab 확인
4. `src/services/api/ApiClient.ts`: Axios와 refresh 흐름 확인
5. `src/stores/authStore.ts`: 인증 상태 모델 확인
6. `src/constants/queryKeys.ts`: 캐시 key 규칙 확인
7. `src/pages/theme-community/List.tsx`: 커뮤니티 탭 URL(`/community/theme`, `/community/design`) 확인
8. `src/pages/theme-community/*`: 테마 상세/작성/수정 흐름 확인
9. `src/pages/design-community/*`: 디자인 에셋 상세/작성/수정 흐름 확인
10. `src/pages/mypage/MyPage.tsx`: 프로필과 탭 구조 확인
11. `src/components/community/*`: 공통 상세/작성 컴포넌트 확인

<a id="file-map"></a>

## 15. 빠른 파일 맵

| 목적 | 파일 |
| --- | --- |
| 앱 진입점 | `src/main.tsx` |
| 라우팅 | `src/routes/AppRoutes.tsx` |
| 보호 라우트 | `src/routes/ProtectedRoutes.tsx` |
| 모바일 레이아웃 | `src/layouts/MobileLayout.tsx` |
| 하단 탭 | `src/layouts/BottomTabBar.tsx` |
| 알림 화면 | `src/pages/notification/Notification.tsx` |
| API client | `src/services/api/ApiClient.ts` |
| Query key | `src/constants/queryKeys.ts` |
| 인증 store | `src/stores/authStore.ts` |
| 커뮤니티 탭 목록 | `src/pages/theme-community/List.tsx` |
| 테마 목록 hook | `src/services/hooks/theme/useThemeBoards.ts` |
| 테마 상세 hook | `src/services/hooks/theme/useThemeBoardDetails.ts` |
| 디자인 에셋 목록 hook | `src/services/hooks/design/useDesignBoards.ts` |
| 디자인 에셋 상세 hook | `src/services/hooks/design/useDesignBoardDetails.ts` |
| 공통 상세 카드 | `src/components/community/BoardDetailCard.tsx` |
| 공통 작성 폼 | `src/components/community/BoardWriteForm.tsx` |
| 세로 스와이프 상세 | `src/components/community/BoardSwipeDetailView.tsx` |
| 마이페이지 | `src/pages/mypage/MyPage.tsx` |

이 프로젝트는 Screen, service, hook, component 분리가 꽤 명확한 편입니다. 새 작업을 시작할 때는 route와 query key, raw-to-UI mapping 위치만 먼저 잡으면 대부분의 변경을 기존 패턴 안에서 처리할 수 있습니다.
