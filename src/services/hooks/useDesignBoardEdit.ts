import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchMutation } from '../api/useApi';
import { DesignService } from '../api/DesignService';
import { useBoardWriteForm } from './useBoardWriteForm';
import type { IDesignBoardCreateResponseRaw } from '../../types/community/design';
import type { IDesignBoardDetail } from '../../types/community/design';

export function useDesignBoardEdit(post: IDesignBoardDetail) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm({
    title: post.title,
    content: post.content,
    isPublic: true,
    tags: post.tags.map((t) => t.tag_name),
    previewUrl: post.previewImageUrl ?? null,
  });

  const { mutate, isPending } = usePatchMutation<IDesignBoardCreateResponseRaw, FormData>(
    (formData) => DesignService.updateDesignBoard(post.boardId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['design-board-detail', post.boardId] });
        navigate(`/design/${post.boardId}`, { replace: true });
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
