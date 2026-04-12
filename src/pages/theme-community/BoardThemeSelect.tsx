import { useNavigate } from 'react-router-dom';
import { useUserThemes } from '../../services/hooks/theme/useUserThemes';
import BoardSelectPage from '../../components/community/BoardSelectPage';
import ThemeSelectItem from '../../components/community/ThemeSelectItem';
import type { IUserTheme } from '../../types/community/theme';

export default function BoardThemeSelect() {
  const navigate = useNavigate();
  const { themes, isLoading, isError } = useUserThemes();

  return (
    <BoardSelectPage
      title="글을 작성할 테마를 선택하세요"
      items={themes}
      isLoading={isLoading}
      isError={isError}
      errorMessage="테마를 불러오지 못했습니다."
      emptyMessage="보유한 테마가 없습니다."
      getItemId={(theme: IUserTheme) => theme.themeComponentId}
      renderItem={(theme, isSelected, onSelect) => (
        <ThemeSelectItem theme={theme} isSelected={isSelected} onSelect={onSelect} />
      )}
      onConfirm={(theme) => navigate('/community/write/post', { state: { selectedTheme: theme } })}
    />
  );
}
