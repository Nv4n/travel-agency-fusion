import { UserNav } from "@/components/UserNav";
import { SearchHotelForm } from "@/components/forms/SearchHotelForm";

export const Home = () => {
	return (
		<div className="flex h-screen flex-col">
			<div className="ml-auto space-x-4">
				<UserNav />
			</div>
			<SearchHotelForm className="ml-auto mt-auto h-max w-max"></SearchHotelForm>
		</div>
	);
};
