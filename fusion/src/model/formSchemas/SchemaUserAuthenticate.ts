import { z } from "zod";

export const schemaLoginUser = z.object({
	email: z.string().email({ message: "Invalid email" }).nonempty(),
	password: z
		.string()
		.min(8)
		.max(32)
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,32}$/
		)
		.nonempty(),
});

export const schemaRegisterUser = schemaLoginUser
	.extend({
		repassword: z.string().nonempty(),
		fname: z
			.string()
			.min(2)
			.max(50)
			.regex(/^[A-Za-z]{2,50}$/, "Use only letters")
			.nonempty(),
		lname: z
			.string()
			.min(2)
			.max(50)
			.regex(/^[A-Za-z]{2,50}$/, "Use only letters")
			.nonempty(),
	})
	.refine((data) => data.password === data.repassword, {
		message: "Re-password is not the same as Password",
		path: ["repassword"],
	});
