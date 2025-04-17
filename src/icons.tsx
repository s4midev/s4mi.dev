import { Icon } from '@iconify-icon/react/dist/iconify.js';
import React from 'react';

export function LinkIcon({ icon, url }) {
	return (
        <Icon icon={icon} height={34} width={34} className='h-fit cursor-pointer'/>
    )
}