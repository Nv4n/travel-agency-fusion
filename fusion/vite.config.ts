import react from "@vitejs/plugin-react";
import { resolve } from "path";
import {
	defineConfig,
	splitVendorChunkPlugin,
	type PreviewServerForHook,
	type ViteDevServer,
} from "vite";
import FullReload from "vite-plugin-full-reload";
import app from "./src/server/server";
import "./src/t3Env";

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
		FullReload(["src/**/*"], { delay: 2000 }),
		splitVendorChunkPlugin(),
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
