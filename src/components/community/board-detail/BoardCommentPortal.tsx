import { createPortal } from 'react-dom';
import Alert from '../../common/Alert';
import Confirm from '../../common/Confirm';
import CommentModal from '../CommentModal';

interface IBoardCommentPortalProps {
  isOpen: boolean;
  boardId: number;
  portalContainer?: Element | null;
  isDeleteConfirmOpen: boolean;
  isDeleteAlertOpen: boolean;
  isEditConfirmOpen: boolean;
  isEditAlertOpen: boolean;
  onClose: () => void;
  onRequestDelete: (commentId: number) => void;
  onRequestEdit: (commentId: number, content: string) => void;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  onCloseDeleteAlert: () => void;
  onConfirmEdit: () => void;
  onCancelEdit: () => void;
  onCloseEditAlert: () => void;
}

export default function BoardCommentPortal({
  isOpen,
  boardId,
  portalContainer,
  isDeleteConfirmOpen,
  isDeleteAlertOpen,
  isEditConfirmOpen,
  isEditAlertOpen,
  onClose,
  onRequestDelete,
  onRequestEdit,
  onConfirmDelete,
  onCancelDelete,
  onCloseDeleteAlert,
  onConfirmEdit,
  onCancelEdit,
  onCloseEditAlert,
}: IBoardCommentPortalProps) {
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="absolute inset-0 z-40 bg-black/70" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <CommentModal
          boardId={boardId}
          onRequestDelete={onRequestDelete}
          onRequestEdit={onRequestEdit}
        />
      </div>

      {isDeleteConfirmOpen && (
        <Confirm
          message="댓글을 삭제하시겠습니까?"
          confirmText="삭제할게요"
          cancelText="아니요"
          onConfirm={onConfirmDelete}
          onCancel={onCancelDelete}
          onClose={onCancelDelete}
        />
      )}
      {isDeleteAlertOpen && (
        <Alert message="댓글이 삭제되었습니다." onConfirm={onCloseDeleteAlert} />
      )}
      {isEditConfirmOpen && (
        <Confirm
          message="댓글을 수정하시겠습니까?"
          confirmText="수정할게요"
          cancelText="아니요"
          onConfirm={onConfirmEdit}
          onCancel={onCancelEdit}
          onClose={onCancelEdit}
        />
      )}
      {isEditAlertOpen && (
        <Alert message="댓글이 수정되었습니다." onConfirm={onCloseEditAlert} />
      )}
    </>,
    portalContainer ?? document.getElementById('phone-root') ?? document.body,
  );
}
