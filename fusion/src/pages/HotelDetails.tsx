import { VITE_JWT_SESSION_NAME } from "@/client/App";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export const HotelDetails = () => {
	const { hotelId } = useParams();
	const navigate = useNavigate();
	const accessToken = sessionStorage.getItem(VITE_JWT_SESSION_NAME);
	if (!hotelId) {
		navigate("/");
		return;
	}
	const { data, isLoading } = useQuery({
		queryKey: ["hotel-details", hotelId],
		queryFn: async () => {
			const resp = await fetch(`/api/hotels/${hotelId}`, {
				headers: {
					Authorization: `Bearer ${accessToken || ""}`,
				},
			});
		},
	});

	if (isLoading) {
		return <Skeleton className="h-96 w-96"></Skeleton>;
	}
	return <h1>WIP</h1>;
};
