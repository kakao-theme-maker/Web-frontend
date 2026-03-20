import { useState } from "react";
import { useParams } from "react-router-dom";
import Text from "../../components/common/Text";
import MoreMenu from "../../components/common/MoreMenu";
import Button from "../../components/common/Button";
import CommentModal from "../../components/community/CommentModal";

// icons
import BookmarkIcon from '../../components/icons/community-detail/bookmark.svg?react';
import HeartIcon from '../../components/icons/community-detail/heart.svg?react';
import CommentIcon from '../../components/icons/community-detail/comment.svg?react';

const MORE_MENU_ITEMS = [
  { label: "테마 다운로드", onClick: () => {} },
  { label: "공유하기", onClick: () => {} },
];

export default function CommunityDetail() {
  const { boardId } = useParams();
  // 댓글 모달창 상태값
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <main className="pt-8">
      <section className="flex items-center justify-between px-5">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full bg-secondary-300" />
          <div className="flex flex-col">
            <Text variant="BOLD_15">강은성</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">
              3월 25일
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm">팔로우</Button>
          <MoreMenu items={MORE_MENU_ITEMS} />
        </div>
      </section>

      <section className="mt-3">
        <div className="relative h-[330px] w-full overflow-hidden rounded-[2px] bg-secondary-200">
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </section>

      <section className="mt-5 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <HeartIcon width={24} height={24} aria-label="좋아요" />
              <Text variant="REGULAR_15">110</Text>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setIsCommentOpen(true)}>
                <CommentIcon width={24} height={24} aria-label="댓글" />
              </button>
              <Text variant="REGULAR_15">190</Text>
            </div>
          </div>
          <BookmarkIcon width={12} height={17} aria-label="북마크" />
        </div>

        <div className="mt-2">
          <Text variant="MEDIUM_14" className="mr-2">
            강은성
          </Text>
          <Text variant="REGULAR_14">좋아요 댓글 후 저장해주세요 ^^ #{boardId}</Text>
        </div>
        <Text variant="REGULAR_14" className="mt-1 text-secondary-400">
          4일 전
        </Text>
      </section>

      {/* 댓글 모달 (바텀 시트 스타일) */}
      {isCommentOpen && (
        <>
          {/* 어두운 배경 (클릭 시 닫힘) */}
          <div 
            className="absolute inset-0 z-40 bg-black/70" 
            onClick={() => setIsCommentOpen(false)} 
          />
          {/* 모달: 하단에 고정 */}
          <div className="absolute bottom-0 left-0 right-0 z-50">
            <CommentModal />
          </div>
        </>
      )}
    </main>
  );
}
