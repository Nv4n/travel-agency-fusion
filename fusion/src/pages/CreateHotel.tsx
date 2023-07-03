import { RouteGuardWithAuth } from "@/components/guards/RouteGuardWithAuth";
import { CreateHotelForm } from "@/components/forms/CreateHotelForm";

export const CreateHotel = () => {
	return (
		<div className="mx-auto w-96 pt-12">
			<RouteGuardWithAuth>
				<CreateHotelForm></CreateHotelForm>
			</RouteGuardWithAuth>
		</div>
	);
};
