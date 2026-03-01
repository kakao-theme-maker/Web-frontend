const postPlaceholders = Array.from({ length: 12 })

export default function Community() {
  return (
    <>
        <div className="sticky top-[63px] z-10 grid grid-cols-2 text-center text-[14px] font-bold bg-white">
          <button className="border-b-2 border-primary py-2 text-primary">활동</button>
          <button className="border-b-2 border-secondary-300 py-2 text-secondary-300">키워드</button>
        </div>

        <main className="px-3 pb-24 pt-2">
          <div className="mb-3 flex h-7 items-center rounded-sm px-2 text-[10px] bg-secondary-100/30">
            <svg
              viewBox="0 0 24 24"
              className="mr-1.5 h-3.5 w-3.5 fill-none stroke-current stroke-2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            검색
          </div>

          <div className="grid grid-cols-2 gap-2">
            {postPlaceholders.map((_, index) => (
              <div key={index} className="h-[120px] rounded-[2px] bg-secondary-100" />
            ))}
          </div>
        </main>

        <button className="absolute bottom-16 right-4 flex h-9 items-center rounded-full bg-primary px-4 text-[11px] font-medium text-white shadow-sm">
          <span className="mr-1 text-base leading-none">+</span>
          글쓰기
        </button>
    </>
  )
}