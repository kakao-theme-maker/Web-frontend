import Text from '../../common/Text';
import BookmarkIcon from '../../icons/community-detail/bookmark.svg?react';
import CommentIcon from '../../icons/community-detail/comment.svg?react';
import HeartIcon from '../../icons/community-detail/heart.svg?react';

interface IBoardDetailActionsProps {
  isPreferred: boolean;
  prefers: number;
  isPreferDisabled: boolean;
  onPrefer: () => void;
  comments: number;
  onOpenComments: () => void;
  isBookmarked: boolean;
  isBookmarkDisabled: boolean;
  onBookmark: () => void;
}

export default function BoardDetailActions({
  isPreferred,
  prefers,
  isPreferDisabled,
  onPrefer,
  comments,
  onOpenComments,
  isBookmarked,
  isBookmarkDisabled,
  onBookmark,
}: IBoardDetailActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5">
          <button onClick={onPrefer} disabled={isPreferDisabled} aria-label="좋아요">
            <HeartIcon
              width={24}
              height={24}
              className={isPreferred ? 'text-red-500' : 'text-secondary-300'}
            />
          </button>
          <Text variant="REGULAR_15">{prefers}</Text>
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={onOpenComments}>
            <CommentIcon width={24} height={24} aria-label="댓글" />
          </button>
          <Text variant="REGULAR_15">{comments}</Text>
        </div>
      </div>
      <button onClick={onBookmark} disabled={isBookmarkDisabled} aria-label="북마크">
        <BookmarkIcon
          width={12}
          height={17}
          className={isBookmarked ? 'text-primary' : 'text-secondary-300'}
        />
      </button>
    </div>
  );
}
