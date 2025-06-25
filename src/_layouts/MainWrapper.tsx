import React, { FC, ReactNode } from 'react'

import { Footer, Navbar, ScrollToTop } from '@/components'

import { Toastify } from '.'

type MainWrapperProps = {
	children: ReactNode
}

const MainWrapper: FC<MainWrapperProps> = ({ children }) => {
	return (
		<div className="relative flex h-screen flex-col">
			<header>
				<Navbar />
			</header>
			<main>{children}</main>

			<Footer />

			<Toastify />
			<ScrollToTop />
		</div>
	)
}

export default MainWrapper
