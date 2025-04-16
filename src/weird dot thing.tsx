import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
	const cvRef = useRef<HTMLCanvasElement>();

	// cursed
	useEffect(() => {
		setInterval(() => {
			const pixelScale = 25;

			cvRef.current.width = window.innerWidth / pixelScale;
			cvRef.current.height = window.innerHeight / pixelScale;

			if (!cvRef.current) return;

			const ctx = cvRef.current.getContext('2d');

			ctx.imageSmoothingEnabled = false;

			const colours = [
				[245, 224, 220], // Rosewater
				[242, 205, 205], // Flamingo
				[245, 194, 231], // Pink
				[203, 166, 247], // Mauve
				[243, 139, 168], // Red
				[235, 160, 172], // Maroon
				[250, 179, 135], // Peach
				[249, 226, 175], // Yellow
				[166, 227, 161], // Green
				[148, 226, 213], // Teal
				[137, 220, 235], // Sky
				[116, 199, 236], // Sapphire
				[137, 180, 250], // Blue
				[180, 190, 254], // Lavender
			];

			ctx.fillStyle = '#1e1e2e';
			ctx.fillRect(0, 0, cvRef.current.width, cvRef.current.height);

			let filled: number[][] = [];

			function distanceCheck(x, y, matrix, range) {
				return matrix.some(([px, py]) => {
					const dx = x - px;
					const dy = y - py;
					const distance = Math.sqrt(dx * dx + dy * dy);
					return distance <= range;
				});
			}

			const dotSize = 50 / pixelScale;

			const gen = () => {
				const x = Math.floor(Math.random() * cvRef.current.width);
				const y = Math.floor(Math.random() * cvRef.current.height);

				if (distanceCheck(x, y, filled, dotSize * 2 * 1.2)) {
					return false;
				}

				ctx.fillStyle = `rgb(${colours[
					Math.floor(Math.random() * colours.length)
				].join(',')})`;

				ctx.beginPath();
				ctx.arc(x, y, dotSize, 0, Math.PI * 2);
				ctx.fill();
				ctx.closePath();

				filled.push([x, y]);

				return true;
			};

			const cols = Math.floor(cvRef.current.width / (dotSize * 2));
			const rows = Math.floor(cvRef.current.height / (dotSize * 2));
			const dotCount = cols * rows;

			for (let i = 0; i < dotCount; i++) {
				let success = false;
				let attempts = 0;
				const maxAttempts = 100;

				while (!success && attempts < maxAttempts) {
					if (gen()) {
						success = true;
					}
					attempts++;
				}
			}
		}, 5);
	}, []);

	return (
		<div className="text-ctp-text text-4xl flex items-center justify-center min-h-screen w-screen">
			<h1>ough</h1>
			<canvas
				ref={cvRef}
				className="w-screen h-screen fixed -z-10"
				style={{
					imageRendering: 'pixelated',
					filter: 'brightness(0.25)',
				}}
			/>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
