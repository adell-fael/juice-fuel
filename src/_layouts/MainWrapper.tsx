import React, { FC, ReactNode } from 'react'

import { Navbar } from '@/components'

import { Toastify } from '.'

type MainWrapperProps = {
	children: ReactNode
}

const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
	return (
		<div className="flex h-screen flex-col">
			<header>
				<Navbar />
			</header>
			<main>{children}</main>

			<footer>Footer goes here</footer>

			<Toastify />
		</div>
	)
}

export default MainWrapper
