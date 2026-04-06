import Text from "../../components/common/Text";
import UserStats from "./UserStats";
import { useUserProfile } from "../../services/hooks/useUserProfile";

interface IProfileInfoRowProps {
  label: string;
  value: string;
}

function ProfileInfoRow({ label, value }: IProfileInfoRowProps) {
  return (
    <button className="flex w-full items-center justify-between px-4 py-3">
      <div className="flex items-center gap-6 min-w-0">
        <Text variant="REGULAR_14" className="text-secondary-400 w-10 shrink-0 text-left">
          {label}
        </Text>
        <Text variant="REGULAR_14" className="truncate">{value}</Text>
      </div>
      <span className="text-secondary-300">{">"}</span>
    </button>
  );
}

export default function ProfileEdit() {
  const { profile } = useUserProfile();

  return (
    <main className="flex flex-col gap-4 bg-[#f1f1f1] px-4 pt-6 pb-8 min-h-full">
      {/* 프로필 이미지 */}
      <section className="flex flex-col items-center gap-2">
        {profile?.profileImage ? (
          <img
            src={profile.profileImage}
            alt="프로필 이미지"
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-secondary-300" />
        )}
        <button>
          <Text variant="REGULAR_14" className="text-primary">
            사진 변경
          </Text>
        </button>

        {/* 통계 */}
        <UserStats
          uploads={profile?.uploads ?? 0}
          following={profile?.following ?? 0}
          followers={profile?.followers ?? 0}
        />
      </section>

      {/* 정보 수정 */}
      <section className="overflow-hidden rounded-xl bg-white mt-2">
        <ProfileInfoRow label="이름" value={profile?.name ?? ""} />
        <ProfileInfoRow label="이메일" value={profile?.userEmail ?? ""} />
      </section>
    </main>
  );
}
