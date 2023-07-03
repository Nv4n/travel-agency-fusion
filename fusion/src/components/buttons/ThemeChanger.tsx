import { IconMoon, IconSun } from "@tabler/icons-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const ThemeChanger = () => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") || "light"
	);
	const onThemeChange = () => {
		const newTheme = theme === "light" ? "dark" : "light";

		setTheme(newTheme);
		localStorage.setItem("theme", newTheme);
		if (newTheme === "dark") {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	};
	return (
		<Button onClick={() => onThemeChange()}>
			{theme === "light" ? <IconMoon></IconMoon> : <IconSun></IconSun>}
		</Button>
	);
};
