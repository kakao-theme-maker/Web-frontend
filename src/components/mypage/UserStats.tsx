import type { IUserProfile } from '../../types/mypage/types';
import Text from '../common/Text';

interface IUserStatsProps {
  uploads: IUserProfile['uploads'];
  following: IUserProfile['following'];
  followers: IUserProfile['followers'];
}

export default function UserStats({ uploads, following, followers }: IUserStatsProps) {
  return (
    <div className="flex w-full items-center justify-around">
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">업로드</Text>
        <Text variant="SEMIBOLD_15">{uploads}</Text>
      </div>
      <div className="h-8 w-px bg-secondary-200" />
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">팔로잉</Text>
        <Text variant="SEMIBOLD_15">{following}</Text>
      </div>
      <div className="h-8 w-px bg-secondary-200" />
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">팔로워</Text>
        <Text variant="SEMIBOLD_15">{followers}</Text>
      </div>
    </div>
  );
}
