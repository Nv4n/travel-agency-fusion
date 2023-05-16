import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./FormInput";

const schema = z.object({
	email: z.string().email().nonempty(),
	password: z
		.string()
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&.?-]).{8,64}$/)
		.nonempty(),
});
export type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema) });
	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<>
			<form onSubmit={onSubmit}>
				<FormInput
					labelText="Email:"
					register={{ ...register("email") }}
					trigger={trigger("email")}
				></FormInput>
				<p>{errors.email?.message}</p>
				<FormInput
					labelText="Password:"
					register={{ ...register("password") }}
					trigger={trigger("password")}
				></FormInput>
				<p>{errors.password?.message}</p>
				<input type="submit" value="submit" />
			</form>
		</>
	);
};
