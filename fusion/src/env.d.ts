/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_DATABASE_URL: string;
	readonly VITE_DIRECT_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
