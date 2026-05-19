interface ViteTypeOptions {}
interface ImportMetaEnv {
  readonly VITE_APP_VERSION:string;
  readonly VITE_APP_BUILD_DATE:string;
  readonly VITE_HOMEPAGE_VERSION:string;
}
interface ImportMeta {readonly env: ImportMetaEnv}