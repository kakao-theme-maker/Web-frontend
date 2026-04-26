import { useQueryClient } from '@tanstack/react-query';
import { useDeleteMutation, usePostMutation } from '../../api/useApi';
import { BoardInteractionService } from '../../api/BoardInteractionService';
import type { ICommentRaw } from '../../../types/community/theme';

type ICommentLikeSnapshot = { snapshot: ICommentRaw[] | undefined };

function getNumberValue(...values: Array<number | undefined>): number {
  return values.find((value) => typeof value === 'number') ?? 0;
}

export function getCommentLikeCount(comment: ICommentRaw): number {
  return getNumberValue(
    comment.likes,
    comment.likeCount,
    comment.likedCount,
    comment.likesCount,
    comment.like_count,
    comment.liked_count,
    comment.likes_count,
  );
}

export function getCommentIsLiked(comment: ICommentRaw): boolean {
  return comment.isLiked ?? comment.liked ?? false;
}

function updateCommentLikeState(comment: ICommentRaw, commentId: number, isLiked: boolean) {
  if (comment.commentId !== commentId) return comment;

  const currentCount = getCommentLikeCount(comment);
  const nextCount = Math.max(0, currentCount + (isLiked ? 1 : -1));

  return {
    ...comment,
    isLiked,
    liked: isLiked,
    likes: nextCount,
    likeCount: comment.likeCount === undefined ? comment.likeCount : nextCount,
    likedCount: comment.likedCount === undefined ? comment.likedCount : nextCount,
    likesCount: comment.likesCount === undefined ? comment.likesCount : nextCount,
    like_count: comment.like_count === undefined ? comment.like_count : nextCount,
    liked_count: comment.liked_count === undefined ? comment.liked_count : nextCount,
    likes_count: comment.likes_count === undefined ? comment.likes_count : nextCount,
  };
}

export function useCommentLike(boardId: number, comment: ICommentRaw) {
  const queryClient = useQueryClient();
  const queryKey = ['comments', boardId];
  const isLiked = getCommentIsLiked(comment);
  const likes = getCommentLikeCount(comment);

  const updateComments = async (nextIsLiked: boolean) => {
    await queryClient.cancelQueries({ queryKey });
    const snapshot = queryClient.getQueryData<ICommentRaw[]>(queryKey);

    queryClient.setQueryData<ICommentRaw[]>(queryKey, (old) =>
      old?.map((item) => updateCommentLikeState(item, comment.commentId, nextIsLiked)),
    );

    return { snapshot } as ICommentLikeSnapshot;
  };

  const rollback = (context: unknown, fallbackIsLiked: boolean) => {
    const ctx = context as ICommentLikeSnapshot | undefined;
    if (ctx?.snapshot !== undefined) {
      queryClient.setQueryData(queryKey, ctx.snapshot);
      return;
    }

    queryClient.setQueryData<ICommentRaw[]>(queryKey, (old) =>
      old?.map((item) => updateCommentLikeState(item, comment.commentId, fallbackIsLiked)),
    );
  };

  const { mutate: likeComment, isPending: isLikePending } = usePostMutation<unknown, number>(
    (commentId) => BoardInteractionService.likeComment(commentId),
    {
      onMutate: () => updateComments(true),
      onError: (_err, _vars, context) => rollback(context, false),
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const { mutate: unlikeComment, isPending: isUnlikePending } = useDeleteMutation<unknown, number>(
    (commentId) => BoardInteractionService.unlikeComment(commentId),
    {
      onMutate: () => updateComments(false),
      onError: (_err, _vars, context) => rollback(context, true),
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    },
  );

  const toggleCommentLike = () => {
    if (isLiked) {
      unlikeComment(comment.commentId);
      return;
    }

    likeComment(comment.commentId);
  };

  return {
    isLiked,
    likes,
    toggleCommentLike,
    isPending: isLikePending || isUnlikePending,
  };
}
