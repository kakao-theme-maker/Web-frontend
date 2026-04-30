import Alert from '../../common/Alert';
import Confirm from '../../common/Confirm';

interface IBoardDetailModalsProps {
  isDownloadConfirmOpen: boolean;
  isDownloadAlertOpen: boolean;
  isDeleteBoardConfirmOpen: boolean;
  onCloseDownloadConfirm: () => void;
  onCompleteDownloadChoice: () => void;
  onCloseDownloadAlert: () => void;
  onCloseDeleteBoardConfirm: () => void;
  onConfirmDeleteBoard: () => void;
}

export default function BoardDetailModals({
  isDownloadConfirmOpen,
  isDownloadAlertOpen,
  isDeleteBoardConfirmOpen,
  onCloseDownloadConfirm,
  onCompleteDownloadChoice,
  onCloseDownloadAlert,
  onCloseDeleteBoardConfirm,
  onConfirmDeleteBoard,
}: IBoardDetailModalsProps) {
  return (
    <>
      {isDownloadConfirmOpen && (
        <Confirm
          message={<>어떤 버전으로<br />다운받으시겠습니까?</>}
          confirmText="IOS"
          cancelText="안드로이드"
          onConfirm={onCompleteDownloadChoice}
          onCancel={onCompleteDownloadChoice}
          onClose={onCloseDownloadConfirm}
        />
      )}
      {isDownloadAlertOpen && (
        <Alert message="저장 완료!" onConfirm={onCloseDownloadAlert} />
      )}
      {isDeleteBoardConfirmOpen && (
        <Confirm
          message="게시글을 삭제하시겠습니까?"
          confirmText="삭제할게요"
          cancelText="아니요"
          onConfirm={onConfirmDeleteBoard}
          onCancel={onCloseDeleteBoardConfirm}
          onClose={onCloseDeleteBoardConfirm}
        />
      )}
    </>
  );
}
