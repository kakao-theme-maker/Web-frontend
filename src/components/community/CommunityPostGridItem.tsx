/**
 * 커뮤니티 게시글 목록 아이템 컴포넌트
 * @param item 게시글 아이템
 */
import type { ICommunityPostItem } from "../../types/community/post";
import { Link } from "react-router-dom";

interface ICommunityPostGridItemProps {
  item: ICommunityPostItem;
}

export default function CommunityPostGridItem({ item }: ICommunityPostGridItemProps) {
  return (
    <Link
      to={`/community/${item.boardId}`}
      className="block h-[120px] overflow-hidden rounded-[2px] bg-secondary-100"
      aria-label={`${item.title} 상세 페이지로 이동`}
    >
      {item.previewImageUrl ? (
        <img src={item.previewImageUrl} alt={item.title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[12px] text-secondary-400">
          미리보기
        </div>
      )}
    </Link>
  );
}