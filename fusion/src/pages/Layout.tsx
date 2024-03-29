import { HomeButton } from "@/components/buttons/HomeButton";
import { ThemeChanger } from "@/components/buttons/ThemeChanger";
import { UserNav } from "@/components/UserNav";
import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const UserNameContext = createContext<
	[string, (newName: string) => void]
>([
	"",
	(_ = "") => {
		return;
	},
]);
export const Layout = () => {
	const nameContext = useState("");
	if (
		localStorage.theme === "dark" ||
		(!("theme" in localStorage) &&
			window.matchMedia("(prefers-color-scheme: dark)").matches)
	) {
		localStorage.setItem("theme", "dark");
		document.documentElement.classList.add("dark");
	} else {
		localStorage.setItem("theme", "light");
		document.documentElement.classList.remove("dark");
	}
	return (
		<UserNameContext.Provider value={nameContext}>
			<header>
				<nav className="sticky right-0 top-0 ">
					<div className="absolute right-0 top-0 flex gap-2 p-4 sm:left-auto sm:right-0">
						<ThemeChanger></ThemeChanger>
						<HomeButton></HomeButton>

						<UserNav></UserNav>
					</div>
				</nav>
			</header>
			<main>
				<Outlet></Outlet>
			</main>
		</UserNameContext.Provider>
	);
};
