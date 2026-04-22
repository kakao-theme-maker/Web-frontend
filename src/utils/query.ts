export interface IInfiniteCache {
  pages: Record<string, unknown>[][];
  pageParams: unknown[];
}

export function isInfiniteCache(data: unknown): data is IInfiniteCache {
  return !!data && typeof data === 'object' && Array.isArray((data as IInfiniteCache).pages);
}

export function updateBoardInCache(
  data: unknown,
  boardId: number,
  updater: (item: Record<string, unknown>) => Record<string, unknown>,
): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.map((item) => ((item.boardId as number) === boardId ? updater(item) : item)),
      ),
    };
  }
  const obj = data as Record<string, unknown>;
  if ((obj.boardId as number) === boardId) return updater(obj);
  return data;
}

export function removeBoardFromCache(data: unknown, boardId: number): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.filter((item) => (item.boardId as number) !== boardId),
      ),
    };
  }
  return data;
}
