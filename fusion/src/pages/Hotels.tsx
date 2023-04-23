import { HotelPreviewCard } from "../components/HotelPreviewCard";
import { Filter } from "../components/Filter";
import { Carousel } from "../components/Carousel";

export const Hotels = () => {
	return (
		<section>
			<div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
				<Filter></Filter>

				<div className="lg:col-span-3">
					<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						<li>
							<HotelPreviewCard></HotelPreviewCard>
						</li>
						<li>
							<HotelPreviewCard></HotelPreviewCard>
						</li>
						<li>
							<HotelPreviewCard></HotelPreviewCard>
						</li>
					</ul>
				</div>

				<Carousel
					images={[
						"https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
						"https://images.unsplash.com/photo-1517840901100-8179e982acb7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
					]}
				></Carousel>
			</div>
		</section>
	);
};
