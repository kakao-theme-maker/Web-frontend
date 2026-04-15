import Text from '../common/Text';
import MyPageBoardCard from './MyPageBoardCard';
import type { IMyPageBoard } from '../../types/mypage/types';

const MOCK_BOARDS: IMyPageBoard[] = [
  { id: 1, author: '다현', date: '3월 25일' },
  { id: 2, author: '다현', date: '3월 20일' },
];

export default function ActivityTab() {
  if (MOCK_BOARDS.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Text variant="REGULAR_14" className="text-secondary-300">
          아직 활동이 없습니다.
        </Text>
      </div>
    );
  }

  return (
    <div>
      {MOCK_BOARDS.map((board) => (
        <MyPageBoardCard key={board.id} board={board} />
      ))}
    </div>
  );
}
