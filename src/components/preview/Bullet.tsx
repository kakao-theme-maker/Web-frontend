interface IBulletProps {
  filled?: boolean;
}

export default function Bullet({ filled = false }: IBulletProps) {
  return (
    <div className="flex items-center justify-center">
      <div className={`rounded-full bg-gray-400 ${filled ? "w-8 h-8" : "w-4 h-4"}`} />
    </div>
  )
}