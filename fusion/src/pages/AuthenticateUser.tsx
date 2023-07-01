import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { LoginForm } from "@/components/forms/LoginForm";
import { RegisterForm } from "@/components/forms/RegisterForm";
import { Card, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthenticateUser = () => {
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);

	const canGoHere = accessToken;
	const navigate = useNavigate();
	if (!canGoHere) {
		navigate("/");
	}
	const location = useLocation();

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
							<LoginForm className="space-y-2"></LoginForm>
						</CardHeader>
					</Card>
				</TabsContent>
				<TabsContent value="register">
					<Card>
						<CardHeader>
							<RegisterForm className="space-y-2"></RegisterForm>
						</CardHeader>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
};
