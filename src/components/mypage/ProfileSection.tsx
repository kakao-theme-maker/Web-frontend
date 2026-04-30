import type { IUserProfile } from '../../types/mypage/types';
import Text from '../common/Text';
import InlineNameEditor from './InlineNameEditor';
import ProfileImageEditor from './ProfileImageEditor';
import UserStats from './UserStats';

interface IProfileSectionProps {
  profile?: IUserProfile | null;
  isLoading: boolean;
  isImageUploading: boolean;
  isNameSaving: boolean;
  onImageChange: (file: File) => void;
  onNameChange: (name: string) => Promise<unknown>;
}

export default function ProfileSection({
  profile,
  isLoading,
  isImageUploading,
  isNameSaving,
  onImageChange,
  onNameChange,
}: IProfileSectionProps) {
  return (
    <section className="flex flex-col items-center px-5 pt-6 pb-1">
      <ProfileImageEditor
        profileImage={profile?.profileImage}
        isLoading={isLoading}
        isUploading={isImageUploading}
        onImageChange={onImageChange}
      />

      <div className="mt-2 flex flex-col items-center">
        {isLoading ? (
          <div className="h-5 w-24 rounded bg-secondary-200 animate-pulse" />
        ) : (
          <>
            <InlineNameEditor
              name={profile?.name ?? ''}
              isSaving={isNameSaving}
              onNameChange={onNameChange}
            />
            <Text variant="LIGHT_12" className="text-secondary-400">
              {profile?.userEmail}
            </Text>
          </>
        )}
      </div>

      {isLoading ? (
        <div className="mt-3 h-10 w-full rounded bg-secondary-200 animate-pulse" />
      ) : (
        <UserStats
          uploads={profile?.uploads ?? 0}
          following={profile?.following ?? 0}
          followers={profile?.followers ?? 0}
        />
      )}
    </section>
  );
}
