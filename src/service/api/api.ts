// import axios, { AxiosError } from "axios";
// import { useAuthStore } from "@/store/authStore";

// //useAuthStore 에 구현되어야할 것들 userId / accesstoken / refreshtoken / setAuthData / clearAuth

// export const IPADDR = "https://example_1234";

// export const instance = axios.create({
//   baseURL: IPADDR,
// });

// export const authInstance = axios.create({
//   baseURL: IPADDR,
// });

// //요청 인터셉터
// authInstance.interceptors.request.use(
//   (config) => {
//     const { accessToken } = useAuthStore.getState();

//     if (accessToken) {
//       config.headers = config.headers ?? {};
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// //응답 인터셉터
// authInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401(=토큰완료)
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { refreshToken, setAuthData } = useAuthStore.getState();

//         // refreshToken 없으면 바로 에러 처리
//         if (!refreshToken) {
//           return Promise.reject(error);
//         }

//         // refresh token 으로 access token 재발급 요청
//         const res = await axios.post(`${IPADDR}/refresh-token`, {
//           refreshToken,
//         });

//         const { accessToken, refreshToken: newRefreshToken } = res.data;

//         // setAuthData spread 기반이라는 전제 → 토큰만 부분 업데이트
//         setAuthData({
//           accessToken,
//           refreshToken: newRefreshToken,
//         });

//         originalRequest.headers = originalRequest.headers ?? {};
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;

//         return authInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("토큰 갱신 실패", refreshError);

//         // refreshToken 도 만료/무효 → 더 이상 복구 불가 → 강제 로그아웃
//         if ((refreshError as AxiosError)?.response?.status === 403) {
//           const { clearAuth } = useAuthStore.getState();
//           clearAuth();
//           window.location.href = "/login";
//         }

//         // refresh 에러
//         return Promise.reject(refreshError);
//       }
//     }

//     // 401또는 그외 에러
//     return Promise.reject(error);
//   }
// );
