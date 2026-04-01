import { useState, useRef } from "react";
import type { IThemeBoardDetail } from "../../../types/community/theme";
import Text from "../../common/Text";
import { useOutsideClick } from "../../../services/hooks/useOutsideClick";
import { useComments } from "../../../services/hooks/useComments";
import { useCommentActions } from "../../../services/hooks/useCommentActions";
import { usePrefer } from "../../../services/hooks/usePrefer";
import CommentModal from "../CommentModal";
import Confirm from "../../common/Confirm";
import Alert from "../../common/Alert";

// icons
import BookmarkIcon from '../../icons/community-detail/bookmark.svg?react';
import HeartIcon from '../../icons/community-detail/heart.svg?react';
import CommentIcon from '../../icons/community-detail/comment.svg?react';

interface IThemeDetailCardProps {
  post: IThemeBoardDetail;
}

export default function ThemeDetailCard({ post }: IThemeDetailCardProps) {
  const { comments } = useComments(post.boardId);
  const { isPreferred, prefers, togglePrefer } = usePrefer(post.boardId, post.prefers);
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
  } = useCommentActions(post.boardId);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isDownloadConfirmOpen, setIsDownloadConfirmOpen] = useState(false);
  const [isDownloadAlertOpen, setIsDownloadAlertOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  const menuClass = `flex h-8 w-8 items-center justify-center rounded-full` + (isMenuOpen ? ` text-white bg-primary` : ``);

  return (
    <main className="pt-8 pb-16">
      <section className="flex items-center justify-between px-5">
        <div className="flex min-w-0 max-w-[55%] items-center gap-2.5">
          <img
            src="https://placehold.co/40x40"
            alt="프로필"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <Text variant="BOLD_15" className="truncate">{post.userEmail}</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">{post.createdAt}</Text>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button className="rounded-[5px] bg-primary px-4 py-[3px] text-white">
            <Text variant="MEDIUM_12">팔로우</Text>
          </button>
          <div ref={menuRef} className="relative">
            <button
              className={menuClass}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-label="더보기 메뉴"
            >
              <span className="text-3xl leading-none">⋮</span>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-10 z-20 w-[112px] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-md">
                <button
                  className="w-full px-3 py-1 text-left hover:bg-secondary-50 text-center"
                  onClick={() => { setIsMenuOpen(false); setIsDownloadConfirmOpen(true); }}
                >
                  <Text variant="MEDIUM_12">테마 다운로드</Text>
                </button>
                <button className="w-full border-t border-secondary-100 px-3 py-1 text-left hover:bg-secondary-50 text-center">
                  <Text variant="MEDIUM_12">공유하기</Text>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="mt-3">
        <div className="relative h-[330px] w-full overflow-hidden rounded-[2px] bg-secondary-200">
          {post.previewImageUrl && (
            <img src={post.previewImageUrl} alt="테마 미리보기" className="h-full w-full object-cover" />
          )}
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
              <button onClick={togglePrefer} aria-label="좋아요">
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
              <Text variant="REGULAR_15">{comments.length}</Text>
            </div>
          </div>
          <BookmarkIcon width={12} height={17} aria-label="북마크" />
        </div>

        <div className="mt-2">
          <Text variant="MEDIUM_14" className="mr-2 inline-block max-w-[40%] truncate align-bottom">
            {post.userEmail}
          </Text>
          <Text variant="REGULAR_14">{post.content}</Text>
        </div>
        <Text variant="REGULAR_14" className="mt-1 text-secondary-400">{post.createdAt}</Text>
      </section>

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
        <Alert
          message="저장 완료!"
          onConfirm={() => setIsDownloadAlertOpen(false)}
        />
      )}

      {isCommentOpen && (
        <>
          <div
            className="absolute inset-0 z-40 bg-black/70"
            onClick={() => setIsCommentOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-50">
            <CommentModal
              postId={post.boardId}
              comments={comments}
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
        </>
      )}
    </main>
  );
}
