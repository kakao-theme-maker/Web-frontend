import CommunityPostGridItem from "../../components/community/CommunityPostGridItem";
import type { ICommunityPostItem } from "../../types/community/post";
import Text from "../../components/common/Text";

const postPlaceholders: ICommunityPostItem[] = Array.from({ length: 12 }, (_, index) => ({
  boardId: index + 1,
  themeComponentId: 1000 + index,
  title: `테마 미리보기 ${index + 1}`,
  previewImageUrl: "",
  userEmail: "test@theme.com",
  createdAt: "2026-03-04",
  prefers: 0,
}));

export default function Community() {
  return (
    <>
        <div className="sticky top-0 z-10 grid grid-cols-2 bg-white text-center text-[14px] font-bold">
          <button className="border-b-2 border-primary py-2 text-primary">
            <Text variant="BOLD_16">활동</Text>
          </button>
          <button className="border-b-2 border-secondary-300 py-2 text-secondary-300">
            <Text variant="BOLD_16">키워드</Text>
          </button>
        </div>

        <main className="px-3 pb-24 pt-2">
          <div className="mb-3 flex h-7 items-center rounded-sm bg-secondary-100/30 px-2">
            <svg
              viewBox="0 0 24 24"
              className="mr-1.5 h-3.5 w-3.5 fill-none stroke-current stroke-2"
              aria-hidden
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <Text variant="LIGHT_14">검색</Text>
          </div>

          <section className="grid grid-cols-2 gap-2">
            {postPlaceholders.map((item) => (
              <CommunityPostGridItem key={item.boardId} item={item} />
            ))}
          </section>
        </main>

        <button className="absolute bottom-16 right-4 flex h-9 items-center rounded-full bg-primary px-4 text-white shadow-sm">
          <span className="mr-1 text-base leading-none">+</span>
          <Text variant="REGULAR_14">글쓰기</Text>
        </button>
    </>
  )
}