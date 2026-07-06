import { useMainViewStyleStore } from "@/stores/mainViewStyleStore"
import { MessageCirclePlusIcon, Search, Settings } from 'lucide-react'

export default function HeaderPreview() {
  const header = useMainViewStyleStore(
    (state) => state.headerStyle
  )

  const primary = useMainViewStyleStore(
    (state) => state.primary
  )

  return (
    <header className="flex gap-2 items-center p-4 pb-1 rounded-t-2xl"
      style={{
        color: header.textColor,
        backgroundColor: primary.backgroundColor
      }}>
      <span className='text-lg font-semibold'>채팅</span>
      <div className="ml-auto flex gap-3">
        <Search size={16} />
        <MessageCirclePlusIcon size={16} />
        <Settings size={16} />
      </div>
    </header>
  )
}
