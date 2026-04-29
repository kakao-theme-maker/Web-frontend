import Button from '../common/Button';
import Text from '../common/Text';
import { useState } from 'react';

interface IBoardSelectPageProps<T> {
  title: string;
  items: T[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
  emptyMessage?: string;
  getItemId: (item: T) => number;
  renderItem: (item: T, isSelected: boolean, onSelect: (id: number) => void) => React.ReactNode;
  onConfirm: (item: T) => void;
}

export default function BoardSelectPage<T>({
  title,
  items,
  isLoading,
  isError,
  errorMessage = '목록을 불러오지 못했습니다.',
  emptyMessage = '보유한 항목이 없습니다.',
  getItemId,
  renderItem,
  onConfirm,
}: IBoardSelectPageProps<T>) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleConfirm = () => {
    const selected = items.find((item) => getItemId(item) === selectedId);
    if (!selected) return;
    onConfirm(selected);
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Text variant="REGULAR_14" className="text-secondary-400">
          {errorMessage}
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-5">
      <Text variant="SEMIBOLD_18" as="p" className="mb-5 text-black">
        {title}
      </Text>

      {items.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <Text variant="REGULAR_14" className="text-secondary-400">
            {emptyMessage}
          </Text>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={getItemId(item)}>
              {renderItem(item, selectedId === getItemId(item), setSelectedId)}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Button isFullWidth disabled={selectedId === null} onClick={handleConfirm}>
          선택완료
        </Button>
      </div>
    </div>
  );
}
