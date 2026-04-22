import BoardDetailCard from '../community/BoardDetailCard';
import type { IMyUploadPost } from '../../types/mypage/types';

interface IMySavedCardProps {
  post: IMyUploadPost;
}

export default function MySavedCard({ post }: IMySavedCardProps) {
  const isTheme = post.postType === 'THEME_BOARD';

  return (
    <BoardDetailCard
      board={post}
      imageAlt={isTheme ? '테마 미리보기' : '디자인 미리보기'}
      preferQueryKey={['my-bookmarked-posts']}
      removeOnUnbookmark
    />
  );
}
