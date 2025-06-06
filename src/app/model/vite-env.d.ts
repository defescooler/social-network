/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_APP_TITLE: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }