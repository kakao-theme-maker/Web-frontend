import { useGetQuery } from '../api/useApi';
import { CommunityService } from '../api/CommunityService';
import { useAuthStore } from '../../stores/authStore';
import type { IUserTheme } from '../../types/community/post';

export function useUserThemes() {
  const userEmail = useAuthStore((state) => state.userEmail);

  const { data, isLoading, isError } = useGetQuery(
    ['user-themes', userEmail],
    () => CommunityService.getUserThemes(userEmail!, 0, 100),
    { enabled: !!userEmail },
  );

  const themes: IUserTheme[] = data ?? [];

  return { themes, isLoading, isError };
}
