import React from 'react';

export function Project({ asset, name, blurb, url }) {
	return (
		<div className="h-32 w-96 bg-ctp-mantle flex flex-row gap-4 p-2">
			<img
				src={`${
					window.location.href.includes('s4mi.dev')
						? '/public/assets/logos/'
						: '/assets/logos/'
				}${asset}`}
				style={{
					imageRendering: 'pixelated',
				}}
				className="h-full p-2"
			/>
			<div className="flex flex-col">
				<h1
					className="text-ctp-mauve cursor-pointer"
					onClick={() => window.open(url, '_blank')}
				>
					{name}
				</h1>
				<h1 className="text-subtext2 text-2xl">{blurb}</h1>
			</div>
		</div>
	);
}
