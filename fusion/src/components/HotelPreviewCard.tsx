export const HotelPreviewCard = () => {
	return (
		<>
			<a href="#" className="group relative block">
				<img
					src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
					alt=""
					className="h-[350px] w-full object-cover transition duration-500 group-hover:opacity-90 sm:h-[450px]"
				/>

				<div className="absolute inset-0 flex flex-col items-start justify-end p-6">
					<h3 className="text-xl font-medium text-white">
						Default Hotel
					</h3>

					<p className="mt-1.5 max-w-[40ch] text-xs text-white">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Dignissimos sequi dicta impedit aperiam ipsum!
					</p>

					<span className="mt-3 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
						{" "}
						£24.00 GBP{" "}
					</span>
				</div>
			</a>
		</>
	);
};
