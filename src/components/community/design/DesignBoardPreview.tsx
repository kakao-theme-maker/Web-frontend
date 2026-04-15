import type { IUserDesignComponentRaw } from '../../../types/community/design';

interface IDesignBoardPreviewProps {
  selectedComponent: IUserDesignComponentRaw;
}

export default function DesignBoardPreview({ selectedComponent }: IDesignBoardPreviewProps) {
  return (
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
  );
}
