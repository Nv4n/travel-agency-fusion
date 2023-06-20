import { HotelCard } from "@/components/HotelCard";

export const Hotels = () => {
	return (
		<section>
			<div className=" flex flex-wrap gap-2 px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
				<HotelCard></HotelCard>
			</div>
		</section>
	);
};
