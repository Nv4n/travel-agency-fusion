import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaRegisterUser } from "@/model/formSchemas/SchemaUserAuthenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";

export type RegisterUser = z.infer<typeof schemaRegisterUser>;

export interface RegisterFormProps
	extends React.FormHTMLAttributes<HTMLFormElement> {
	onRegisterSubmit: (values: RegisterUser) => Promise<void>;
}

export const RegisterForm = ({
	onRegisterSubmit,
	className,
}: RegisterFormProps) => {
	const form = useForm<RegisterUser>({
		resolver: zodResolver(schemaRegisterUser),
		defaultValues: {
			email: "",
			password: "",
			repassword: "",
			fname: "",
			lname: "",
		},
		mode: "onChange",
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onRegisterSubmit)}
				className={"space-y-8 " + (className ? className : "")}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem className="group relative space-y-1">
							<FormLabel className={peekLabelStyles}>
								Email
							</FormLabel>
							<FormControl>
								<Input
									className={hidePlaceholderStyles}
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
						<FormItem className="group relative space-y-1">
							<FormLabel className={peekLabelStyles}>
								Password
							</FormLabel>
							<FormControl>
								<Input
									className={hidePlaceholderStyles}
									placeholder="Password"
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
					name="repassword"
					render={({ field }) => (
						<FormItem className="group relative space-y-1">
							<FormLabel className={peekLabelStyles}>
								Re-Password
							</FormLabel>
							<FormControl>
								<Input
									className={hidePlaceholderStyles}
									placeholder="Re-Password"
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
						<FormItem className="group relative space-y-1">
							<FormLabel className={peekLabelStyles}>
								First name
							</FormLabel>
							<FormControl>
								<Input
									className={hidePlaceholderStyles}
									placeholder="First name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="lname"
					render={({ field }) => (
						<FormItem className="group relative space-y-1">
							<FormLabel className={peekLabelStyles}>
								Last name
							</FormLabel>
							<FormControl>
								<Input
									className={hidePlaceholderStyles}
									placeholder="Last name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Register</Button>
			</form>
		</Form>
	);
};
