import Text from '../../common/Text';

interface ITagInputFieldProps {
  tags: string[];
  tagInput: string;
  setTagInput: (value: string) => void;
  onAddTag: () => void;
  onRemoveTag: (tag: string) => void;
}

export default function TagInputField({
  tags,
  tagInput,
  setTagInput,
  onAddTag,
  onRemoveTag,
}: ITagInputFieldProps) {
  return (
    <div className="mb-4">
      <Text variant="SEMIBOLD_14" as="label" className="mb-1 block text-black">
        태그
      </Text>
      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onRemoveTag(tag)}
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
              if (!e.nativeEvent.isComposing) onAddTag();
            }
          }}
          placeholder="#태그"
          className="h-7 w-16 rounded-md border border-secondary-200 bg-white px-2 text-xs text-secondary-500 outline-none placeholder:text-secondary-400"
        />
        <button
          type="button"
          onClick={onAddTag}
          className="h-7 rounded-md bg-primary px-3 text-xs text-white"
        >
          태그 추가하기
        </button>
      </div>
    </div>
  );
}
