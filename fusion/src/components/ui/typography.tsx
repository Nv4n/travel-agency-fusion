import { cn } from "@/lib/utils";

interface H1Props extends React.HTMLAttributes<HTMLHeadingElement> {
	children?: React.ReactNode;
}

export function TypographyH1({ children, className, ...props }: H1Props) {
	return (
		<h1
			{...props}
			className={cn(
				"scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
				className
			)}
		>
			{children}
		</h1>
	);
}
