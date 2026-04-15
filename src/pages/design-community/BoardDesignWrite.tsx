import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDesignBoardWrite } from '../../services/hooks/design/useDesignBoardWrite';
import BoardWriteForm from '../../components/community/BoardWriteForm';
import DesignBoardPreview from '../../components/community/design/DesignBoardPreview';
import type { IUserDesignComponentRaw } from '../../types/community/design';

interface IBoardDesignWriteLocationState {
  selectedComponent: IUserDesignComponentRaw;
}

export default function BoardDesignWrite() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as IBoardDesignWriteLocationState | null;

  useEffect(() => {
    if (!state?.selectedComponent) {
      navigate('/design/write', { replace: true });
    }
  }, [state, navigate]);

  const selectedComponent = state?.selectedComponent;
  const { handleSubmit, ...formProps } = useDesignBoardWrite(selectedComponent!);

  if (!selectedComponent) return null;

  return (
    <BoardWriteForm
      {...formProps}
      onSubmit={handleSubmit}
      preview={<DesignBoardPreview selectedComponent={selectedComponent} />}
    />
  );
}
