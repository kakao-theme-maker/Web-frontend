import HeaderIcon from "../components/icons/header/header.svg?react";
import Text from "../components/common/Text";

interface IMobileHeaderProps {
  title: string
}

export default function MobileHeader({ title }: IMobileHeaderProps) {
  return (
    <header className="shrink-0 bg-white px-4 pt-10">
      <div className="flex items-center justify-center gap-3">
        <HeaderIcon className="h-5 w-6" />
        <Text variant="SEMIBOLD_15">{title}</Text>
      </div>
    </header>
  )
}
