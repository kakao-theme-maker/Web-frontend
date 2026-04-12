import { useState, useRef } from "react";

interface IImageSliderProps {
  images: string[];
  alt?: string;
  className?: string;
}

const MAX_DOTS = 5;
const SWIPE_THRESHOLD = 50;

export default function ImageSlider({ images, alt = "미리보기", className = "" }: IImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const total = images.length;
  const visibleCount = Math.min(MAX_DOTS, total);
  const startIndex = Math.min(
    Math.max(currentIndex - Math.floor(MAX_DOTS / 2), 0),
    Math.max(total - MAX_DOTS, 0),
  );

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (delta > SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, total - 1));
    } else if (delta < -SWIPE_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div
      className={`relative h-[330px] w-full overflow-hidden rounded-[2px] bg-secondary-200 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {total > 0 && (
        <div
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`${alt} ${i + 1}`}
              className="h-full w-full shrink-0 object-cover"
            />
          ))}
        </div>
      )}

      {total > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-1">
          {Array.from({ length: visibleCount }, (_, i) => {
            const dotIndex = startIndex + i;
            const isActive = dotIndex === currentIndex;
            return (
              <span
                key={dotIndex}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${isActive ? "bg-black" : "bg-white"}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
