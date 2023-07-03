import { Link } from "react-router-dom";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Suspense } from "react";
import {
	IconCash,
	IconSquareRoundedPlus,
	IconStarFilled,
	IconUsers,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { type Room } from "@/pages/HotelDetails";
import { Skeleton } from "./ui/skeleton";
import { TypographyP } from "./ui/typography";
import { Button } from "react-day-picker";

interface CardProps extends React.ComponentProps<typeof Card> {
	room: Room;
	hotelId: string;
}

export const RoomCard = ({ className, room, hotelId, ...props }: CardProps) => {
	const { id, quantity, maxGuests, price } = room;
	const onReservation = () => {
		console.log(`Reservation for ${hotelId} from Room:${id}`);
	};
	return (
		<Card className={cn("group relative w-[25rem] ", className)} {...props}>
			<Skeleton className="h-12 w-12"></Skeleton>
			<CardHeader>
				<CardTitle>{price}</CardTitle>
				<CardDescription>
					<IconUsers></IconUsers>
					<span>{maxGuests}</span>
				</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className=" flex items-center space-x-4 rounded-md border p-4">
					<IconCash />
					<div className="flex-1 space-y-1">
						<TypographyP>{price} BGN/night</TypographyP>
					</div>
				</div>
				<Button onClick={() => onReservation()}>
					<TypographyP>{`Get 1 out ${quantity} rooms`} </TypographyP>
					<IconSquareRoundedPlus></IconSquareRoundedPlus>
				</Button>
			</CardContent>
		</Card>
	);
};
