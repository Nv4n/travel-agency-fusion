import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "./ui/button";
import {
	IconLayoutDashboard,
	IconLogout,
	IconUserEdit,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

export const UserNav = () => {
	const [cookies] = useCookies(["fusion-user"]);
	return !cookies["fusion-user"] ? (
		<div className="flex gap-2">
			<Button variant="outline" className="transition-all">
				<Link to={"/login"}>LOGIN</Link>
			</Button>
			<Button variant="outline" className="transition-all">
				<Link to={"/register"}>REGISTER</Link>
			</Button>
		</div>
	) : (
		<div className="relative m-1">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="relative h-10 w-10 rounded-full p-0"
					>
						<Avatar className="grid h-10 w-10 place-items-center">
							<AvatarImage
								src="https://source.unsplash.com/200x200/?avatar"
								className="rounded-full object-fill"
								alt="@user"
							></AvatarImage>
							<AvatarFallback className="text-lg ">
								DF
							</AvatarFallback>
						</Avatar>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-56 rounded-md border-2 border-solid border-zinc-200 p-1"
					align="end"
				>
					<DropdownMenuLabel>@USERNAME</DropdownMenuLabel>
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
							<Link to={"/logout"} className="flex items-center">
								<IconLogout className="mr-2 h-4 w-4">
									{" "}
								</IconLogout>{" "}
								<span>Log out</span>
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
