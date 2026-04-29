import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../api/UserService';
import { useAuthStore } from '../../../stores/authStore';
import type { IUserProfile, IUserProfileRaw } from '../../../types/mypage/types';
import { QUERY_KEYS } from '../../../constants/queryKeys';

function mapProfile(raw: IUserProfileRaw): IUserProfile {
  return {
    name: raw.name,
    followers: raw.followers,
    following: raw.following,
    uploads: raw.uploads,
    userEmail: raw.user_email,
    profileImage: raw.profile_image,
    publicUserId: raw.public_user_id,
    createdAt: raw.created_at,
  };
}

export function useUserProfile() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.userProfile(),
    queryFn: () => UserService.getMe().then(mapProfile),
    enabled: isAuthenticated,
  });

  return { profile: data ?? null, isLoading, isError };
}
