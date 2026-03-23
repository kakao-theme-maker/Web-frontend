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
  callbackRef.current = onIntersect;

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
