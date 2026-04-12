import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePutMutation } from '../../api/useApi';
import { ThemeService } from '../../api/ThemeService';
import { useBoardWriteForm } from '../common/useBoardWriteForm';
import type { IBoardCreateResponseRaw } from '../../../types/community/theme';
import type { IThemeBoardDetail } from '../../../types/community/theme';

export function useThemeBoardEdit(board: IThemeBoardDetail) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm({
    title: board.title,
    content: board.content,
    isPublic: true,
    tags: (board.tags ?? []).map((t) => t.tag_name),
    previewUrl: board.previewImageUrl ?? null,
  });

  const { mutate, isPending } = usePutMutation<IBoardCreateResponseRaw, FormData>(
    (formData) => ThemeService.updateThemeBoard(board.boardId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['theme-board-detail', board.boardId] });
        navigate(`/community/${board.boardId}`, { replace: true });
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
