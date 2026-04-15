import type { IThemeBoard } from "../../../types/community/theme";
import { Link } from "react-router-dom";

interface IThemeBoardGridItemProps {
  item: IThemeBoard;
}

export default function ThemeBoardGridItem({ item }: IThemeBoardGridItemProps) {
  return (
    <Link
      to={`/community/${item.boardId}`}
      className="block h-[120px] overflow-hidden rounded-[2px] bg-secondary-100"
      aria-label={`${item.title} 상세 페이지로 이동`}
    >
      {item.previewImageUrl ? (
        <img src={item.previewImageUrl} alt={item.title} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[12px] text-secondary-400">
          미리보기
        </div>
      )}
    </Link>
  );
}
