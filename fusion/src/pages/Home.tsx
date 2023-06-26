import { UserNav } from "@/components/UserNav";
import { SearchHotelForm } from "@/components/forms/SearchHotelForm";

export const Home = () => {
	return (
		<div className="flex h-screen flex-col">
			<nav className="ml-auto space-x-4">
				<UserNav />
			</nav>
			<SearchHotelForm className=" mb-8 ml-auto mr-auto mt-auto h-max w-max"></SearchHotelForm>
		</div>
	);
};
