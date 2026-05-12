// svg 파일을 react 컴포넌트처럼 사용하기 위해 선언
// src/vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_LOCAL_LOGIN?: string;
}
