import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BoardDetailCard from '../community/BoardDetailCard';
import Confirm from '../common/Confirm';
import { useDeleteThemeBoard } from '../../services/hooks/theme/useDeleteThemeBoard';
import { useDeleteDesignBoard } from '../../services/hooks/design/useDeleteDesignBoard';
import type { IMyUploadPost } from '../../types/mypage/types';
import type { IMoreMenuItem } from '../../types/community/common';

interface IMyActivityCardProps {
  post: IMyUploadPost;
}

export default function MyActivityCard({ post }: IMyActivityCardProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const onDeleteSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['my-upload-posts'] });
  };

  const { deleteBoard: deleteThemeBoard } = useDeleteThemeBoard(onDeleteSuccess);
  const { deleteBoard: deleteDesignBoard } = useDeleteDesignBoard(onDeleteSuccess);

  const isTheme = post.postType === 'THEME_BOARD';
  const editPath = isTheme
    ? `/community/edit/${post.boardId}`
    : `/design/edit/${post.boardId}`;
  const deleteBoard = isTheme ? deleteThemeBoard : deleteDesignBoard;

  const moreMenuItems: IMoreMenuItem[] = [
    {
      id: 'edit',
      label: '수정하기',
      onClick: () => navigate(editPath, { state: { board: post } }),
    },
    {
      id: 'delete',
      label: '삭제하기',
      onClick: () => setIsDeleteConfirmOpen(true),
    },
    {
      id: 'comment-restrict',
      label: '댓글 제한',
      onClick: () => {},
    },
  ];

  return (
    <>
      <BoardDetailCard
        board={post}
        imageAlt={isTheme ? '테마 미리보기' : '디자인 미리보기'}
        preferQueryKey={['my-upload-posts']}
        moreMenuItems={moreMenuItems}
      />
      {isDeleteConfirmOpen && (
        <Confirm
          message="게시글을 삭제하시겠습니까?"
          confirmText="삭제할게요"
          cancelText="아니요"
          onConfirm={() => {
            setIsDeleteConfirmOpen(false);
            deleteBoard(post.boardId);
          }}
          onCancel={() => setIsDeleteConfirmOpen(false)}
          onClose={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </>
  );
}
