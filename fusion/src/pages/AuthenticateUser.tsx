import { LoginForm, type LoginUser } from "@/components/forms/LoginForm";
import {
	RegisterForm,
	type RegisterUser,
} from "@/components/forms/RegisterForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export const AuthenticateUser = () => {
	const [errorMsg, setErrorMsg] = useState("");
	const canGoHere = sessionStorage.ge;
	const location = useLocation();
	const onLoginSubmit = async (values: LoginUser) => {
		const resp = await fetch("/api/users/login");
	};
	const onRegisterSubmit = async (value: RegisterUser) => {
		const resp = await fetch("/api/users/register", {
			headers: {
				"content-type": "application/json",
			},
		});
	};
	return (
		<div className="py-4">
			<Tabs
				defaultValue={location.pathname.slice(1) || "register"}
				className="mx-auto w-96 pt-12"
			>
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="login">Login</TabsTrigger>
					<TabsTrigger value="register">Register</TabsTrigger>
				</TabsList>
				<TabsContent value="login">
					<Card>
						<CardHeader>
							<LoginForm
								className="space-y-2"
								onLoginSubmit={onLoginSubmit}
							></LoginForm>
						</CardHeader>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card>
						<CardHeader>
							<RegisterForm
								className="space-y-2"
								onRegisterSubmit={onRegisterSubmit}
							></RegisterForm>
						</CardHeader>
					</Card>
				</TabsContent>
			</Tabs>

			{errorMsg && (
				<Alert className="mx-auto my-4  w-96 " variant="destructive">
					<IconAlertTriangle className="!top-auto h-4 w-4"></IconAlertTriangle>{" "}
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{errorMsg}</AlertDescription>
				</Alert>
			)}
		</div>
	);
};
