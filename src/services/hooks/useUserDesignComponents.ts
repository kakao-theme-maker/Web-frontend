import { useGetQuery } from '../api/useApi';
import { DesignService } from '../api/DesignService';
import { useAuthStore } from '../../stores/authStore';
import type { IUserDesignComponentRaw } from '../../types/community/design';

export function useUserDesignComponents() {
  const userEmail = useAuthStore((state) => state.userEmail);

  const { data, isLoading, isError } = useGetQuery(
    ['user-design-components', userEmail],
    () => DesignService.getUserDesignComponents(userEmail!, 0, 100),
    { enabled: !!userEmail },
  );

  const components: IUserDesignComponentRaw[] = data ?? [];

  return { components, isLoading, isError };
}
