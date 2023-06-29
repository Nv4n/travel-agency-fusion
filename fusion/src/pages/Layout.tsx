import { UserNav } from "@/components/UserNav";
import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";

export const Layout = () => {
	const TestFunc = async () => {
		const test = await fetch("/api/test");
		console.log(test);
	};
	return (
		<>
			<header>
				<nav className="sticky right-0 top-0 ">
					<ul>
						<li className="absolute right-0 top-0 p-4">
							<UserNav></UserNav>
						</li>
						<li>
							<Button onClick={() => TestFunc()}>
								TEST BUTTON
							</Button>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<Outlet></Outlet>
			</main>
		</>
	);
};
