import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schemaRegisterUser = z.object({
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
type RegisterUser = z.infer<typeof schemaRegisterUser>;

export type RegisterFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ className }: RegisterFormProps) => {
	const form = useForm<RegisterUser>({
		resolver: zodResolver(schemaRegisterUser),
		defaultValues: {
			email: "",
			password: "",
			fname: "",
			lname: "",
		},
		mode: "onChange",
	});

	const onSubmit = (values: RegisterUser) => {
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
							<FormLabel>Password</FormLabel>
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
				<FormField
					control={form.control}
					name="fname"
					render={({ field }) => (
						<FormItem className="group relative">
							<FormLabel className="sr-only absolute transition-all group-focus-within:not-sr-only">
								First name
							</FormLabel>
							<FormControl>
								<Input placeholder="First name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lname"
					render={({ field }) => (
						<FormItem className="group relative">
							<FormLabel className="sr-only absolute transition-all group-focus-within:not-sr-only">
								Last name
							</FormLabel>
							<FormControl>
								<Input placeholder="Last name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
};
