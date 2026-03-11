import { CommunityPostGridItem, SearchBar } from "../../community";
import Text from "../../common/Text";
import type { ICommunityPostItem } from "../../../types/community/post";

const POST_PLACE_HOLDERS: ICommunityPostItem[] = Array.from({ length: 12 }, (_, index) => ({
  boardId: index + 1,
  themeComponentId: 1000 + index,
  title: `테마 미리보기 ${index + 1}`,
  previewImageUrl: "",
  userEmail: "test@theme.com",
  createdAt: "2026-03-04",
  prefers: 0,
}));

export default function ActivityTab() {
  return (
    <>
      <main className="px-3 pb-24 pt-2">
        <SearchBar />
        <section className="grid grid-cols-2 gap-2">
          {POST_PLACE_HOLDERS.map((item) => (
            <CommunityPostGridItem key={item.boardId} item={item} />
          ))}
        </section>
      </main>
      <button className="absolute bottom-16 right-4 flex h-9 items-center rounded-full bg-primary px-4 text-white shadow-sm">
        <span className="mr-1 text-base leading-none">+</span>
        <Text variant="REGULAR_14">글쓰기</Text>
      </button>
    </>
  );
}