import { cn } from '../../utils/cn';
import Text from '../common/Text';
import type { IUserDesignComponentRaw } from '../../types/community/design';

interface IDesignSelectItemProps {
  component: IUserDesignComponentRaw;
  isSelected: boolean;
  onSelect: (designComponentId: number) => void;
}

export default function DesignSelectItem({ component, isSelected, onSelect }: IDesignSelectItemProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(component.design_component_id)}
      className={cn(
        'flex w-full items-center justify-between rounded-xl border px-4 py-3 transition-colors',
        isSelected
          ? 'border-primary bg-primary text-white'
          : 'border-secondary-200 bg-white text-black',
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2',
            isSelected ? 'border-white bg-white' : 'border-secondary-300 bg-white',
          )}
        >
          {isSelected && (
            <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none">
              <path
                d="M1 5l3.5 3.5L11 1"
                stroke="#4F46E5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <Text
          variant="SEMIBOLD_14"
          className={isSelected ? 'text-white' : 'text-black'}
        >
          디자인 #{component.design_component_id}
        </Text>
      </div>

      <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={component.image_url}
          alt={`디자인 ${component.design_component_id}`}
          className="h-full w-full object-cover"
        />
      </div>
    </button>
  );
}
