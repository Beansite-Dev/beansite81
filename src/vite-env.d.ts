interface ViteTypeOptions {}
interface ImportMetaEnv {
  readonly VITE_APP_VERSION:string;
  readonly VITE_APP_BUILD_DATE:string;
  readonly VITE_HOMEPAGE_VERSION:string;
  readonly VITE_BEANPOWERED_VERSION:string;
  readonly VITE_BEANFORGED_VERSION:string;
  readonly VITE_BEANSHELL_VERSION:string;
  readonly VITE_EXPLORER_VERSION:string;
}
interface ImportMeta {readonly env: ImportMetaEnv}