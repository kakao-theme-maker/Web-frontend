import type { RefObject } from 'react';
import type { IMoreMenuItem } from '../../../types/community/common';
import { cn } from '../../../utils/cn';
import { formatDate } from '../../../utils/date';
import Text from '../../common/Text';
import MoreIcon from '../../icons/community-detail/more.svg?react';

interface IBoardDetailHeaderProps {
  profileImage?: string;
  userName: string;
  createdAt: string;
  isMyBoard: boolean;
  menuItems: IMoreMenuItem[];
  isMenuOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  onToggleMenu: () => void;
}

export default function BoardDetailHeader({
  profileImage,
  userName,
  createdAt,
  isMyBoard,
  menuItems,
  isMenuOpen,
  menuRef,
  onToggleMenu,
}: IBoardDetailHeaderProps) {
  const menuClass = cn(
    'flex h-8 w-8 items-center justify-center rounded-full',
    isMenuOpen && 'text-white bg-primary',
  );

  return (
    <section className="flex items-center justify-between px-5">
      <div className="flex min-w-0 max-w-[55%] items-center gap-2.5">
        {profileImage ? (
          <img
            src={profileImage}
            alt="프로필"
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 shrink-0 rounded-full bg-secondary-300" />
        )}
        <div className="flex min-w-0 flex-col">
          <Text variant="BOLD_15" className="truncate">
            {userName}
          </Text>
          <Text variant="REGULAR_10" className="text-secondary-400">
            {formatDate(createdAt)}
          </Text>
        </div>
      </div>

      <div className="relative flex items-center gap-2">
        {!isMyBoard && (
          <button className="rounded-[5px] bg-primary px-4 py-[3px] text-white">
            <Text variant="MEDIUM_12">팔로우</Text>
          </button>
        )}
        <div ref={menuRef} className="relative">
          <button className={menuClass} onClick={onToggleMenu} aria-label="더보기 메뉴">
            <MoreIcon width={24} height={24} />
          </button>
          {isMenuOpen && menuItems.length > 0 && (
            <div className="absolute right-0 top-10 z-20 w-[112px] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-md divide-y divide-secondary-100">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  className="w-full px-3 py-1 hover:bg-secondary-50 text-center"
                  onClick={item.onClick}
                >
                  <Text
                    variant="MEDIUM_12"
                    className={item.id === 'delete' ? 'text-red-500' : undefined}
                  >
                    {item.label}
                  </Text>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
