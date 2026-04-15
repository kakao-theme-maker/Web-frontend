import { useEffect, useRef } from 'react';

/**
 * Intersection Observer를 이용한 요소 가시성 감지 훅
 *
 * 반환된 ref를 sentinel 요소(감지 대상)에 연결하면,
 * 해당 요소가 뷰포트에 진입할 때마다 onIntersect 콜백이 호출됩니다.
 *
 * 사용 예시)
 *   const sentinelRef = useIntersectionObserver(() => fetchNextPage());
 *   <div ref={sentinelRef} />
 */
export function useIntersectionObserver(onIntersect: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  const callbackRef = useRef(onIntersect);

  // 렌더링 중 ref.current를 직접 수정하면 React 동시성 렌더링에서
  // 렌더가 중단·재시도될 때 콜백이 불완전한 상태로 적용될 수 있습니다.
  // useEffect는 렌더가 커밋된 후 실행되므로 안전하게 최신 콜백을 유지합니다.
  // (의존성 배열 생략 → 매 렌더마다 실행하여 항상 최신 콜백으로 동기화)
  useEffect(() => {
    callbackRef.current = onIntersect;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) callbackRef.current();
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
