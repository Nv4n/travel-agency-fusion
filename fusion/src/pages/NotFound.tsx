import { AspectRatio } from "@/components/ui/aspect-ratio";
import travelNotFoundSVG from "@/static/travel_not_found.svg";

export const NotFound = () => {
	return (
		<div className="relative -z-10">
			<AspectRatio ratio={16 / 9}>
				<img
					src={travelNotFoundSVG}
					alt="NOT FOUND 404"
					className="mx-auto h-96 w-fit pt-4"
				/>
				;
			</AspectRatio>
		</div>
	);
};
