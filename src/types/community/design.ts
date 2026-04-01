/**
 * 디자인 커뮤니티 관련 타입 정의 파일
 * ※ API 엔드포인트 확인 후 실제 응답 구조에 맞게 수정 필요
 */

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
}

// 디자인 게시글 상세 UI 모델 (camelCase)
export interface IDesignBoardDetail extends IDesignBoard {
  content: string;
}
