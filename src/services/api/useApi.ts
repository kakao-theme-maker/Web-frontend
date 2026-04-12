import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
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
 * @param queryKey  - 캐시 키 배열. 값이 바뀌면 자동으로 재요청합니다.
 * @param urlOrFn   - API 경로 문자열 또는 Service에서 정의한 queryFn (권장)
 * @param options   - params(쿼리스트링), enabled(조건부 실행) 등 추가 옵션
 *
 * 사용 예시)
 *   useGetQuery(['posts'], () => PostService.getPosts());
 */
export function useGetQuery<TData>(
  queryKey: unknown[],
  urlOrFn: string | (() => Promise<TData>),
  options?: IUseGetQueryOptions<TData>,
) {
  const { params, axiosConfig, ...queryOptions } = options ?? {};

  return useQuery<TData, IApiError>({
    queryKey,
    queryFn:
      typeof urlOrFn === 'function'
        ? urlOrFn
        : async () => {
            const { data } = await apiClient.get<TData>(urlOrFn, {
              params,
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
 * Service 함수를 첫 번째 인자로 전달하는 방식 (권장):
 *   const { mutate } = usePostMutation(
 *     (vars: ILoginFormData) => AuthService.login(vars.email, vars.password),
 *     { onSuccess: () => navigate('/') }
 *   );
 *   mutate({ email, password });
 */
export function usePostMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, IApiError, TVariables>, 'mutationFn'>,
): UseMutationResult<TData, IApiError, TVariables>;
export function usePostMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
): UseMutationResult<TData, IApiError, IMutationVariables<TBody>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePostMutation(fnOrOptions?: unknown, extraOptions?: unknown): any {
  const isFn = typeof fnOrOptions === 'function';
  const mutationFn = isFn
    ? (fnOrOptions as (vars: unknown) => Promise<unknown>)
    : (async ({ url, body, params, axiosConfig }: IMutationVariables) => {
        const { data } = await apiClient.post(url, body, { params, ...axiosConfig });
        return data;
      }) as (vars: unknown) => Promise<unknown>;
  const options = isFn
    ? (extraOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined)
    : (fnOrOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined);
  return useMutation({ mutationFn, ...options });
}

/**
 * PUT 요청을 위한 훅
 *
 * 사용 예시)
 *   const { mutate } = usePutMutation(
 *     (vars: IUpdatePostBody) => PostService.updatePost(vars),
 *   );
 */
export function usePutMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, IApiError, TVariables>, 'mutationFn'>,
): UseMutationResult<TData, IApiError, TVariables>;
export function usePutMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
): UseMutationResult<TData, IApiError, IMutationVariables<TBody>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePutMutation(fnOrOptions?: unknown, extraOptions?: unknown): any {
  const isFn = typeof fnOrOptions === 'function';
  const mutationFn = isFn
    ? (fnOrOptions as (vars: unknown) => Promise<unknown>)
    : (async ({ url, body, params, axiosConfig }: IMutationVariables) => {
        const { data } = await apiClient.put(url, body, { params, ...axiosConfig });
        return data;
      }) as (vars: unknown) => Promise<unknown>;
  const options = isFn
    ? (extraOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined)
    : (fnOrOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined);
  return useMutation({ mutationFn, ...options });
}

/**
 * PATCH 요청을 위한 훅
 *
 * 사용 예시)
 *   const { mutate } = usePatchMutation(
 *     (vars: IPartialUpdateBody) => PostService.patchPost(vars),
 *   );
 */
export function usePatchMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, IApiError, TVariables>, 'mutationFn'>,
): UseMutationResult<TData, IApiError, TVariables>;
export function usePatchMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
): UseMutationResult<TData, IApiError, IMutationVariables<TBody>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function usePatchMutation(fnOrOptions?: unknown, extraOptions?: unknown): any {
  const isFn = typeof fnOrOptions === 'function';
  const mutationFn = isFn
    ? (fnOrOptions as (vars: unknown) => Promise<unknown>)
    : (async ({ url, body, params, axiosConfig }: IMutationVariables) => {
        const { data } = await apiClient.patch(url, body, { params, ...axiosConfig });
        return data;
      }) as (vars: unknown) => Promise<unknown>;
  const options = isFn
    ? (extraOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined)
    : (fnOrOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined);
  return useMutation({ mutationFn, ...options });
}

/**
 * DELETE 요청을 위한 훅
 *
 * 사용 예시)
 *   const { mutate: deletePost } = useDeleteMutation(
 *     (postId: number) => PostService.deletePost(postId),
 *   );
 */
export function useDeleteMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, IApiError, TVariables>, 'mutationFn'>,
): UseMutationResult<TData, IApiError, TVariables>;
export function useDeleteMutation<TData, TBody = unknown>(
  options?: IUseMutationOptions<TData, TBody>,
): UseMutationResult<TData, IApiError, IMutationVariables<TBody>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDeleteMutation(fnOrOptions?: unknown, extraOptions?: unknown): any {
  const isFn = typeof fnOrOptions === 'function';
  const mutationFn = isFn
    ? (fnOrOptions as (vars: unknown) => Promise<unknown>)
    : (async ({ url, body, params, axiosConfig }: IMutationVariables) => {
        const { data } = await apiClient.delete(url, {
          data: body,
          params,
          ...axiosConfig,
        });
        return data;
      }) as (vars: unknown) => Promise<unknown>;
  const options = isFn
    ? (extraOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined)
    : (fnOrOptions as UseMutationOptions<unknown, IApiError, unknown> | undefined);
  return useMutation({ mutationFn, ...options });
}
