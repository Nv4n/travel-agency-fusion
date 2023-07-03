import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { IconHome } from "@tabler/icons-react";

export const HomeButton = () => {
	return (
		<Link to={"/"}>
			<Button variant="outline" className="transition-all">
				<IconHome></IconHome>
			</Button>
		</Link>
	);
};
