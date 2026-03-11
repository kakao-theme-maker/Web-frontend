import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';
import type {
  IApiError,
  IUseGetQueryOptions,
  IMutationVariables,
  IUseMutationOptions,
} from './types';

/**
 * GET 요청을 위한 훅
 *
 * TanStack Query의 useQuery를 래핑합니다.
 * useQuery는 컴포넌트가 마운트될 때 자동으로 요청을 보내고,
 * 같은 queryKey라면 캐시된 데이터를 재사용합니다.
 *
 * @param queryKey - 캐시 키 배열. 값이 바뀌면 자동으로 재요청합니다.
 *                   예) ['posts', page] → page가 바뀌면 새로 fetch
 * @param url      - 요청할 API 경로 (baseURL 이후 경로)
 * @param options  - params(쿼리스트링), enabled(조건부 실행) 등 추가 옵션
 *
 * 사용 예시)
 *   const { data, isLoading } = useGetQuery<IPost[]>(
 *     ['posts', page],
 *     '/api/posts',
 *     { params: { page, size: 10 } }
 *   );
 */
export function useGetQuery<TData>(
  queryKey: unknown[],
  url: string,
  options?: IUseGetQueryOptions<TData>,
) {
  // options에서 axios 전용 속성을 분리하고, 나머지는 useQuery 옵션으로 전달합니다.
  const { params, axiosConfig, ...queryOptions } = options ?? {};

  return useQuery<TData, IApiError>({
    queryKey,
    queryFn: async () => {
      const { data } = await apiClient.get<TData>(url, {
        params,       // ?key=value 형태의 URL 파라미터
        ...axiosConfig,
      });
      return data;
    },
    ...queryOptions,
  });
}

/**
 * POST 요청을 위한 훅
 *
 * TanStack Query의 useMutation을 래핑합니다.
 * useMutation은 useQuery와 달리 자동 실행되지 않으며,
 * 반환된 mutate() 함수를 직접 호출해야 요청이 발생합니다.
 * 새 리소스를 생성(Create)할 때 사용합니다.
 *
 * @param options - onSuccess, onError 등의 콜백을 전달할 수 있습니다.
 *
 * 사용 예시)
 *   const { mutate } = usePostMutation<IPost, ICreatePostBody>({
 *     onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
 *   });
 *   mutate({ url: '/api/posts', body: { title: '제목', content: '내용' } });
 */
export function usePostMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
) {
  return useMutation<TData, IApiError, IMutationVariables<TBody>>({
    mutationFn: async ({ url, body, params, axiosConfig }) => {
      const { data } = await apiClient.post<TData>(url, body, {
        params,
        ...axiosConfig,
      });
      return data;
    },
    ...options,
  });
}

/**
 * PUT 요청을 위한 훅
 *
 * 리소스 전체를 교체(Replace)할 때 사용합니다.
 * body에 변경할 리소스의 모든 필드를 포함해야 합니다.
 *
 * 사용 예시)
 *   const { mutate } = usePutMutation<IPost, IUpdatePostBody>();
 *   mutate({ url: `/api/posts/${id}`, body: { title: '새 제목', content: '새 내용' } });
 */
export function usePutMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
) {
  return useMutation<TData, IApiError, IMutationVariables<TBody>>({
    mutationFn: async ({ url, body, params, axiosConfig }) => {
      const { data } = await apiClient.put<TData>(url, body, {
        params,
        ...axiosConfig,
      });
      return data;
    },
    ...options,
  });
}

/**
 * PATCH 요청을 위한 훅
 *
 * 리소스의 일부 필드만 수정(Partial Update)할 때 사용합니다.
 * PUT과 달리 변경할 필드만 body에 포함하면 됩니다.
 *
 * 사용 예시)
 *   const { mutate } = usePatchMutation<IPost, Partial<IUpdatePostBody>>();
 *   mutate({ url: `/api/posts/${id}`, body: { title: '제목만 수정' } });
 */
export function usePatchMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
) {
  return useMutation<TData, IApiError, IMutationVariables<TBody>>({
    mutationFn: async ({ url, body, params, axiosConfig }) => {
      const { data } = await apiClient.patch<TData>(url, body, {
        params,
        ...axiosConfig,
      });
      return data;
    },
    ...options,
  });
}

/**
 * DELETE 요청을 위한 훅
 *
 * 리소스를 삭제할 때 사용합니다.
 * DELETE는 body가 없는 경우가 많지만, 일부 API는 body를 요구하기도 합니다.
 * axios DELETE는 body를 data 키에 담아야 하므로 내부에서 자동으로 처리합니다.
 *
 * 사용 예시)
 *   const { mutate: deletePost } = useDeleteMutation<void>();
 *   deletePost({ url: `/api/posts/${id}` });
 */
export function useDeleteMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
) {
  return useMutation<TData, IApiError, IMutationVariables<TBody>>({
    mutationFn: async ({ url, body, params, axiosConfig }) => {
      const { data } = await apiClient.delete<TData>(url, {
        // axios DELETE는 body를 config.data에 넣어야 서버로 전달됩니다.
        data: body,
        params,
        ...axiosConfig,
      });
      return data;
    },
    ...options,
  });
}
