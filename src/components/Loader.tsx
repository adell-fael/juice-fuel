import React, { FC } from 'react'

import { cn } from '@/utils'

export const Loader: FC<{ className?: string; full?: boolean }> = ({
	className,
	full,
}) => {
	return (
		<div className={cn('flex items-center justify-center', full && 'h-dvh')}>
			<span className={cn('loading loading-dots loading-lg', className)}></span>
		</div>
	)
}

export default Loader
