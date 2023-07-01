import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserNameContext } from "@/pages/Layout";
import {
	IconHome,
	IconLayoutDashboard,
	IconLogout,
	IconUserEdit,
} from "@tabler/icons-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const UserNav = () => {
	const [userName, _] = useContext(UserNameContext);
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const alias = userName
		.split(" ")
		.map((name) => name.charAt(0).toUpperCase())
		.join("");

	const onLogOut = async () => {
		console.log("inside");
		await fetch("/api/users/logout", {
			method: "DELETE",
		});
		console.log("after fetch");

		sessionStorage.removeItem(VITE_JWT_SESSION_NAME);
		navigate("/");
	};

	return !accessToken ? (
		pathname === "/login" || pathname === "/register" ? (
			<>
				<Link to={"/"}>
					<Button variant="outline" className="transition-all">
						<IconHome></IconHome>
					</Button>
				</Link>
			</>
		) : (
			<div className="flex gap-2">
				<Link to={"/login"}>
					<Button variant="outline" className="transition-all">
						LOGIN
					</Button>
				</Link>
				<Link to={"/register"}>
					<Button variant="outline" className="transition-all">
						REGISTER
					</Button>
				</Link>
			</div>
		)
	) : (
		<div className="relative m-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="relative h-10 w-10 rounded-full p-0"
					>
						<Avatar className="grid h-10 w-10 place-items-center">
							<AvatarFallback className="text-lg ">
								{alias}
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 rounded-md border-2 border-solid border-zinc-200 p-1"
					align="end"
				>
					<DropdownMenuLabel>{userName}</DropdownMenuLabel>
					<DropdownMenuSeparator></DropdownMenuSeparator>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Link
								to={"/user/id/dashboard"}
								className="flex items-center"
							>
								<IconLayoutDashboard className="mr-2 h-4 w-4"></IconLayoutDashboard>{" "}
								<span>Dashboard</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link
								to={"/user/id/edit"}
								className="flex items-center"
							>
								<IconUserEdit className="mr-2 h-4 w-4"></IconUserEdit>{" "}
								<span>Edit Profile</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Button
								onClick={() => void onLogOut()}
								className="flex items-center"
							>
								<IconLogout className="mr-2 h-4 w-4">
									{" "}
								</IconLogout>{" "}
								<span>Log out</span>
							</Button>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
