import { SearchHotelForm } from "@/components/forms/SearchHotelForm";
import travelTogetherSrc from "../static/travel_together.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TypographyH1 } from "@/components/ui/typography";

export const Home = () => {
	return (
		<>
			<div className="flex items-center p-10">
				<div className="flex flex-col items-center ">
					<TypographyH1>
						<span className="animate-gradient bg-gradient-to-r from-[#6C63FC] via-[#FD6484] to-[#ABA8E4] bg-clip-text text-transparent">
							Fusion
						</span>{" "}
						travel together
					</TypographyH1>
					<div className="w-[600px]">
						<AspectRatio ratio={9 / 16}>
							<img
								src={travelTogetherSrc}
								alt="img"
								className="object-cover"
							></img>
						</AspectRatio>
					</div>
				</div>
				<div className="flex m-auto h-full items-center">
					<SearchHotelForm className="space-y-8 p-8"></SearchHotelForm>
				</div>
			</div>
		</>
	);
};
