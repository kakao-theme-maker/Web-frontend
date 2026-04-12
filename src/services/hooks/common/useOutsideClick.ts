/**
 * useOutsideClick.ts: ref 요소를 기준으로 외부를 클릭하였을 경우 handler(콜백)함수가 실행되는 hook
 * 
 * RefObject란? useRef훅이 반환하는 객체의 인터페이스.
 * RefObject 내부 구조 => interface RefObject<T> { readonly current: T | null; }
 * current 속성이 readonly로 선언되었기에, 원칙적으로 RefObject는 current 수정이 불가능하다.
 */

import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * @param ref 외부 클릭을 감지할 기준 요소
 * @param handler 외부 클릭 시 실행할 콜백 함수
 */
export const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: () => void
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;

      // ref가 없거나 클릭된 요소(event.target)가 ref 요소 내부에 포함되어 있다면
      if(!el || el.contains(event.target as Node)) {
        return; // 함수 종료
      }

      // ref 요소 외부를 클릭했을 경우 핸들러 실행
      handler();
    }

    // 마우스 클릭 및 터치 이벤트 모두 대응
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    // 이벤트 해제
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}