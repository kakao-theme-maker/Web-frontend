import HeaderIcon from "../components/icons/header/header.png";

interface IMobileHeaderProps {
  title: string
}

export default function MobileHeader({ title }: IMobileHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-4 pt-10">
      <div className="flex items-center justify-center gap-3 text-[15px] font-semibold">
        <img src={HeaderIcon} alt="header" className="h-4 w-5" />
        <span>{title}</span>
      </div>
    </header>
  )
}
