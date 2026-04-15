import Text from '../common/Text';
import MoreMenu from '../common/MoreMenu';
import type { IMyPageBoard } from '../../types/mypage/types';

interface IMyPageBoardCardProps {
  board: IMyPageBoard;
}

export default function MyPageBoardCard({ board }: IMyPageBoardCardProps) {
  const moreMenuItems = [
    { id: 'edit', label: '수정하기', onClick: () => {} },
    { id: 'delete', label: '삭제하기', onClick: () => {} },
    { id: 'comment-restrict', label: '댓글 제한', onClick: () => {} },
  ];

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-secondary-300" />
          <div className="flex flex-col">
            <Text variant="BOLD_15">{board.author}</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">
              {board.date}
            </Text>
          </div>
        </div>
        <MoreMenu items={moreMenuItems} />
      </div>
      <div className="mt-3 h-[180px] w-full rounded-md bg-secondary-200" />
    </div>
  );
}
