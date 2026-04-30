import BoardDetailCard from '../community/BoardDetailCard';
import type { IMyUploadPost } from '../../types/mypage/types';
import { QUERY_KEYS } from '../../constants/queryKeys';

interface IMySavedCardProps {
  post: IMyUploadPost;
}

export default function MySavedCard({ post }: IMySavedCardProps) {
  const isTheme = post.postType === 'THEME_BOARD';

  return (
    <BoardDetailCard
      board={post}
      imageAlt={isTheme ? '테마 미리보기' : '디자인 미리보기'}
      preferQueryKey={QUERY_KEYS.myBookmarkedPosts()}
      hasUnbookmarkRemoval
      hasOwnBoardBookmarkPermission
    />
  );
}
