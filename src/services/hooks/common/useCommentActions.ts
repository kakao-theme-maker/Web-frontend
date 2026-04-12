import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteMutation, usePutMutation } from '../../api/useApi';
import { PostService } from '../../api/PostService';
import type { ICommentRaw } from '../../../types/community/theme';

export function useCommentActions(postId: number) {
  const queryClient = useQueryClient();

  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [editTarget, setEditTarget] = useState<{ commentId: number; content: string } | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isEditConfirmOpen, setIsEditConfirmOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [isEditAlertOpen, setIsEditAlertOpen] = useState(false);

  const { mutate: deleteComment } = useDeleteMutation<ICommentRaw, number>(
    (commentId) => PostService.deleteComment(commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        setIsDeleteConfirmOpen(false);
        setIsDeleteAlertOpen(true);
      },
    },
  );

  const { mutate: updateComment } = usePutMutation<ICommentRaw, { commentId: number; content: string }>(
    ({ commentId, content }) => PostService.updateComment(commentId, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
        setIsEditConfirmOpen(false);
        setIsEditAlertOpen(true);
      },
    },
  );

  const requestDelete = (commentId: number) => {
    setDeleteTargetId(commentId);
    setIsDeleteConfirmOpen(true);
  };

  const requestEdit = (commentId: number, content: string) => {
    setEditTarget({ commentId, content });
    setIsEditConfirmOpen(true);
  };

  return {
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
  };
}
