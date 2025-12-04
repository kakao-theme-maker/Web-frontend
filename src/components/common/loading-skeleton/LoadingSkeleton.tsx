import { Skeleton } from "../../ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="my-[6px] grid grid-cols-2 gap-[10px]">
      {Array.from({ length: 6 }, (_, i) => i + 1).map(
        (n: number, i: number) => (
          <Skeleton key={n} className={"aspect-[5/6]"} />
        )
      )}
    </div>
  );
};

export default LoadingSkeleton;
