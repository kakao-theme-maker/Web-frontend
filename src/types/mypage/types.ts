/**
 * 마이페이지 관련 타입 정의 파일
 */

// 유저 프로필
export interface IUserProfile {
  name: string;
  email: string;
  uploadCount: number;
  followingCount: number;
  followerCount: number;
}

// 마이페이지 탭 ID
export type MyPageTabId = "activity" | "saved" | "liked";

// 마이페이지 게시글 아이템
export interface IMyPagePost {
  id: number;
  author: string;
  date: string;
  previewImageUrl?: string;
}
