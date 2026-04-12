import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../types/community/theme';
import Button from '../common/Button';
import Text from '../common/Text';

interface IBoardWriteFormProps {
  preview: React.ReactNode;
  register: UseFormRegister<IBoardWriteFormData>;
  watch: UseFormWatch<IBoardWriteFormData>;
  setValue: UseFormSetValue<IBoardWriteFormData>;
  errors: FieldErrors<IBoardWriteFormData>;
  isSubmitting: boolean;
  tags: string[];
  tagInput: string;
  setTagInput: (v: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tag: string) => void;
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  submitLabel?: string;
}

export default function BoardWriteForm({
  preview,
  register,
  watch,
  setValue,
  errors,
  isSubmitting,
  tags,
  tagInput,
  setTagInput,
  handleAddTag,
  handleRemoveTag,
  previewUrl,
  handleImageChange,
  onSubmit,
  submitLabel = '작성완료',
}: IBoardWriteFormProps) {
  const isPublic = watch('isPublic');

  return (
    <form onSubmit={onSubmit} className="flex flex-col px-4 py-5">
      {preview}

      {/* 썸네일 이미지 업로드 */}
      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          썸네일 이미지 <Text variant="REGULAR_12" className="text-secondary-400">(선택)</Text>
        </Text>
        <label className="flex h-24 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-secondary-300 bg-secondary-50">
          {previewUrl ? (
            <img src={previewUrl} alt="썸네일 미리보기" className="h-full w-full object-cover" />
          ) : (
            <Text variant="REGULAR_12" className="text-secondary-400">+ 이미지 선택</Text>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
      </div>

      {/* 글제목 */}
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

      {/* 내용 */}
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

      {/* 태그 */}
      <div className="mb-4">
        <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
          태그
        </Text>
        <div className="flex flex-wrap items-center gap-1.5">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className="rounded-full bg-secondary-100 px-2.5 py-1 text-xs text-secondary-500"
            >
              #{tag} ×
            </button>
          ))}
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (!e.nativeEvent.isComposing) handleAddTag();
              }
            }}
            placeholder="#태그"
            className="h-7 w-16 rounded-md border border-secondary-200 bg-white px-2 text-xs text-secondary-500 outline-none placeholder:text-secondary-400"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="h-7 rounded-md bg-primary px-3 text-xs text-white"
          >
            태그 추가하기
          </button>
        </div>
      </div>

      {/* 커뮤니티 공개여부 */}
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

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? '처리 중...' : submitLabel}
      </Button>
    </form>
  );
}
