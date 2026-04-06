import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchMutation } from '../api/useApi';
import { ThemeService } from '../api/ThemeService';
import { useBoardWriteForm } from './useBoardWriteForm';
import type { IBoardCreateResponseRaw } from '../../types/community/theme';
import type { IThemeBoardDetail } from '../../types/community/theme';

export function useBoardEdit(post: IThemeBoardDetail) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm({
    title: post.title,
    content: post.content,
    isPublic: true,
    tags: post.tags.map((t) => t.tag_name),
    previewUrl: post.previewImageUrl ?? null,
  });

  const { mutate, isPending } = usePatchMutation<IBoardCreateResponseRaw, FormData>(
    (formData) => ThemeService.updateThemeBoard(post.boardId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['theme-board-detail', post.boardId] });
        navigate(`/community/${post.boardId}`, { replace: true });
      },
    },
  );

  const handleSubmit = rhfHandleSubmit((formData) => {
    const boardInfo = {
      title: formData.title,
      content: formData.content,
      publicFlag: formData.isPublic,
      post_tags: tags.map((tag) => ({ tag_name: tag })),
    };
    const multipartForm = new FormData();
    multipartForm.append('board_info', new Blob([JSON.stringify(boardInfo)], { type: 'application/json' }));
    if (previewImage) multipartForm.append('preview_image', previewImage);
    mutate(multipartForm);
  });

  return { ...formProps, tags, handleSubmit, isSubmitting: formIsSubmitting || isPending };
}
