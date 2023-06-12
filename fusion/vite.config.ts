import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import app from "./src/server/server";
import { type Express } from "express-serve-static-core";
import "./src/t3Env";
import { resolve } from "path";

const expressServerPlugin = (path: string, expressApp: typeof app) => ({
	name: "configure-server",
	configureServer(server: {
		middlewares: { use: (arg0: string, arg1: Express) => void };
	}) {
		server.middlewares.use(path, expressApp);
	},
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [expressServerPlugin("/", app), react()],
	server: {
		hmr: {
			port: 443,
		},
	},
	resolve: {
		alias: {
			"@/": `${resolve(__dirname, "src")}/`,
		},
	},
});
