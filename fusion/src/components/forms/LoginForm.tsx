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
import { schemaLoginUser } from "@/model/formSchemas/SchemaUserAuthenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";

export type LoginUser = z.infer<typeof schemaLoginUser>;

export interface LoginFormProps
	extends React.FormHTMLAttributes<HTMLFormElement> {
	onLoginSubmit: (values: LoginUser) => Promise<void>;
}

export const LoginForm = ({ onLoginSubmit, className }: LoginFormProps) => {
	const form = useForm<LoginUser>({
		resolver: zodResolver(schemaLoginUser),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onLoginSubmit)}
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
				<Button type="submit">Login</Button>
			</form>
		</Form>
	);
};
