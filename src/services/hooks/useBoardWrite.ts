import { useNavigate } from 'react-router-dom';
import { usePostMutation } from '../api/useApi';
import { ThemeService } from '../api/ThemeService';
import { useBoardWriteForm } from './useBoardWriteForm';
import type { IBoardCreateResponseRaw, IUserTheme } from '../../types/community/theme';

export function useBoardWrite(selectedTheme: IUserTheme) {
  const navigate = useNavigate();
  const { rhfHandleSubmit, formIsSubmitting, previewImage, tags, ...formProps } = useBoardWriteForm();

  const { mutate, isPending } = usePostMutation<IBoardCreateResponseRaw, FormData>(
    (formData) => ThemeService.createThemeBoard(formData),
    { onSuccess: () => navigate('/community') },
  );

  const handleSubmit = rhfHandleSubmit((formData) => {
    const boardInfo = {
      title: formData.title,
      content: formData.content,
      themeComponentId: selectedTheme.themeComponentId,
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
