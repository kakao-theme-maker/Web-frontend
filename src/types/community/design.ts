/**
 * 디자인 커뮤니티 관련 타입 정의 파일
 * ※ API 엔드포인트 확인 후 실제 경로로 교체 필요
 */

export interface ITag {
  tag_id: number;
  tag_name: string;
}

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

// GET /api/design-boards/{post_id} 응답 - 서버 원본 형식 (snake_case)
export interface IDesignBoardDetailRaw extends IDesignBoardRaw {
  content: string;
  comments: number;
  tags: ITag[];
  liked: boolean;
  bookmarked: boolean;
  user_name: string;
  profile_image?: string;
}

// 디자인 게시글 상세 UI 모델 (camelCase)
export interface IDesignBoardDetail extends IDesignBoard {
  content: string;
  comments: number;
  tags: ITag[];
  isLiked: boolean;
  isBookmarked: boolean;
  userName: string;
  profileImage?: string;
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
