import { createEnv } from "@t3-oss/env-core";
import { ZodError, z } from "zod";

export const env = createEnv({
	clientPrefix: "VITE_",
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
	runtimeEnvStrict: {
		DATABASE_URL: process.env.DATABASE_URL,
		DIRECT_URL: process.env.DIRECT_URL,
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
	// Called when server variables are accessed on the client.
	onInvalidAccess: (variable: string) => {
		throw new Error(
			"❌ Attempted to access a server-side environment variable on the client"
		);
	},
});
