import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { IBoardDetailBase, IMoreMenuItem } from '../../types/community/common';
import { useOutsideClick } from '../../services/hooks/common/useOutsideClick';
import { useCommentActions } from '../../services/hooks/common/useCommentActions';
import { usePrefer } from '../../services/hooks/common/usePrefer';
import { useBookmark } from '../../services/hooks/common/useBookmark';
import { useAuthStore } from '../../stores/authStore';
import ImageSlider from '../common/ImageSlider';
import BoardCommentPortal from './board-detail/BoardCommentPortal';
import BoardDetailActions from './board-detail/BoardDetailActions';
import BoardDetailContent from './board-detail/BoardDetailContent';
import BoardDetailHeader from './board-detail/BoardDetailHeader';
import BoardDetailModals from './board-detail/BoardDetailModals';

interface IBoardDetailCardProps {
  board: IBoardDetailBase;
  downloadLabel?: string;
  imageAlt: string;
  editPath?: string;
  preferQueryKey: readonly unknown[];
  deleteBoard?: (boardId: number) => void;
  portalContainer?: Element | null;
  moreMenuItems?: IMoreMenuItem[];
  hasUnbookmarkRemoval?: boolean;
  hasOwnBoardBookmarkPermission?: boolean;
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
  hasUnbookmarkRemoval,
  hasOwnBoardBookmarkPermission,
}: IBoardDetailCardProps) {
  const navigate = useNavigate();
  const userEmail = useAuthStore((state) => state.userEmail);
  const isMyBoard = userEmail === board.userEmail;

  const { isBookmarked, toggleBookmark, isPending: isBookmarkPending } = useBookmark(
    board.boardId,
    board.isBookmarked,
    preferQueryKey,
    hasUnbookmarkRemoval,
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

  const handlePrefer = () => {
    if (isMyBoard) return;
    togglePrefer();
  };

  const handleBookmark = () => {
    if (isMyBoard && !hasOwnBoardBookmarkPermission) return;
    toggleBookmark();
  };

  const handleDownloadChoice = () => {
    setIsDownloadConfirmOpen(false);
    setIsDownloadAlertOpen(true);
  };

  const handleDeleteBoard = () => {
    setIsDeleteBoardConfirmOpen(false);
    deleteBoard?.(board.boardId);
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
      <BoardDetailHeader
        profileImage={board.profileImage}
        userName={board.userName}
        createdAt={board.createdAt}
        isMyBoard={isMyBoard}
        menuItems={menuItems}
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
      />

      <section className="mt-3">
        <ImageSlider images={board.previewImageUrls} alt={imageAlt} />
      </section>

      <section className="mt-5 px-5">
        <BoardDetailActions
          isPreferred={isPreferred}
          prefers={prefers}
          isPreferDisabled={isPending || isMyBoard}
          onPrefer={handlePrefer}
          comments={board.comments}
          onOpenComments={() => setIsCommentOpen(true)}
          isBookmarked={isBookmarked}
          isBookmarkDisabled={isBookmarkPending || (isMyBoard && !hasOwnBoardBookmarkPermission)}
          onBookmark={handleBookmark}
        />
        <BoardDetailContent userName={board.userName} content={board.content} />
      </section>

      <BoardDetailModals
        isDownloadConfirmOpen={isDownloadConfirmOpen}
        isDownloadAlertOpen={isDownloadAlertOpen}
        isDeleteBoardConfirmOpen={isDeleteBoardConfirmOpen}
        onCloseDownloadConfirm={() => setIsDownloadConfirmOpen(false)}
        onCompleteDownloadChoice={handleDownloadChoice}
        onCloseDownloadAlert={() => setIsDownloadAlertOpen(false)}
        onCloseDeleteBoardConfirm={() => setIsDeleteBoardConfirmOpen(false)}
        onConfirmDeleteBoard={handleDeleteBoard}
      />
      <BoardCommentPortal
        isOpen={isCommentOpen}
        boardId={board.boardId}
        portalContainer={portalContainer}
        isDeleteConfirmOpen={isDeleteConfirmOpen}
        isDeleteAlertOpen={isDeleteAlertOpen}
        isEditConfirmOpen={isEditConfirmOpen}
        isEditAlertOpen={isEditAlertOpen}
        onClose={() => setIsCommentOpen(false)}
        onRequestDelete={requestDelete}
        onRequestEdit={requestEdit}
        onConfirmDelete={() => deleteTargetId !== null && deleteComment(deleteTargetId)}
        onCancelDelete={() => setIsDeleteConfirmOpen(false)}
        onCloseDeleteAlert={() => setIsDeleteAlertOpen(false)}
        onConfirmEdit={() => editTarget !== null && updateComment(editTarget)}
        onCancelEdit={() => setIsEditConfirmOpen(false)}
        onCloseEditAlert={() => setIsEditAlertOpen(false)}
      />
    </main>
  );
}
