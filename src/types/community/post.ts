/**
 * 커뮤니티 관련 타입 정의 파일
 */

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

export interface IComment {
  id: number;
  author: string;
  text: string;
  date: string;
  isLiked: boolean;
}

export type TabId = 'activity' | 'keyword';
export interface ITab {
  id: TabId
  label: string;
}