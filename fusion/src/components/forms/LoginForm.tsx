import { VITE_JWT_SESSION_NAME } from "@/client/App";
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
import { UserNameContext } from "@/pages/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { FormErrorAlert } from "./FormErrorAlert";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";

export type LoginUser = z.infer<typeof schemaLoginUser>;

export type LoginFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const LoginForm = ({ className }: LoginFormProps) => {
	const [errorMsg, setErrorMsg] = useState("");
	const [_, setUserName] = useContext(UserNameContext);
	const navigate = useNavigate();
	const form = useForm<LoginUser>({
		resolver: zodResolver(schemaLoginUser),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const onLoginSubmit = async (values: LoginUser) => {
		const resp = await fetch("/api/users/login", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(values),
		});

		if (resp.status >= 300) {
			const { error } = (await resp.json()) as { error: string };
			setErrorMsg(error);
			return;
		}

		const { data } = (await resp.json()) as {
			data: { accessToken: string; fname: string; lname: string };
		};
		sessionStorage.setItem(VITE_JWT_SESSION_NAME, data.accessToken);
		setUserName(`${data.fname} ${data.lname}`);
		navigate("/");
	};

	return (
		<>
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
				<FormErrorAlert errorMsg={errorMsg}></FormErrorAlert>
			</Form>
		</>
	);
};
