import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "./FormInput";

const schema = z.object({
	email: z.string().email(),
	password: z
		.string()
		.regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&.?-]).{8,64}$/),
});
export type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm<FormData>({ resolver: zodResolver(schema), mode: "onTouched" });
	const onSubmit = handleSubmit((data) => console.log(data));

	return (
		<>
			<form onSubmit={onSubmit} noValidate>
				<FormInput
					labelText="Email:"
					register={register}
					trigger={trigger}
					field={"email"}
				></FormInput>
				<p>{errors.email?.message}</p>
				<FormInput
					labelText="Password:"
					register={register}
					trigger={trigger}
					field={"password"}
				></FormInput>
				<p>{errors.password?.message}</p>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};
