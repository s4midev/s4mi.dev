import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { snake } from './snake';
import { LinkIcon } from './icons';

function App() {
	const cvRef = useRef<HTMLCanvasElement>();

	// cursed
	useEffect(() => {
		snake(cvRef.current);
	}, []);

	return (
		<div className="text-ctp-text bg-ctp-base text-4xl flex items-center justify-center min-h-screen w-screen">
			<div className="w-fit h-fit m-24 flex flex-col gap-6 items-center justify-center rounded-lg p-10">
				<h1>I'm s4mi, I make things (badly)</h1>
				<div className='flex flex-row gap-4 h-fit'>
					<LinkIcon icon={"pixelarticons:github"} url={"https://github.com/s4midev"}/>
					<LinkIcon icon={"pixelarticons:chat"} url={"https://github.com/s4midev"}/>
				</div>
			</div>
			<canvas
				ref={cvRef}
				className="w-screen h-screen fixed z-10"
				style={{
					imageRendering: 'pixelated',
				}}
			/>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
