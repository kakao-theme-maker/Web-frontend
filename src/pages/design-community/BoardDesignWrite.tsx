import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDesignBoardWrite } from '../../services/hooks/design/useDesignBoardWrite';
import BoardWriteForm from '../../components/community/BoardWriteForm';
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
      preview={
        <div className="mb-5 flex flex-col items-center">
          <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-secondary-200">
            <img
              src={selectedComponent.image_url}
              alt={`디자인 ${selectedComponent.design_component_id}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-2 flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>
      }
    />
  );
}
