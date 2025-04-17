import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function hsvToRgb(h, s, v) {
	let c = v * s;
	let x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	let m = v - c;
	let rgbPrime;

	if (h >= 0 && h < 60) rgbPrime = [c, x, 0];
	else if (h >= 60 && h < 120) rgbPrime = [x, c, 0];
	else if (h >= 120 && h < 180) rgbPrime = [0, c, x];
	else if (h >= 180 && h < 240) rgbPrime = [0, x, c];
	else if (h >= 240 && h < 300) rgbPrime = [x, 0, c];
	else rgbPrime = [c, 0, x];

	return [
		Math.round((rgbPrime[0] + m) * 255),
		Math.round((rgbPrime[1] + m) * 255),
		Math.round((rgbPrime[2] + m) * 255),
	];
}

function App() {
	const cvRef = useRef<HTMLCanvasElement>();

	// cursed
	useEffect(() => {
		let hue = 0;

		let rev = false;

		const pixelScale = 20;

		cvRef.current.width = window.innerWidth / pixelScale;
		cvRef.current.height = window.innerHeight / pixelScale;

		let y = -1;
		let x = -1;

		let dir = [1, 1];

		const ctx = cvRef.current.getContext('2d');

		ctx.imageSmoothingEnabled = false;

		const bgPx = ctx.createImageData(1, 1);

		bgPx.data[0] = 30;
		bgPx.data[1] = 30;
		bgPx.data[2] = 46;
		bgPx.data[3] = 255;

		ctx.fillStyle = '#1e1e2e';
		ctx.fillRect(0, 0, cvRef.current.width, cvRef.current.height);

		let last: number[][] = [];

		const snakeGrow = () => {
			const data = ctx.createImageData(1, 1);

			const col = hsvToRgb(hue, 0.35, 0.8);

			data.data[0] = col[0];
			data.data[1] = col[1];
			data.data[2] = col[2];
			data.data[3] = 255;

			last.push([x, y]);

			if (last.length >= 10) {
				ctx.putImageData(bgPx, last[0][0], last[0][1]);
				last = last.slice(1);
			}

			ctx.putImageData(data, x, y);

			let add = rev ? -1 : 1;

			if (hue + add === 256 || hue + add === -1) {
				rev = !rev;
			}

			hue += add;
		};

		setInterval(() => {
			const move = () => {
				const newY = y + dir[0];
				const newX = x + dir[1];

				let needsReprocess = false;

				if (newY >= cvRef.current.height || newY <= -1) {
					dir[0] *= -1;
					needsReprocess = true;
				}

				if (newX >= cvRef.current.width || newX <= -1) {
					dir[1] *= -1;
					needsReprocess = true;
				}

				if (needsReprocess) {
					move();
				} else {
					y = newY;
					x = newX;
				}
			};

			move();
			snakeGrow();
		}, 50);
	}, []);

	return (
		<div className="text-ctp-text text-3xl flex items-center justify-center min-h-screen w-screen">
			<div className="w-fit h-fit bg-ctp-mantle bg-opacity-50 backdrop-blur-2xl m-24 flex flex-col gap-6 items-center justify-center rounded-lg p-10">
				<h1>I'm s4mi, I make things (badly)</h1>
				<h1 className="text-2xl">
					im gonna add something here soon im promise
				</h1>
			</div>
			<canvas
				ref={cvRef}
				className="w-screen h-screen fixed -z-10"
				style={{
					imageRendering: 'pixelated',
				}}
			/>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
