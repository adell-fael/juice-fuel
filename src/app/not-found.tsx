'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Href } from '@/utils'

export default function NotFound() {
	const router = useRouter()

	useEffect(() => {
		router.replace(Href.homePage())
	}, [router])

	return (
		<div className="flex min-h-[90dvh] items-center justify-center dark:bg-gray-900">
			<div className="w-full max-w-md">
				<h1 className="text-center text-2xl font-bold">404 - Page Not Found</h1>
				<p className="text-center">
					Oops! The page you&apos;re looking for doesn&apos;t exist.
				</p>
				<div className="text-center text-7xl font-bold text-gray-300 dark:text-gray-700">
					404
				</div>
				<button className="btn btn-primary" onClick={() => router.back()}>
					Go back home
				</button>
			</div>
		</div>
	)
}
