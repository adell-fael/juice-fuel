'use client'
import React, { FC, ReactNode, useRef } from 'react'

import { cn } from '@/utils'

interface DialogProps {
	title: string
	description: string
	content?: ReactNode
	openModalButtonTitle?: string
	openModalButtonClassNames?: string
}

const Dialog: FC<DialogProps> = (props) => {
	const {
		description = '	Press ESC key or click the button below to close',
		title = 'Hello!',
		openModalButtonTitle = 'open modal',
		openModalButtonClassNames,
		content,
	} = props
	const dialogRef = useRef<HTMLDialogElement>(null)

	return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<button
				className={cn('btn', openModalButtonClassNames)}
				onClick={() => dialogRef.current?.showModal()}
			>
				{openModalButtonTitle}
			</button>
			<dialog ref={dialogRef} className="modal">
				<div className="modal-box">
					<h3 className="text-lg font-bold">{title}</h3>
					<div className="py-4">
						{description}

						{content && <div className="py-2">{content}</div>}
					</div>
					<div className="modal-action">
						<form method="dialog">
							{/* if there is a button in form, it will close the modal */}
							<button className="btn">Close</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	)
}

export default Dialog
