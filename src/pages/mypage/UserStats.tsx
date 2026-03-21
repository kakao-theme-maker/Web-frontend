import Text from "../../components/common/Text";
import type { IUserProfile } from "../../types/mypage/types";

interface IUserStatsProps {
  uploadCount: IUserProfile["uploadCount"];
  followingCount: IUserProfile["followingCount"];
  followerCount: IUserProfile["followerCount"];
}

export default function UserStats({ uploadCount, followingCount, followerCount }: IUserStatsProps) {
  return (
    <div className="flex w-full items-center justify-around">
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">업로드</Text>
        <Text variant="SEMIBOLD_15">{uploadCount}</Text>
      </div>
      <div className="h-8 w-px bg-secondary-200" />
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">팔로잉</Text>
        <Text variant="SEMIBOLD_15">{followingCount}</Text>
      </div>
      <div className="h-8 w-px bg-secondary-200" />
      <div className="flex flex-col items-center gap-0.5">
        <Text variant="REGULAR_14">팔로워</Text>
        <Text variant="SEMIBOLD_15">{followerCount}</Text>
      </div>
    </div>
  );
}
