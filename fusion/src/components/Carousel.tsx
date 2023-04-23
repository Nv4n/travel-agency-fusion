import React, { useState } from "react";

interface Props {
	images: string[];
}

export const Carousel = ({ images }: Props) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrevious = () => {
		if (currentIndex === 0) {
			setCurrentIndex(images.length - 1);
		} else {
			setCurrentIndex(currentIndex - 1);
		}
	};

	const goToNext = () => {
		if (currentIndex === images.length - 1) {
			setCurrentIndex(0);
		} else {
			setCurrentIndex(currentIndex + 1);
		}
	};
	const goToIndex = (index: number) => {
		if (index >= 0 && index < images.length) setCurrentIndex(index);
	};

	return (
		<div
			id="default-carousel"
			className="relative w-full"
			data-carousel="slide"
		>
			{images.map((image, _) => (
				<div
					className="hidden duration-700 ease-in-out"
					data-carousel-item
				>
					<img
						src={image}
						className="absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
						alt="..."
					></img>
				</div>
			))}
			<button
				type="button"
				className="group absolute top-0 left-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
				data-carousel-prev
				onClick={goToPrevious}
			>
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
					<svg
						aria-hidden="true"
						className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						></path>
					</svg>
					<span className="sr-only">Previous</span>
				</span>
			</button>

			<button
				type="button"
				className="group absolute top-0 right-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
				data-carousel-next
				onClick={goToNext}
			>
				<span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10">
					<svg
						aria-hidden="true"
						className="h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						></path>
					</svg>
					<span className="sr-only">Next</span>
				</span>
			</button>

			<div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
				{images.map((_, index) => (
					<button
						type="button"
						className="h-3 w-3 rounded-full"
						aria-current="true"
						aria-label={`Slide ${index + 1}`}
						data-carousel-slide-to={`${index}`}
						onClick={() => goToIndex(index)}
					></button>
				))}
			</div>
		</div>
	);
};

export default Carousel;
