import Text from '../../components/common/Text';

export default function Notification() {
  return (
    <main className="flex min-h-[360px] items-center justify-center px-4">
      <Text variant="REGULAR_15" className="text-secondary-500">
        아직 알림이 없습니다.
      </Text>
    </main>
  );
}
