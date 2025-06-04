import { Icon } from '@iconify-icon/react/dist/iconify.js';
import React from 'react';

export function LinkIcon({ icon, url }) {
	return (
		<div
			className="h-fit w-fit cursor-pointer"
			onClick={() => window.open(url, '_blank')}
		>
			<Icon icon={icon} height={32} width={32} />
		</div>
	);
}
