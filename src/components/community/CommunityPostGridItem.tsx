/**
 * 커뮤니티 게시글 목록 아이템 컴포넌트
 * @param item 게시글 아이템
 */
import type { ICommunityPostItme } from "../../types/community/post";

interface ICommunityPostGridItemProps {
  item: ICommunityPostItme;
}

export default function CommunityPostGridItem({ item }: ICommunityPostGridItemProps) {
  return <div className="h-[120px] rounded-[2px] bg-secondary-100" />;
}