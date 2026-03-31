import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserThemes } from '../../services/hooks/useUserThemes';
import ThemeSelectItem from '../../components/community/ThemeSelectItem';
import Button from '../../components/common/Button';
import Text from '../../components/common/Text';
import type { IUserTheme } from '../../types/community/theme';

export default function BoardThemeSelect() {
  const navigate = useNavigate();
  const { themes, isLoading, isError } = useUserThemes();
  const [selectedThemeId, setSelectedThemeId] = useState<number | null>(null);

  const handleSelect = (themeComponentId: number) => {
    setSelectedThemeId(themeComponentId);
  };

  const handleConfirm = () => {
    const selectedTheme = themes.find((t) => t.themeComponentId === selectedThemeId);
    if (!selectedTheme) return;
    navigate('/community/write/post', { state: { selectedTheme } });
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
          테마를 불러오지 못했습니다.
        </Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-5">
      <Text variant="SEMIBOLD_18" as="p" className="mb-5 text-black">
        글을 작성할 테마를 선택하세요
      </Text>

      {themes.length === 0 ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <Text variant="REGULAR_14" className="text-secondary-400">
            보유한 테마가 없습니다.
          </Text>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {themes.map((theme: IUserTheme) => (
            <li key={theme.themeComponentId}>
              <ThemeSelectItem
                theme={theme}
                isSelected={selectedThemeId === theme.themeComponentId}
                onSelect={handleSelect}
              />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        <Button fullWidth disabled={selectedThemeId === null} onClick={handleConfirm}>
          선택완료
        </Button>
      </div>
    </div>
  );
}
