import { cn } from "@/lib/utils";

interface HProps extends React.HTMLAttributes<HTMLHeadingElement> {
	children?: React.ReactNode;
}

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children?: React.ReactNode;
}

export function TypographyH1({ children, className, ...props }: HProps) {
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

export function TypographyH2({ children, className, ...props }: HProps) {
	return (
		<h2
			{...props}
			className={cn(
				"scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
				className
			)}
		>
			{children}
		</h2>
	);
}
export function TypographyH3({ children, className, ...props }: HProps) {
	return (
		<h3
			{...props}
			className={cn(
				"scroll-m-20 text-2xl font-semibold tracking-tight",
				className
			)}
		>
			{children}
		</h3>
	);
}

export function TypographyP({ children, className, ...props }: PProps) {
	return (
		<p
			{...props}
			className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
		>
			{children}
		</p>
	);
}
  
