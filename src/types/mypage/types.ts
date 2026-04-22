/**
 * 마이페이지 관련 타입 정의 파일
 */

import type { ITag } from '../community/common';

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

// 저장된/좋아요 게시글 API 응답 (snake_case)
export interface IUserPostListItemRaw {
  postId: number;
  previewImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

// 테마 그리드 아이템 (저장된/좋아요 탭)
export interface IThemeGridItem {
  id: number;
  previewImageUrl?: string;
}

// 게시글 타입
export type PostType = 'THEME_BOARD' | 'DESIGN_BOARD';

// GET /api/users/me/upload-posts 응답 항목 - 서버 원본 형식
export interface IMyUploadPostRaw {
  postId: number;
  title: string;
  content: string;
  tags: ITag[];
  previewImageUrl: string[];
  createdAt: string;
  updatedAt: string;
  postType: PostType;
  authorName: string;
  authorProfileImageUrl: string;
  prefers: number;
  comments: number;
  bookmarked: boolean;
  preferred: boolean;
}

// 내가 업로드한 게시글 UI 모델 (BoardDetailCard와 호환)
export interface IMyUploadPost {
  boardId: number;
  title: string;
  content: string;
  tags: ITag[];
  previewImageUrls: string[];
  createdAt: string;
  updatedAt: string;
  postType: PostType;
  userName: string;
  profileImage?: string;
  userEmail: string;
  prefers: number;
  comments: number;
  isBookmarked: boolean;
  isLiked: boolean;
}
