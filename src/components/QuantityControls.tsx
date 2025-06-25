'use client'

import React, { FC, useCallback } from 'react'

import { Product, ProductSize } from '@/types'
import { useCartStore } from '@/stores'
import { Keys } from '@/constants'
import { cn } from '@/utils'

interface QuantityControlsProps {
	product: Product
	size: ProductSize
	quantity: number
	className?: string
}

const QuantityControls: FC<QuantityControlsProps> = (props) => {
	const { product, size, quantity, className } = props

	const { updateCartItem, adjustItemQuantity } = useCartStore()

	const handleProductChange = useCallback(
		(product: Product, size: ProductSize, quantity: number) => {
			// Clamp quantity between 0 and 50
			const clampedQuantity = Math.min(
				Math.max(quantity, 0),
				Keys.MAX_QUANTITY_ITEM
			)

			updateCartItem(product, size, clampedQuantity)
		},
		[updateCartItem]
	)

	const handleProductDecrement = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			adjustItemQuantity(product, size, -1)
		},
		[adjustItemQuantity, product, size]
	)

	const handleProductIncrement = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation()
			adjustItemQuantity(product, size, 1)
		},
		[adjustItemQuantity, product, size]
	)

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<button
				aria-label={`Decrease ${size.name} quantity`}
				className="btn btn-circle btn-outline btn-xs"
				disabled={quantity <= 0}
				onClick={handleProductDecrement}
			>
				<svg
					className="h-3 w-3"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M20 12H4"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
					/>
				</svg>
			</button>
			<input
				aria-label={`${size.name} quantity`}
				className="input input-bordered input-xs no-controls w-10"
				id={`${size.name} quantity`}
				max={50}
				min={0}
				type="number"
				value={quantity}
				onChange={(e) =>
					handleProductChange(product, size, Number(e.target.value))
				}
			/>
			<button
				aria-label={`Increase ${size.name} quantity`}
				className="btn btn-circle btn-outline btn-xs"
				disabled={quantity >= Keys.MAX_QUANTITY_ITEM}
				onClick={handleProductIncrement}
			>
				<svg
					className="h-3 w-3"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M12 4v16m8-8H4"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
					/>
				</svg>
			</button>
		</div>
	)
}

export default QuantityControls
