import React from "react";
import { Icon } from "@iconify-icon/react/dist/iconify.js";

export function Project({url, icon, title, description}) {
	return (
		<div className="flex flex-col gap-2 w-full items-center justify-center p-2 text-3xl">
			<div
				className="flex flex-row items-center gap-2 bg-ctp-mantle h-20 w-full p-2 cursor-pointer"
				onClick={() =>
					window.open(url, '_blank')
				}
			>
				<Icon icon={`pixelarticons:${icon}`} height={'4rem'} />
				<div className="flex flex-col justify-center p-2">
					<h1>{title}</h1>
					<h1 className="text-xl">
						{description}
					</h1>
				</div>
			</div>
		</div>
	);
}
