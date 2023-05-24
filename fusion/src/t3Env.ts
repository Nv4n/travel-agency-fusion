import { createEnv } from "@t3-oss/env-core";
import { loadEnv } from "vite";
import { type ZodError, z } from "zod";

const mode = process.env.NODE_ENV || "development";
const envProps = loadEnv(mode, process.cwd());

export const t3Env = createEnv({
	// Tell the library when we're in a server context.
	isServer: typeof window === "undefined",

	clientPrefix: "VITE_",
	skipValidation: false,
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */

	server: {
		DATABASE_URL: z.string().url(),
		DIRECT_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "test", "production"]),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 */
	client: {
		// VITE_PUBLIC_CLIENTVAR: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		DATABASE_URL: envProps.VITE_DATABASE_URL,
		DIRECT_URL: envProps.VITE_DIRECT_URL,
		NODE_ENV: process.env.NODE_ENV,
		// VITE_PUBLIC_CLIENTVAR: process.env.VITE_PUBLIC_CLIENTVAR,
	},
	// Called when the schema validation fails.
	onValidationError: (error: ZodError) => {
		console.error(
			"❌ Invalid environment variables:",
			error.flatten().fieldErrors
		);
		throw new Error("Invalid environment variables");
	},
	// Called wshen server variables are accessed on the client.
	onInvalidAccess: (_variable: string) => {
		throw new Error(
			"❌ Attempted to access a server-side environment variable on the client"
		);
	},
});

console.log(t3Env);
