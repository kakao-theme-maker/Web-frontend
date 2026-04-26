export interface IInfiniteCache {
  pages: Record<string, unknown>[][];
  pageParams: unknown[];
}

export function isInfiniteCache(data: unknown): data is IInfiniteCache {
  return !!data && typeof data === 'object' && Array.isArray((data as IInfiniteCache).pages);
}

function getBoardId(item: Record<string, unknown>): number | undefined {
  const id = item.boardId ?? item.postId;
  return typeof id === 'number' ? id : undefined;
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
        page.map((item) => (getBoardId(item) === boardId ? updater(item) : item)),
      ),
    };
  }
  const obj = data as Record<string, unknown>;
  if (getBoardId(obj) === boardId) return updater(obj);
  return data;
}

export function removeBoardFromCache(data: unknown, boardId: number): unknown {
  if (!data) return data;
  if (isInfiniteCache(data)) {
    return {
      ...data,
      pages: data.pages.map((page) =>
        page.filter((item) => getBoardId(item) !== boardId),
      ),
    };
  }
  return data;
}
