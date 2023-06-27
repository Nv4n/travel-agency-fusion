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

type LoginUser = z.infer<typeof schemaLoginUser>;

export type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ className }: LoginFormProps) => {
	const form = useForm<LoginUser>({
		resolver: zodResolver(schemaLoginUser),
		defaultValues: {
			email: "",
			password: "",
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
