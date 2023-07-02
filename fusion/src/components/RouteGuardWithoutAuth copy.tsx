import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

export const RouteGuardWithoutAuth = ({ children }: PropsWithChildren) => {
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
	const navigate = useNavigate();
	if (!accessToken) {
		navigate("/");
	}
	return children;
};
