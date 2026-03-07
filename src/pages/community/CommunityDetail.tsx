import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Text from "../../components/common/Text";
import { useOutsideClick } from "../../services/hooks/useOutsideClick";

export default function CommunityDetail() {
  const { boardId } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // 메뉴 감싸는 컨테이너를 가리키는 ref
  const menuRef = useRef<HTMLButtonElement | null>(null);
  // 커스텀 훅(useOutsideClick) 호출: 외부 클릭 시 콜백함수 실행
  useOutsideClick(menuRef, () => setIsMenuOpen(false));

  return (
    <main className="px-5 pt-8">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-full bg-secondary-300" />
          <div className="flex flex-col">
            <Text variant="BOLD_15">강은성</Text>
            <Text variant="REGULAR_10" className="text-secondary-400">
              3월 25일
            </Text>
          </div>
        </div>

        <div className="relative flex items-center gap-2">
          <button className="rounded-[5px] bg-primary px-4 py-1 text-white">
            <Text variant="MEDIUM_12">팔로우</Text>
          </button> 
          <button
            ref={menuRef}
            className="flex h-8 w-8 items-center justify-center rounded-full"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="더보기 메뉴"
          >
            <span className="text-2xl leading-none">⋮</span>
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-10 z-20 w-[112px] overflow-hidden rounded-md border border-secondary-200 bg-white shadow-md">
              <button className="w-full px-3 py-2 text-left hover:bg-secondary-50">
                <Text variant="MEDIUM_12">테마 다운로드</Text>
              </button>
              <button className="w-full border-t border-secondary-100 px-3 py-2 text-left hover:bg-secondary-50">
                <Text variant="MEDIUM_12">공유하기</Text>
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="mt-3">
        <div className="h-[330px] w-full rounded-[2px] bg-secondary-200" />
        <div className="mt-3 flex items-center justify-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="h-1.5 w-1.5 rounded-full bg-secondary-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-secondary-300" />
        </div>
      </section>

      <section className="mt-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-1.5">
              <span className="text-[18px] leading-none text-red-500">❤</span>
              <Text variant="REGULAR_15">110</Text>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] leading-none">💬</span>
              <Text variant="REGULAR_15">190</Text>
            </div>
          </div>
          <span className="text-[18px] leading-none text-primary">🔖</span>
        </div>

        <div className="mt-2">
          <Text variant="MEDIUM_14" className="mr-2">
            강은성
          </Text>
          <Text variant="REGULAR_14">좋아요 댓글 후 저장해주세요 ^^ #{boardId}</Text>
        </div>
        <Text variant="REGULAR_14" className="mt-1 text-secondary-400">
          4일 전
        </Text>
      </section>
    </main>
  );
}
