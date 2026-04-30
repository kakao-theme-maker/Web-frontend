export const QUERY_KEYS = {
  comments: (boardId: number) => ['comments', boardId] as const,
  designBoardDetails: (pinnedPostId?: number) =>
    pinnedPostId === undefined
      ? (['design-board-details'] as const)
      : (['design-board-details', pinnedPostId] as const),
  designBoards: () => ['design-boards'] as const,
  homeThemes: (type: string) => ['home-themes', type] as const,
  myBookmarkedPosts: () => ['my-bookmarked-posts'] as const,
  myCustomComponents: () => ['my-custom-components'] as const,
  myUploadPosts: () => ['my-upload-posts'] as const,
  themeBoardDetails: (pinnedPostId?: number) =>
    pinnedPostId === undefined
      ? (['theme-board-details'] as const)
      : (['theme-board-details', pinnedPostId] as const),
  themeBoards: () => ['theme-boards'] as const,
  userDesignComponents: (userEmail: string | null | undefined) =>
    ['user-design-components', userEmail] as const,
  userProfile: () => ['userProfile'] as const,
  userThemes: (userEmail: string | null | undefined) => ['user-themes', userEmail] as const,
};
