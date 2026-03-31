import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { usePostMutation } from '../api/useApi';
import { CommunityService } from '../api/CommunityService';
import type { IBoardWriteFormData, IBoardCreateResponseRaw, IUserTheme } from '../../types/community/post';

export function useBoardWrite(selectedTheme: IUserTheme) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IBoardWriteFormData>({
    defaultValues: { isPublic: true },
  });

  const { mutate: submitBoard, isPending } = usePostMutation<IBoardCreateResponseRaw, FormData>(
    (formData) => CommunityService.createThemeBoard(formData),
    {
      onSuccess: () => {
        navigate('/community');
      },
    },
  );

  const onSubmit = handleSubmit((formData) => {
    const boardInfo = {
      title: formData.title,
      content: formData.content,
      themeComponentId: selectedTheme.themeComponentId,
      publicFlag: formData.isPublic,
    };

    const multipartForm = new FormData();
    multipartForm.append(
      'board_info',
      new Blob([JSON.stringify(boardInfo)], { type: 'application/json' }),
    );

    submitBoard(multipartForm);
  });

  return {
    register,
    handleSubmit: onSubmit,
    watch,
    setValue,
    errors,
    isSubmitting: isSubmitting || isPending,
  };
}
