import { UserNav } from "@/components/UserNav";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	return (
		<>
			<header>
				<nav className="sticky right-0 top-0 ">
					<ul>
						<li className="absolute right-0 top-0 p-4">
							<UserNav></UserNav>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Outlet></Outlet>;
			</main>
		</>
	);
};
