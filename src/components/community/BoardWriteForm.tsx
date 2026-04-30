import type { UseFormRegister, UseFormWatch, UseFormSetValue, FieldErrors } from 'react-hook-form';
import type { IBoardWriteFormData } from '../../types/community/theme';
import Button from '../common/Button';
import PublishStatusField from './board-write-form/PublishStatusField';
import TagInputField from './board-write-form/TagInputField';
import TextFields from './board-write-form/TextFields';
import ThumbnailUploadField from './board-write-form/ThumbnailUploadField';

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

      <ThumbnailUploadField previewUrl={previewUrl} onImageChange={handleImageChange} />
      <TextFields register={register} errors={errors} />
      <TagInputField
        tags={tags}
        tagInput={tagInput}
        setTagInput={setTagInput}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
      <PublishStatusField isPublic={isPublic} setValue={setValue} />

      <Button type="submit" isFullWidth disabled={isSubmitting}>
        {isSubmitting ? '처리 중...' : submitLabel}
      </Button>
    </form>
  );
}
