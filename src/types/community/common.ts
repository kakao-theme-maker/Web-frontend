// 커뮤니티 / 공통 UI 타입

export interface IMoreMenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

// 커뮤니티 공통 타입

export interface ITag {
  tag_id: number;
  tag_name: string;
}

export type CommunityTabId = 'theme' | 'design';

// DesignDetailCard / ThemeDetailCard 공통 필드
export interface IBoardDetailBase {
  boardId: number;
  prefers: number;
  isLiked: boolean;
  isBookmarked: boolean;
  userEmail: string;
  userName: string;
  profileImage?: string;
  createdAt: string;
  content: string;
  previewImageUrls: string[];
  comments: number;
}
