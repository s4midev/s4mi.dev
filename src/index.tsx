import React, { ReactNode, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import Squares from './Squares';
import { Project } from './components/Project';
import Draggable from 'react-draggable';

const windows: { [key: string]: any } = {
	about: (
		<Window width="40rem" title="about">
			<img src="pfp.png" className="h-40 m-2" />
			<div className="flex flex-col flex-grow gap-2 items-center justify-center text-2xl ">
				<h1>hi, i'm s4mi :3</h1>
				<h1>i'm a programmer from england</h1>
			</div>
		</Window>
	),
	links: (
		<Window width="20rem" title="links" class="top-8 right-8">
			<div className="flex flex-row gap-2 w-full items-center justify-center p-2 text-4xl">
				<Icon
					icon={'pixelarticons:github'}
					height={'2rem'}
					className="cursor-pointer"
					onClick={() =>
						window.open('https://github.com/s4midev', '_blank')
					}
				/>
				<Icon
					icon={'pixelarticons:chat'}
					height={'2rem'}
					className="cursor-pointer"
					onClick={() =>
						window.open(
							'https://discordapp.com/users/1298435571395330108',
							'_blank'
						)
					}
				/>
			</div>
		</Window>
	),
	projects: (
		<Window width="30rem" title="projects" class="bottom-8 right-8">
			<Project
				description={'a lightweight golang based concert notifier'}
				icon={'eye'}
				title={'vigil'}
				url={'https://github.com/s4midev/vigil'}
			/>
		</Window>
	),
};

const colours = [
	'rosewater',
	'flamingo',
	'pink',
	'mauve',
	'red',
	'maroon',
	'peach',
	'yellow',
	'green',
	'teal',
	'sky',
	'sapphire',
	'blue',
];

function Window(props: {
	title: string;
	children?: ReactNode;
	width: string;
	class?: string;
}) {
	const col =
		colours[
			Object.keys(windows)
				.map((t, i) => (t === props.title ? i : null))
				.find((v) => !!v) -
				(1 % colours.length)
		];

	return (
		<Draggable>
			<div
				className={`flex flex-col w-fit h-fit justify-center items-center fixed ${props.class}`}
			>
				<div
					className={`bg-ctp-base border-2 border-ctp-${col} h-fit flex flex-row justify-end`}
					style={{ width: props.width }}
				>
					<h1 className="mr-auto text-2xl ml-2">{props.title}</h1>
				</div>
				<div
					className={`bg-ctp-base border-2 border-t-0 border-ctp-${col} h-fit flex flex-row`}
					style={{ width: props.width }}
				>
					{props.children}
				</div>
			</div>
		</Draggable>
	);
}

function App() {
	const [w, setW] = useState<{ [key: string]: boolean }>({
		about: true,
	});

	return (
		<div className="text-ctp-text bg-ctp-mantle flex justify-center items-center h-screen w-screen select-none">
			<div
				style={{ width: '100%', height: '100%', position: 'relative' }}
			>
				<Squares
					speed={0.5}
					squareSize={60}
					direction="diagonal"
					borderColor="#cba6f7"
					hoverFillColor="#00000000"
				/>
			</div>
			<div className="h-fit w-18 p-2 absolute right-2 flex flex-col gap-2 items-end">
				{[
					['about', 'info-box'],
					['links', 'external-link'],
					['projects', 'code'],
				].map(([wName, icon], i) => {
					const [hovered, setHovered] = useState(false);

					const selfRef = useRef(null);

					const baseWidth = 72;
					let expandedWidth = 200;

					useEffect(() => {
						expandedWidth = selfRef.current.clientHeight;
					}, [selfRef.current]);

					return (
						<div
							ref={selfRef}
							className={`bg-ctp-base p-2 h-[3.5rem] border-ctp-${
								colours[i % colours.length]
							} border-2 flex flex-row gap-2 items-center justify-center`}
							style={{
								width: hovered ? expandedWidth : '3.5rem',
								transition: 'width 0.2s',
								overflow: 'hidden',
							}}
							onMouseOver={() => setHovered(true)}
							onMouseLeave={() => setHovered(false)}
							onClick={() => setW({ ...w, [wName]: !w[wName] })}
						>
							{hovered && (
								<h1 className="text-3xl shrink-0 self-center justify-self-center mb-1">
									{wName}
								</h1>
							)}
							<Icon
								icon={`pixelarticons:${icon}`}
								height={'2rem'}
								className="cursor-pointer flex"
							/>
						</div>
					);
				})}
			</div>
			{Object.entries(windows)
				.filter(([key, value]) => w?.[key])
				.map(([_, c]) => c)}
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
