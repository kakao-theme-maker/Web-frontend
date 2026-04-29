import { useQueryClient } from '@tanstack/react-query';
import { usePatchMutation } from '../../api/useApi';
import { UserService } from '../../api/UserService';
import type { IUserProfileRaw } from '../../../types/mypage/types';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useProfileEdit() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateImage, isPending: isImageUploading } =
    usePatchMutation<IUserProfileRaw, File>(
      (file) => UserService.updateProfileImage(file),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile() });
        },
      },
    );

  const { mutateAsync: updateName, isPending: isNameSaving } =
    usePatchMutation<IUserProfileRaw, string>(
      (name) => UserService.updateName(name),
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userProfile() });
        },
      },
    );

  return { updateImage, isImageUploading, updateName, isNameSaving };
}
