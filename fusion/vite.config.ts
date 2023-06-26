import react from "@vitejs/plugin-react";
import { resolve } from "path";
import {
	defineConfig,
	type PreviewServerForHook,
	type ViteDevServer,
} from "vite";
import app from "./src/server/server";
import "./src/t3Env";
import FullReload from "vite-plugin-full-reload";

const expressDevServerPlugin = (path: string, expressApp: typeof app) => ({
	name: "configure-server",
	configureServer(server: ViteDevServer) {
		server.middlewares.use(path, expressApp);
	},
});

const expressPreviewServerPlugin = (path: string, expressApp: typeof app) => ({
	name: "configure-preview-server",
	configurePreviewServer(server: PreviewServerForHook) {
		server.middlewares.use(path, expressApp);
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		expressPreviewServerPlugin("/", app),
		expressDevServerPlugin("/", app),
		react(),
		FullReload(["src/**/*"], { delay: 1000 }),
	],
	server: {
		watch: {
			usePolling: true,
		},
		host: true,
		hmr: {
			port: 443,
			timeout: 2000,
		},
	},
	resolve: {
		alias: {
			"@/": `${resolve(__dirname, "src")}/`,
		},
	},
});
