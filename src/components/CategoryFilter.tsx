'use client'

import { useCallback, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { cn } from '@/utils'

interface CategoryFilterProps {
	categories: Array<string>
	onFilterChange: (categories: string[]) => void
	selectedCategories: string[]
}

function CategoryFilter({
	categories,
	onFilterChange,
	selectedCategories,
}: CategoryFilterProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const clearBtnRef = useRef<HTMLButtonElement>(null)

	useGSAP(
		() => {
			gsap.from('.filter button', {
				opacity: 0,
				y: 10,
				stagger: 0.1,
				duration: 0.2,
				ease: 'power2.out',
			})
		},
		{ scope: containerRef, dependencies: [] }
	)

	useGSAP(
		() => {
			gsap.fromTo(
				clearBtnRef.current,
				{ opacity: 0, scale: 0.8 },
				{ opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
			)
		},
		{ scope: containerRef, dependencies: [selectedCategories.length > 0] }
	)

	const handleReset = useCallback(() => {
		onFilterChange([])
	}, [onFilterChange])

	const handleCategoryChange = useCallback(
		(categoryKey: string) => {
			if (selectedCategories.includes(categoryKey)) {
				onFilterChange(selectedCategories.filter((cat) => cat !== categoryKey))
			} else {
				onFilterChange([...selectedCategories, categoryKey])
			}
		},
		[onFilterChange, selectedCategories]
	)

	return (
		<div
			ref={containerRef}
			className="bg-base-200 z-10 my-7 flex flex-wrap justify-center gap-2 rounded-md p-4 filter"
		>
			{selectedCategories.length > 0 && (
				<button
					ref={clearBtnRef}
					aria-label="Clear filter"
					className="btn btn-square btn-primary"
					type="button"
					onClick={handleReset}
				>
					×
				</button>
			)}

			{categories.map((x, idx) => (
				<button
					key={x + idx}
					aria-label={x}
					className={cn(
						`btn btn-soft btn-primary`,
						selectedCategories.includes(x) && 'btn-active'
					)}
					type="button"
					onClick={() => handleCategoryChange(x)}
				>
					{x}
				</button>
			))}
		</div>
	)
}

export default CategoryFilter
