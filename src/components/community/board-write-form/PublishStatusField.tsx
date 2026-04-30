import type { UseFormSetValue } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../../types/community/theme';
import Text from '../../common/Text';

interface IPublishStatusFieldProps {
  isPublic: boolean;
  setValue: UseFormSetValue<IBoardWriteFormData>;
}

export default function PublishStatusField({ isPublic, setValue }: IPublishStatusFieldProps) {
  return (
    <div className="mb-6">
      <Text variant="SEMIBOLD_14" as="p" className="mb-2 text-black">
        커뮤니티 공개여부
      </Text>
      <div className="flex gap-4">
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={isPublic === true}
            onChange={() => setValue('isPublic', true)}
            className="h-4 w-4 accent-primary"
          />
          <Text variant="REGULAR_14">예</Text>
        </label>
        <label className="flex items-center gap-1.5">
          <input
            type="checkbox"
            checked={isPublic === false}
            onChange={() => setValue('isPublic', false)}
            className="h-4 w-4 accent-primary"
          />
          <Text variant="REGULAR_14">아니오</Text>
        </label>
      </div>
    </div>
  );
}
