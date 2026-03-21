import type { AxiosRequestConfig } from 'axios';
import type {
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';

/**
 * API 응답의 공통 형태를 정의하는 인터페이스
 *
 * 제네릭 <T>를 사용해 data의 타입을 호출하는 쪽에서 지정할 수 있습니다.
 * 예) IApiResponse<IPost[]> → data가 IPost 배열임을 명시
 */
export interface IApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API 요청 실패 시 에러 형태를 정의하는 인터페이스
 *
 * apiClient의 response 인터셉터에서 에러를 이 형태로 변환해 던집니다.
 * errors는 폼 유효성 검사 등 필드별 에러 메시지를 담을 때 사용합니다.
 * 예) { title: ['제목은 필수입니다'] }
 */
export interface IApiError {
  status: number;   // HTTP 상태 코드 (404, 500 등)
  message: string;  // 에러 메시지
  errors?: Record<string, string[]>; // 필드별 에러 목록 (선택)
}

/**
 * useGetQuery 훅에 전달할 수 있는 옵션 타입
 *
 * TanStack Query의 UseQueryOptions를 기반으로 하되,
 * queryKey와 queryFn은 훅 내부에서 자동으로 설정하므로 제외(Omit)합니다.
 * 추가로 URL 쿼리 파라미터(params)와 axios 설정(axiosConfig)을 받습니다.
 *
 * 예) { params: { page: 1 }, enabled: isLoggedIn }
 */
export interface IUseGetQueryOptions<TData>
  extends Omit<
    UseQueryOptions<TData, IApiError>,
    'queryKey' | 'queryFn'
  > {
  params?: Record<string, unknown>;    // URL 쿼리 파라미터 (?key=value)
  axiosConfig?: AxiosRequestConfig;    // axios 요청 추가 설정
}

/**
 * POST / PUT / PATCH / DELETE mutate 호출 시 전달하는 변수 타입
 *
 * mutate({ url, body, params }) 형태로 사용합니다.
 * 제네릭 <TBody>로 요청 body의 타입을 지정할 수 있습니다.
 */
export interface IMutationVariables<TBody = unknown> {
  url: string;                         // 요청을 보낼 엔드포인트 경로
  body?: TBody;                        // 요청 body (POST/PUT/PATCH/DELETE에서 사용)
  params?: Record<string, unknown>;    // URL 쿼리 파라미터
  axiosConfig?: AxiosRequestConfig;    // axios 요청 추가 설정
}

/**
 * usePostMutation 등 Mutation 훅에 전달할 수 있는 옵션 타입
 *
 * TanStack Query의 UseMutationOptions를 기반으로 합니다.
 * onSuccess, onError 등의 콜백을 여기서 전달합니다.
 *
 * 제네릭:
 *   TData  - 서버 응답 데이터 타입
 *   TBody  - 요청 body 타입 (기본값 unknown)
 */
export type IUseMutationOptions<TData, TBody = unknown> = UseMutationOptions<
  TData,
  IApiError,
  IMutationVariables<TBody>
>;
