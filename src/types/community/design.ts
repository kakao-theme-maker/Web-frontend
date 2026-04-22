/**
 * 디자인 커뮤니티 관련 타입 정의 파일
 * ※ API 엔드포인트 확인 후 실제 경로로 교체 필요
 */

import type { ITag } from './common';
export type { ITag } from './common';

// GET /api/design-boards 응답 항목 - 서버 원본 형식 (snake_case)
export interface IDesignBoardRaw {
  post_id: number;
  design_component_id: number;
  title: string;
  prefers: number;
  preview_image_url: string;
  user_email: string;
  created_at: string;
}

// 디자인 게시글 UI 모델 (camelCase)
export interface IDesignBoard {
  boardId: number;
  designComponentId: number;
  title: string;
  prefers: number;
  previewImageUrl: string;
  userEmail: string;
  createdAt: string;
}

// GET /api/design-boards/details 응답 항목 - 서버 원본 형식 (snake_case)
export interface IDesignBoardDetailsRaw {
  post_id: number;
  design_component_id: number;
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

// 디자인 게시글 상세 UI 모델 (camelCase)
export interface IDesignBoardDetail {
  boardId: number;
  designComponentId: number;
  title: string;
  content: string;
  prefers: number;
  comments: number;
  tags: ITag[];
  isLiked: boolean;
  isBookmarked: boolean;
  previewImageUrls: string[];
  userEmail: string;
  userName: string;
  profileImage?: string;
  createdAt: string;
}

// GET /api/design-components/user/{userEmail} 응답 항목 - 서버 원본 형식 (snake_case)
export interface IUserDesignComponentRaw {
  design_component_id: number;
  public_user_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
}

// POST /api/design-boards 응답 - 서버 원본 형식
export interface IDesignBoardCreateResponseRaw {
  title: string;
  content: string;
  prefers: number;
  post_id: number;
  design_component_id: number;
  user_email: string;
  created_at: string;
  preview_image_url: string;
}

// 게시글 작성 폼 데이터
export interface IDesignBoardWriteFormData {
  title: string;
  content: string;
  isPublic: boolean;
}
