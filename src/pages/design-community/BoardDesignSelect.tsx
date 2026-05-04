import { useNavigate } from 'react-router-dom';
import { useUserDesignComponents } from '../../services/hooks/design/useUserDesignComponents';
import BoardSelectPage from '../../components/community/BoardSelectPage';
import DesignSelectItem from '../../components/community/DesignSelectItem';
import type { IUserDesignComponentRaw } from '../../types/community/design';

export default function BoardDesignSelect() {
  const navigate = useNavigate();
  const { components, isLoading, isError } = useUserDesignComponents();

  return (
    <BoardSelectPage
      title="글을 작성할 디자인을 선택하세요"
      items={components}
      isLoading={isLoading}
      isError={isError}
      errorMessage="디자인 컴포넌트를 불러오지 못했습니다."
      emptyMessage="보유한 디자인이 없습니다."
      getItemId={(component: IUserDesignComponentRaw) => component.design_component_id}
      renderItem={(component, isSelected, onSelect) => (
        <DesignSelectItem component={component} isSelected={isSelected} onSelect={onSelect} />
      )}
      onConfirm={(component) => navigate('/community/design/write/post', { state: { selectedComponent: component } })}
    />
  );
}
