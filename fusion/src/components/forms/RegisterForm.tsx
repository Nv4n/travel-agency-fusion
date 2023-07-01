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
import { schemaRegisterUser } from "@/model/formSchemas/SchemaUserAuthenticate";
import { UserNameContext } from "@/pages/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { type z } from "zod";
import { hidePlaceholderStyles, peekLabelStyles } from "./formStyles";
import { FormErrorAlert } from "./FormErrorAlert";

export type RegisterUser = z.infer<typeof schemaRegisterUser>;

export type RegisterFormProps = React.FormHTMLAttributes<HTMLFormElement>;

export const RegisterForm = ({ className }: RegisterFormProps) => {
	const [errorMsg, setErrorMsg] = useState("");
	const [_, setUserName] = useContext(UserNameContext);
	const navigate = useNavigate();
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

	const onRegisterSubmit = async (values: RegisterUser) => {
		const resp = await fetch("/api/users/register", {
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
				<FormErrorAlert errorMsg={errorMsg}></FormErrorAlert>
			</Form>{" "}
		</>
	);
};
