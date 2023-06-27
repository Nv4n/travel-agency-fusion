import { SearchHotelForm } from "@/components/forms/SearchHotelForm";

export const Home = () => {
	return (
		<div className="fixed bottom-0 flex w-full flex-col pb-8">
			<SearchHotelForm className="ml-auto mr-auto mt-auto"></SearchHotelForm>
		</div>
	);
};
