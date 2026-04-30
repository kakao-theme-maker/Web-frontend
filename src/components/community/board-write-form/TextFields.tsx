import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../../types/community/theme';
import Text from '../../common/Text';

interface ITextFieldsProps {
  register: UseFormRegister<IBoardWriteFormData>;
  errors: FieldErrors<IBoardWriteFormData>;
}

export default function TextFields({ register, errors }: ITextFieldsProps) {
  return (
    <>
      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          글제목
        </Text>
        <input
          {...register('title', { required: '제목을 입력해주세요.' })}
          placeholder="제목을 입력해주세요."
          className="w-full rounded-lg border border-secondary-200 px-3 py-2 text-sm outline-none placeholder:text-secondary-300 focus:border-primary"
        />
        {errors.title && (
          <Text variant="REGULAR_12" as="p" className="mt-1 text-red-500">
            {errors.title.message}
          </Text>
        )}
      </div>

      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          내용
        </Text>
        <textarea
          {...register('content', { required: '내용을 입력해주세요.' })}
          placeholder="내용을 입력해주세요."
          rows={4}
          className="w-full resize-none rounded-lg border border-secondary-200 px-3 py-2 text-sm outline-none placeholder:text-secondary-300 focus:border-primary"
        />
        {errors.content && (
          <Text variant="REGULAR_12" as="p" className="mt-1 text-red-500">
            {errors.content.message}
          </Text>
        )}
      </div>
    </>
  );
}
