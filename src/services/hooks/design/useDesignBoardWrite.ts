import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { usePostMutation } from '../../api/useApi';
import { DesignService } from '../../api/DesignService';
import { useBoardWriteForm } from '../common/useBoardWriteForm';
import type { IDesignBoardCreateResponseRaw, IUserDesignComponentRaw } from '../../../types/community/design';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useDesignBoardWrite(selectedComponent: IUserDesignComponentRaw) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm();

  const { mutate, isPending } = usePostMutation<IDesignBoardCreateResponseRaw, FormData>(
    (formData) => DesignService.createDesignBoard(formData),
    {
      onSuccess: (board) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile() });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.designBoards() });
        navigate(`/community/design/${board.post_id}`);
      },
    },
  );

  const handleSubmit = rhfHandleSubmit((formData) => {
    const boardInfo = {
      title: formData.title,
      content: formData.content,
      designComponentId: selectedComponent.design_component_id,
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
