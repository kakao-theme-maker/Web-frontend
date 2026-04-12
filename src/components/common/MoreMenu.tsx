import { useState, useRef } from "react";
import Text from "./Text";
import { useOutsideClick } from "../../services/hooks/common/useOutsideClick";
import { cn } from "../../utils/cn";

export interface IMoreMenuItem {
  id: string;
  label: string;
  onClick: () => void;
}

interface IMoreMenuProps {
  items: IMoreMenuItem[];
}

export default function MoreMenu({ items }: IMoreMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClick(containerRef, () => setIsOpen(false));

  return (
    <div ref={containerRef} className="relative">
      <button
        className={cn("flex h-8 w-8 items-center justify-center rounded-full", isOpen && "bg-primary text-white")}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="더보기 메뉴"
      >
        <span className="text-3xl leading-none">⋮</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-20 w-[112px] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-md divide-y divide-secondary-100">
          {items.map((item) => (
            <button
              key={item.id}
              className="w-full px-3 py-1 text-center hover:bg-secondary-50"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              <Text variant="MEDIUM_12">{item.label}</Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
