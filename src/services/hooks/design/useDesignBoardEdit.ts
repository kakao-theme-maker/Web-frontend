import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePatchMutation } from '../../api/useApi';
import { DesignService } from '../../api/DesignService';
import { useBoardWriteForm } from '../common/useBoardWriteForm';
import type { IDesignBoardCreateResponseRaw } from '../../../types/community/design';
import type { IDesignBoardDetail } from '../../../types/community/design';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useDesignBoardEdit(board: IDesignBoardDetail) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm({
    title: board.title,
    content: board.content,
    isPublic: true,
    tags: board.tags.map((t) => t.tag_name),
    previewUrl: board.previewImageUrls?.[0] ?? null,
  });

  const { mutate, isPending } = usePatchMutation<IDesignBoardCreateResponseRaw, FormData>(
    (formData) => DesignService.updateDesignBoard(board.boardId, formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.designBoardDetails() });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myUploadPosts() });
        navigate(`/community/design/${board.boardId}`, { replace: true });
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
