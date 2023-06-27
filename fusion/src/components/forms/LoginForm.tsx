import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schemaLoginUser = z.object({
	email: z.string().email({ message: "Invalid email" }).nonempty(),
	password: z.string().min(8).max(32).nonempty(),
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
});
type LoginUser = z.infer<typeof schemaLoginUser>;

export type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ className }: LoginFormProps) => {
	const form = useForm<LoginUser>({
		resolver: zodResolver(schemaLoginUser),
		defaultValues: {
			email: "",
			password: "",
			fname: "",
			lname: "",
		},
		mode: "onChange",
	});

	const onSubmit = (values: LoginUser) => {
		console.log(values);
	};
	return (
		<Form {...form}>
			<form className={"space-y-8 " + (className ? className : "")}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									type="email"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="Email"
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};
