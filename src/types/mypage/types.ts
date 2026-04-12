/**
 * 마이페이지 관련 타입 정의 파일
 */

// 유저 프로필 API 응답 (snake_case)
export interface IUserProfileRaw {
  name: string;
  followers: number;
  following: number;
  uploads: number;
  user_email: string;
  profile_image: string;
  public_user_id: string;
  created_at: string;
}

// 유저 프로필 (camelCase)
export interface IUserProfile {
  name: string;
  followers: number;
  following: number;
  uploads: number;
  userEmail: string;
  profileImage: string;
  publicUserId: string;
  createdAt: string;
}

// 마이페이지 탭 ID
export type MyPageTabId = "activity" | "saved" | "liked";

// 마이페이지 게시글 아이템
export interface IMyPageBoard {
  id: number;
  author: string;
  date: string;
  previewImageUrl?: string;
}

// 테마 그리드 아이템 (저장된/좋아요 탭)
export interface IThemeGridItem {
  id: number;
  previewImageUrl?: string;
  categoryId: string;
}

// 테마 카테고리 필터
export interface IThemeCategory {
  id: string;
  label: string;
}
