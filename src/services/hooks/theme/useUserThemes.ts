import { useGetQuery } from '../../api/useApi';
import { ThemeService } from '../../api/ThemeService';
import { useAuthStore } from '../../../stores/authStore';
import type { IUserTheme } from '../../../types/community/theme';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useUserThemes() {
  const userEmail = useAuthStore((state) => state.userEmail);

  const { data, isLoading, isError } = useGetQuery(
    QUERY_KEYS.userThemes(userEmail),
    () => ThemeService.getUserThemes(userEmail!, 0, 100),
    { enabled: !!userEmail },
  );

  const themes: IUserTheme[] = data ?? [];

  return { themes, isLoading, isError };
}
