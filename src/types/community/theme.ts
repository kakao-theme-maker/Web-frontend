/**
 * 테마 커뮤니티 관련 타입 정의 파일
 */

export interface ITag {
  tag_id: number;
  tag_name: string;
}

// GET /api/theme-boards/{post_id} 응답 - 서버 원본 형식 (snake_case)
export interface IThemeBoardDetailRaw {
  post_id: number;
  theme_component_id: number;
  title: string;
  content: string;
  prefers: number;
  comments: number;
  tags: ITag[];
  liked: boolean;
  bookmarked: boolean;
  preview_image_url: string;
  user_email: string;
  user_name: string;
  profile_image?: string;
  created_at: string;
}

// 테마 게시글 상세 UI 모델 (camelCase)
export interface IThemeBoardDetail {
  boardId: number;
  themeComponentId: number;
  title: string;
  content: string;
  prefers: number;
  comments: number;
  tags: ITag[];
  isLiked: boolean;
  isBookmarked: boolean;
  previewImageUrl: string;
  userEmail: string;
  userName: string;
  profileImage?: string;
  createdAt: string;
}

// GET /api/theme-boards 응답 항목 - 서버 원본 형식 (snake_case)
export interface IThemeBoardRaw {
  post_id: number;
  theme_component_id: number;
  title: string;
  prefers: number;
  preview_image_url: string;
  user_email: string;
  created_at: string;
}

// 테마 게시글 UI 모델 (camelCase)
export interface IThemeBoard {
  boardId: number;
  themeComponentId: number;
  title: string;
  previewImageUrl: string;
  userEmail: string;
  createdAt: string;
  prefers: number;
}

export interface ICommentRaw {
  commentId: number;
  userEmail: string;
  content: string;
  createdAt: string;
}

export type TabId = 'activity' | 'keyword';
export interface ITab {
  id: TabId
  label: string;
}

// GET /api/themes/user/{userEmail} 응답 항목 - 서버 원본 형식 (snake_case)
export interface IUserThemeRaw {
  themeComponentId: number;
  userEmail: string;
  themeName: string;
  versionNumber: string;
  versionName: string;
  isDone: boolean;
  isPublic: boolean;
  styles: { colorStyleId: number; color: string }[];
  images: { designComponentId: number }[];
}

// 유저 테마 UI 모델
export interface IUserTheme {
  themeComponentId: number;
  userEmail: string;
  themeName: string;
  versionNumber: string;
  versionName: string;
  isDone: boolean;
  isPublic: boolean;
  styles: { colorStyleId: number; color: string }[];
  images: { designComponentId: number }[];
}

// POST /api/theme-boards 응답 - 서버 원본 형식 (snake_case)
export interface IBoardCreateResponseRaw {
  title: string;
  content: string;
  prefers: number;
  post_id: number;
  theme_component_id: number;
  user_email: string;
  created_at: string;
  preview_image_url: string;
}

// 게시글 작성 폼 데이터
export interface IBoardWriteFormData {
  title: string;
  content: string;
  isPublic: boolean;
}
