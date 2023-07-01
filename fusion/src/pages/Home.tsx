import { SearchHotelForm } from "@/components/forms/SearchHotelForm";
import travelTogetherSrc from "../static/travel_together.svg";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TypographyH1 } from "@/components/ui/typography";

export const Home = () => {
	return (
		<>
			<div className="flex items-center pt-10 sm:px-5">
				<div className="flex items-center gap-4 sm:flex-col ">
					<TypographyH1>
						<span className="animate-gradient bg-gradient-to-r from-[#6C63FC] via-[#FD6484] to-[#ABA8E4] bg-clip-text text-transparent">
							Fusion
						</span>{" "}
						travel together
					</TypographyH1>
					<div className="md:w-9/12 lg:w-[36rem]">
						<AspectRatio ratio={9 / 16}>
							<img
								src={travelTogetherSrc}
								alt="img"
								className="scroll-m-20 object-cover"
							></img>
						</AspectRatio>
					</div>
				</div>
				<div className="m-auto flex h-full items-center">
					<SearchHotelForm className="space-y-8 p-8"></SearchHotelForm>
				</div>
			</div>
		</>
	);
};
