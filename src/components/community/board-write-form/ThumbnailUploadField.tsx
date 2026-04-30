import Text from '../../common/Text';

interface IThumbnailUploadFieldProps {
  previewUrl: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ThumbnailUploadField({
  previewUrl,
  onImageChange,
}: IThumbnailUploadFieldProps) {
  return (
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
        <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
      </label>
    </div>
  );
}
