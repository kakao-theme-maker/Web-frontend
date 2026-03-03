import HeaderIcon from "../components/icons/header/header.png";
import Text from "../components/common/Text";

interface IMobileHeaderProps {
  title: string
}

export default function MobileHeader({ title }: IMobileHeaderProps) {
  return (
    <header className="shrink-0 bg-white px-4 pt-10">
      <div className="flex items-center justify-center gap-3">
        <img src={HeaderIcon} alt="header" className="h-4 w-5" />
        <Text variant="SEMIBOLD_15">{title}</Text>
      </div>
    </header>
  )
}
