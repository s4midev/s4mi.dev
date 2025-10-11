import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Icon } from '@iconify-icon/react/dist/iconify.js';
import DotGrid from './DotGrid';

function Window(props: {
	title: string;
	children?: ReactNode;
	width: string;
	class?: string;
}) {
	return (
		<div
			className={`flex flex-col w-fit h-fit justify-center items-center fixed ${props.class}`}
		>
			<div
				className={`bg-ctp-mantle border-2 border-ctp-text h-fit flex flex-row justify-end`}
				style={{ width: props.width }}
			>
				<h1 className="mr-auto text-2xl ml-2">{props.title}</h1>

				<Icon icon={'pixelarticons:close-box'} height={'2rem'} />
			</div>
			<div
				className={`bg-ctp-mantle border-2 border-t-0 border-ctp-text h-fit flex flex-row`}
				style={{ width: props.width }}
			>
				{props.children}
			</div>
		</div>
	);
}

function App() {
	return (
		<div className="text-ctp-text bg-ctp-base flex justify-center items-center h-screen w-screen gap-2">
			<Window width="40rem" title="about">
				<img src="pfp.png" className="h-40 m-2" />
				<div className="flex flex-col flex-grow gap-2 items-center justify-center text-xl">
					<h1>hi, i'm s4mi :3</h1>
					<h1>i'm a programmer and data hoarder from england</h1>
				</div>
			</Window>
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
			<Window width="8rem" title="cat" class="bottom-8 left-8">
				<img src="wires.png" />
			</Window>
			<Window width="30rem" title="projects" class="bottom-8 right-8">
				<div className="flex flex-col gap-2 w-full items-center justify-center p-2 text-3xl">
					<div
						className="flex flex-row items-center gap-2 bg-ctp-crust h-20 w-full p-2 cursor-pointer"
						onClick={() =>
							window.open(
								'https://github.com/s4midev/goaway',
								'_blank'
							)
						}
					>
						<Icon icon={'pixelarticons:movie'} height={'4rem'} />
						<div className="flex flex-col justify-center p-2">
							<h1>goaway</h1>
							<h1 className="text-xl">
								remove failed *arr downloads efficiently
							</h1>
						</div>
					</div>
				</div>
			</Window>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
