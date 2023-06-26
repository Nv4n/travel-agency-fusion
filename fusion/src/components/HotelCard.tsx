import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { IconCash, IconStarFilled } from "@tabler/icons-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";

interface HotelCardProps {
	img: string;
	price: number;
	hotelName: string;
}

const notifications = [
	{
		title: "Your call has been confirmed.",
		description: "1 hour ago",
	},
	{
		title: "You have a new message!",
		description: "1 hour ago",
	},
	{
		title: "Your subscription is expiring soon!",
		description: "2 hours ago",
	},
];

type CardProps = React.ComponentProps<typeof Card>;

export const HotelCard = ({ className, ...props }: CardProps) => {
	return (
		<Link to={"/search/details/test"} className="font-[poppins]">
			<Card
				className={cn("group relative w-[25rem]", className)}
				{...props}
			>
				<Suspense fallback={<p>LOADING...</p>}>
					<img
						src="https://source.unsplash.com/600x600/?hotel&bulgaria"
						loading="lazy"
						alt="loading..."
						className="h-[15rem] w-full rounded-t-md object-cover transition duration-500 group-hover:opacity-90 sm:h-[20rem]"
					/>
				</Suspense>
				<CardHeader className="font-[montserrat]">
					<CardTitle>Hotel Name</CardTitle>
					<CardDescription>Destination</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<div className=" flex items-center space-x-4 rounded-md border p-4">
						<IconCash />
						<div className="flex-1 space-y-1">
							<p className="text-m font-medium leading-none">
								400 BGN/night
							</p>
						</div>
					</div>

					<div className="flex items-center space-x-4 rounded-md border-2 p-4">
						<IconStarFilled className="h-4 w-4"></IconStarFilled>
						<div className="flex-1 space-y-1">
							<p className="text-m font-medium leading-none">
								4.9/(4K REVIEWS)
							</p>
						</div>
					</div>
				</CardContent>
				<Separator></Separator>
			</Card>
		</Link>
	);
};
