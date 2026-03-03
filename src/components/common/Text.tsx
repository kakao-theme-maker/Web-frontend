/**
 * Figma 기반으로 작성된 Text 컴포넌트
 * @param as 태그 이름
 * @param variant 텍스트 스타일
 * @param children 텍스트 내용
 * @param className 추가 클래스 이름
 */

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { TYPOGRAPHY, type TypographyVariant } from "../../constants/typography";
import { cn } from "../../utils/cn";

interface ITextOwnProps<T extends ElementType> {
  as?: T
  variant: TypographyVariant
  children: ReactNode
  className?: string
}

type ITextProps<T extends ElementType> = ITextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ITextOwnProps<T>>;

export default function Text<T extends ElementType = "span">({
  as,
  variant,
  children,
  className,
  ...props
}: ITextProps<T>) {
  const Component = as ?? "span";

  return (
    <Component className={cn(TYPOGRAPHY[variant], className)} {...props}>
      {children}
    </Component>
  );
}
