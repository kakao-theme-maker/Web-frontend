import { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import type { IBoardDetailBase, IMoreMenuItem } from '../../types/community/common';
import { cn } from '../../utils/cn';
import Text from '../common/Text';
import { useOutsideClick } from '../../services/hooks/common/useOutsideClick';
import { useCommentActions } from '../../services/hooks/common/useCommentActions';
import { usePrefer } from '../../services/hooks/common/usePrefer';
import { useBookmark } from '../../services/hooks/common/useBookmark';
import { useAuthStore } from '../../stores/authStore';
import { formatDate } from '../../utils/date';
import ImageSlider from '../common/ImageSlider';
import CommentModal from './CommentModal';
import Confirm from '../common/Confirm';
import Alert from '../common/Alert';

import BookmarkIcon from '../icons/community-detail/bookmark.svg?react';
import HeartIcon from '../icons/community-detail/heart.svg?react';
import CommentIcon from '../icons/community-detail/comment.svg?react';
import MoreIcon from '../icons/community-detail/more.svg?react';

interface IBoardDetailCardProps {
  board: IBoardDetailBase;
  downloadLabel?: string;
  imageAlt: string;
  editPath?: string;
  preferQueryKey: unknown[];
  deleteBoard?: (boardId: number) => void;
  portalContainer?: Element | null;
  moreMenuItems?: IMoreMenuItem[];
  removeOnUnbookmark?: boolean;
  allowBookmarkForMyBoard?: boolean;
}

export default function BoardDetailCard({
  board,
  downloadLabel,
  imageAlt,
  editPath,
  preferQueryKey,
  deleteBoard,
  portalContainer,
  moreMenuItems,
  removeOnUnbookmark,
  allowBookmarkForMyBoard,
}: IBoardDetailCardProps) {
  const navigate = useNavigate();
  const userEmail = useAuthStore((state) => state.userEmail);
  const isMyBoard = userEmail === board.userEmail;

  const { isBookmarked, toggleBookmark, isPending: isBookmarkPending } = useBookmark(
    board.boardId,
    board.isBookmarked,
    preferQueryKey,
    removeOnUnbookmark,
  );
  const { isPreferred, prefers, togglePrefer, isPending } = usePrefer(
    board.boardId,
    board.prefers,
    board.isLiked,
    preferQueryKey,
  );
  const {
    deleteTargetId,
    editTarget,
    isDeleteConfirmOpen,
    isEditConfirmOpen,
    isDeleteAlertOpen,
    isEditAlertOpen,
    setIsDeleteConfirmOpen,
    setIsEditConfirmOpen,
    setIsDeleteAlertOpen,
    setIsEditAlertOpen,
    deleteComment,
    updateComment,
    requestDelete,
    requestEdit,
  } = useCommentActions(board.boardId);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isDownloadConfirmOpen, setIsDownloadConfirmOpen] = useState(false);
  const [isDownloadAlertOpen, setIsDownloadAlertOpen] = useState(false);
  const [isDeleteBoardConfirmOpen, setIsDeleteBoardConfirmOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  const menuClass = cn(
    'flex h-8 w-8 items-center justify-center rounded-full',
    isMenuOpen && 'text-white bg-primary',
  );

  const handlePrefer = () => {
    if (isMyBoard) return;
    togglePrefer();
  };

  const handleBookmark = () => {
    if (isMyBoard && !allowBookmarkForMyBoard) return;
    toggleBookmark();
  };

  const defaultMenuItems: IMoreMenuItem[] = [
    ...(downloadLabel
      ? [{
          id: 'download',
          label: downloadLabel,
          onClick: () => { setIsMenuOpen(false); setIsDownloadConfirmOpen(true); },
        }]
      : []),
    { id: 'share', label: '공유하기', onClick: () => setIsMenuOpen(false) },
    ...(isMyBoard && editPath
      ? [{
          id: 'edit',
          label: '수정하기',
          onClick: () => { setIsMenuOpen(false); navigate(editPath, { state: { board } }); },
        }]
      : []),
    ...(isMyBoard && deleteBoard
      ? [{
          id: 'delete',
          label: '게시글 삭제',
          onClick: () => { setIsMenuOpen(false); setIsDeleteBoardConfirmOpen(true); },
        }]
      : []),
  ];

  const menuItems = moreMenuItems ?? defaultMenuItems;

  return (
    <main className="pt-8 pb-16">
      {/* 유저 헤더 */}
      <section className="flex items-center justify-between px-5">
        <div className="flex min-w-0 max-w-[55%] items-center gap-2.5">
          {board.profileImage ? (
            <img
              src={board.profileImage}
              alt="프로필"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 shrink-0 rounded-full bg-secondary-300" />
          )}
          <div className="flex min-w-0 flex-col">
            <Text variant="BOLD_15" className="truncate">{board.userName}</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">{formatDate(board.createdAt)}</Text>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          {!isMyBoard && (
            <button className="rounded-[5px] bg-primary px-4 py-[3px] text-white">
              <Text variant="MEDIUM_12">팔로우</Text>
            </button>
          )}
          <div ref={menuRef} className="relative">
            <button
              className={menuClass}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="더보기 메뉴"
            >
              <MoreIcon width={24} height={24} />
            </button>
            {isMenuOpen && menuItems.length > 0 && (
              <div className="absolute right-0 top-10 z-20 w-[112px] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-md divide-y divide-secondary-100">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className="w-full px-3 py-1 hover:bg-secondary-50 text-center"
                    onClick={item.onClick}
                  >
                    <Text
                      variant="MEDIUM_12"
                      className={item.id === 'delete' ? 'text-red-500' : undefined}
                    >
                      {item.label}
                    </Text>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 이미지 슬라이더 */}
      <section className="mt-3">
        <ImageSlider images={board.previewImageUrls} alt={imageAlt} />
      </section>

      {/* 액션 + 내용 */}
      <section className="mt-5 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrefer}
                disabled={isPending || isMyBoard}
                aria-label="좋아요"
              >
                <HeartIcon
                  width={24}
                  height={24}
                  className={isPreferred ? 'text-red-500' : 'text-secondary-300'}
                />
              </button>
              <Text variant="REGULAR_15">{prefers}</Text>
            </div>
            <div className="flex items-center gap-1.5">
              <button onClick={() => setIsCommentOpen(true)}>
                <CommentIcon width={24} height={24} aria-label="댓글" />
              </button>
              <Text variant="REGULAR_15">{board.comments}</Text>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            disabled={isBookmarkPending || (isMyBoard && !allowBookmarkForMyBoard)}
            aria-label="북마크"
          >
            <BookmarkIcon
              width={12}
              height={17}
              className={isBookmarked ? 'text-primary' : 'text-secondary-300'}
            />
          </button>
        </div>

        <div className="mt-2">
          <Text variant="MEDIUM_14" className="mr-2 inline-block max-w-[40%] truncate align-bottom">
            {board.userName}
          </Text>
          <Text variant="REGULAR_14">{board.content}</Text>
        </div>
      </section>

      {/* 다운로드 Confirm / Alert */}
      {isDownloadConfirmOpen && (
        <Confirm
          message={<>어떤 버전으로<br />다운받으시겠습니까?</>}
          confirmText="IOS"
          cancelText="안드로이드"
          onConfirm={() => { setIsDownloadConfirmOpen(false); setIsDownloadAlertOpen(true); }}
          onCancel={() => { setIsDownloadConfirmOpen(false); setIsDownloadAlertOpen(true); }}
          onClose={() => setIsDownloadConfirmOpen(false)}
        />
      )}
      {isDownloadAlertOpen && (
        <Alert message="저장 완료!" onConfirm={() => setIsDownloadAlertOpen(false)} />
      )}

      {/* 게시글 삭제 Confirm */}
      {isDeleteBoardConfirmOpen && (
        <Confirm
          message="게시글을 삭제하시겠습니까?"
          confirmText="삭제할게요"
          cancelText="아니요"
          onConfirm={() => { setIsDeleteBoardConfirmOpen(false); deleteBoard?.(board.boardId); }}
          onCancel={() => setIsDeleteBoardConfirmOpen(false)}
          onClose={() => setIsDeleteBoardConfirmOpen(false)}
        />
      )}

      {/* 댓글 모달 포탈 */}
      {isCommentOpen &&
        createPortal(
          <>
            <div
              className="absolute inset-0 z-40 bg-black/70"
              onClick={() => setIsCommentOpen(false)}
            />
            <div className="absolute bottom-0 left-0 right-0 z-50">
              <CommentModal
                boardId={board.boardId}
                onRequestDelete={requestDelete}
                onRequestEdit={requestEdit}
              />
            </div>

            {isDeleteConfirmOpen && (
              <Confirm
                message="댓글을 삭제하시겠습니까?"
                confirmText="삭제할게요"
                cancelText="아니요"
                onConfirm={() => deleteTargetId !== null && deleteComment(deleteTargetId)}
                onCancel={() => setIsDeleteConfirmOpen(false)}
                onClose={() => setIsDeleteConfirmOpen(false)}
              />
            )}
            {isDeleteAlertOpen && (
              <Alert
                message="댓글이 삭제되었습니다."
                onConfirm={() => setIsDeleteAlertOpen(false)}
              />
            )}
            {isEditConfirmOpen && (
              <Confirm
                message="댓글을 수정하시겠습니까?"
                confirmText="수정할게요"
                cancelText="아니요"
                onConfirm={() => editTarget !== null && updateComment(editTarget)}
                onCancel={() => setIsEditConfirmOpen(false)}
                onClose={() => setIsEditConfirmOpen(false)}
              />
            )}
            {isEditAlertOpen && (
              <Alert
                message="댓글이 수정되었습니다."
                onConfirm={() => setIsEditAlertOpen(false)}
              />
            )}
          </>,
          portalContainer ?? document.getElementById('phone-root') ?? document.body,
        )}

      {/* 삭제 모달이 댓글 모달 바깥에서도 열릴 수 있어야 하므로 별도 렌더 */}
    </main>
  );
}
