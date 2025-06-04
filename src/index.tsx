import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { snake } from './snake';
import { LinkIcon } from './icons';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import { Project } from './components/Project';

function Screen({ children }) {
	return (
		<div className="min-h-screen h-screen w-screen flex items-center justify-center">
			{children}
		</div>
	);
}

function App() {
	const cvRef = useRef<HTMLCanvasElement>(null);
	const heightRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (heightRef.current) {
			setHeight(heightRef.current.clientHeight);
		}
	}, []);

	useEffect(() => {
		if (cvRef.current && height > 0) {
			cvRef.current.height = height;
			cvRef.current.width = window.innerWidth;
			snake(cvRef.current);
		}
	}, [cvRef.current, height]);

	return (
		<div
			ref={heightRef}
			className="text-ctp-text bg-ctp-base text-4xl flex flex-col items-center p-10 h-fit min-h-screen w-screen relative"
		>
			{height > 0 && (
				<canvas
					ref={cvRef}
					className="w-screen absolute z-10 pointer-events-none top-0 left-0"
					style={{
						imageRendering: 'pixelated',
						height: `${height}px`,
					}}
				/>
			)}
			<Screen>
				<div className="lg:scale-100 scale-150 w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg p-10">
					<h1>I'm s4mi, I make things (badly)</h1>
					<div className="flex flex-row gap-4 h-fit">
						<LinkIcon
							icon={'pixelarticons:github'}
							url={'https://github.com/s4midev'}
						/>
						<LinkIcon
							icon={'pixelarticons:chat'}
							url={
								'https://discordapp.com/users/1298435571395330108'
							}
						/>
					</div>
				</div>
			</Screen>
			<Screen>
				<div className="lg:scale-100 scale-150 w-full h-full flex flex-col gap-2 items-center justify-center rounded-lg p-10">
					<h1>Projects I use and recommend</h1>
					<div className="flex justify-center lg:flex-row md:flex-col sm:flex-col gap-2 flex-wrap">
						{[
							{
								name: 'Jellyfin',
								asset: '/public/assets/logos/jellyfin.png',
								blurb: 'The Free Software Media System',
								url: 'https://jellyfin.org',
							},
							{
								name: 'iPlayarr',
								asset: '/public/assets/logos/iplayarr.png',
								blurb: 'An *arr companion app for get_iplayer',
								url: 'https://github.com/Nikorag/iplayarr',
							},
							{
								name: 'Immich',
								asset: '/public/assets/logos/immich.png',
								blurb: 'Self-hosted media management solution',
								url: 'https://immich.app',
							}
						].map((e) => (
							<Project {...e} />
						))}
					</div>
					<h1 className="text-2xl text-ctp-subtext0">
						<i>
							I'm not endorsed by any of these, they're just cool!
						</i>
					</h1>
				</div>
			</Screen>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
