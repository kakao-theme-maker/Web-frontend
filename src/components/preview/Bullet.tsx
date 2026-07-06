interface IBulletProps {
  filled?: boolean;
  emptyImage?: string
  filledImage?: string
}

export default function Bullet({ filled = false, emptyImage, filledImage }: IBulletProps) {
  const image = filled ? filledImage : emptyImage

  return (
    <div className="flex w-8 h-8 items-center justify-center">
      <img
        src={image}
      />
    </div>
  )
}