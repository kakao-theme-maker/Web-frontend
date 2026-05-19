import { DEFAULT_IMAGES } from '@/constants/defaultImages'

export default function NavPreview() {
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="relative w-full">
        <img
          src={DEFAULT_IMAGES.maintabBg}
          className="w-full"
        />

        <nav className="absolute inset-0 grid grid-cols-5 justify-items-center items-center text-center text-gray-900">
          <img
            src={DEFAULT_IMAGES.maintabIcoFriends} className="w-7" />
          <img
            src={DEFAULT_IMAGES.maintabIcoChats} className="w-7" />
          <img
            src={DEFAULT_IMAGES.maintabIcoNow} className="w-7" />
          <img
            src={DEFAULT_IMAGES.maintabIcoShopping} className="w-7" />
          <img
            src={DEFAULT_IMAGES.maintabIcoMore} className="w-7" />
        </nav>
      </div>
    </div>
  )
}