/**
 * 커뮤니티 관련 타입 정의 파일
 */

// 테마 커뮤니티 게시글 항목
export interface ICommunityPostItem {
  boardId: number;
  themeComponentId: number;
  title: string;
  previewImageUrl: string;
  userEmail: string;
  createdAt: string;
  prefers: number;
}