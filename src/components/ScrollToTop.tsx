'use client'

import React, { useEffect, useState } from 'react'

import { useThrottle } from '@/hooks'

const ScrollToTop = () => {
	const [scrollY, setScrollY] = useState(0)

	// Throttle the scroll position
	const throttledScrollY = useThrottle(scrollY, 500) // 200ms throttle

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY)
		}

		window.addEventListener('scroll', handleScroll)

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	const handleScrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const isVisible = throttledScrollY > 100

	if (!isVisible) return null

	return (
		<button
			className="btn btn-circle btn-primary fixed right-5 bottom-10 z-10"
			onClick={handleScrollToTop}
		>
			<svg
				className="fill-primary-content size-5"
				viewBox="0 0 492.002 492.002"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M484.136,328.473L264.988,109.329c-5.064-5.064-11.816-7.844-19.172-7.844c-7.208,0-13.964,2.78-19.02,7.844L7.852,328.265C2.788,333.333,0,340.089,0,347.297c0,7.208,2.784,13.968,7.852,19.032l16.124,16.124c5.064,5.064,11.824,7.86,19.032,7.86s13.964-2.796,19.032-7.86l183.852-183.852l184.056,184.064c5.064,5.06,11.82,7.852,19.032,7.852c7.208,0,13.96-2.792,19.028-7.852l16.128-16.132C494.624,356.041,494.624,338.965,484.136,328.473z" />
			</svg>
		</button>
	)
}

export default ScrollToTop
