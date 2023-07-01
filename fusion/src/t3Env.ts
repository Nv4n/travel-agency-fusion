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
		REFRESH_SECRET: z
			.string()
			.min(12)
			.max(64)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_\.-])[A-Za-z\d$@$!%*?&_\.-]{12,64}$/
			),
		ACCESS_SECRET: z
			.string()
			.min(12)
			.max(64)
			.regex(
				/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_\.-])[A-Za-z\d$@$!%*?&_\.-]{12,64}$/
			),
		DATABASE_URL: z.string().url(),
		DIRECT_URL: z.string().url(),
		JWT_COOKIE_NAME: z.string().nonempty(),
		NODE_ENV: z.enum(["development", "test", "production"]),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 */
	client: {},

	/**
	 * You can't destruct `process.env` as a regular object in the edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		REFRESH_SECRET: envProps.VITE_REFRESH_SECRET,
		ACCESS_SECRET: envProps.VITE_ACCESS_SECRET,
		DATABASE_URL: envProps.VITE_DATABASE_URL,
		DIRECT_URL: envProps.VITE_DIRECT_URL,
		JWT_COOKIE_NAME: envProps.VITE_JWT_COOKIE_NAME,
		NODE_ENV: process.env.NODE_ENV,
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
