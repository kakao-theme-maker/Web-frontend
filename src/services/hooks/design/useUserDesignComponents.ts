import { useGetQuery } from '../../api/useApi';
import { DesignService } from '../../api/DesignService';
import { useAuthStore } from '../../../stores/authStore';
import type { IUserDesignComponentRaw } from '../../../types/community/design';
import { QUERY_KEYS } from '../../../constants/queryKeys';

export function useUserDesignComponents() {
  const userEmail = useAuthStore((state) => state.userEmail);

  const { data, isLoading, isError } = useGetQuery(
    QUERY_KEYS.userDesignComponents(userEmail),
    () => DesignService.getUserDesignComponents(userEmail!, 0, 100),
    { enabled: !!userEmail },
  );

  const components: IUserDesignComponentRaw[] = data ?? [];

  return { components, isLoading, isError };
}
