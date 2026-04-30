import Text from '../../common/Text';

interface IBoardDetailContentProps {
  userName: string;
  content: string;
}

export default function BoardDetailContent({ userName, content }: IBoardDetailContentProps) {
  return (
    <div className="mt-2">
      <Text variant="MEDIUM_14" className="mr-2 inline-block max-w-[40%] truncate align-bottom">
        {userName}
      </Text>
      <Text variant="REGULAR_14">{content}</Text>
    </div>
  );
}
