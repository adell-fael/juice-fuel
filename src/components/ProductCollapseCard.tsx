'use client'

import { FC, useCallback } from 'react'

import { cn } from '@/utils'
import { Product, ProductSize } from '@/types'
import { useCartStore } from '@/stores'

import { QuantityControls } from '.'

interface ProductCollapseCardProps {
	product: Product
}

const ProductCollapseCard: FC<ProductCollapseCardProps> = ({ product }) => {
	const { cartItems, updateCartItem } = useCartStore()

	const toggleSizeSelection = useCallback(
		(size: ProductSize, checked: boolean) => {
			const quantity = checked ? 1 : 0

			updateCartItem(product, size, quantity)
		},
		[product, updateCartItem]
	)

	return (
		<div className="bg-base-200 collapse-arrow collapse my-2">
			<input name="toggle-collapse" type="checkbox" />
			{/* Product Header */}
			<div className="collapse-title font-medium">
				<div className="flex gap-2 px-2">
					<div className="aspect-square size-16 bg-gray-300" />

					<div>
						<span className="text-sm md:text-lg">{product.name}</span>
						<div className="text-xs font-light md:text-base">
							{product.description}
						</div>
					</div>
				</div>
			</div>

			{/* Expandable Content */}
			<div className="collapse-content text-sm md:text-base">
				{product.sizes
					.filter((s) => s.available)
					.map((size) => {
						const cartItem = cartItems.find(
							(item) =>
								item.product.id === product.id && item.size.id === size.id
						)

						const isSelected = Boolean(cartItem && cartItem.quantity > 0)
						const quantity = cartItem?.quantity || 0

						return (
							<div
								key={size.id}
								className={cn(
									'my-1 flex items-center gap-3 rounded-lg px-2 py-2 transition-colors',
									!size.available && 'bg-base-200 opacity-50',
									size.available && !isSelected && 'hover:bg-base-100',
									size.available && isSelected && 'bg-base-300'
								)}
							>
								<div className="form-control">
									<input
										checked={isSelected}
										className="checkbox checkbox-primary"
										disabled={!size.available}
										id={`${product.id}-${size.id}-checkbox`}
										type="checkbox"
										onChange={(e) => {
											e.stopPropagation()
											toggleSizeSelection(size, e.target.checked)
										}}
									/>
								</div>

								<div className="flex flex-1 items-center justify-between gap-1">
									<label
										className={`font-medium ${!size.available ? 'text-base-content text-opacity-40' : ''}`}
										htmlFor={`${product.id}-${size.id}-checkbox`}
									>
										{size.name}
										{!size.available && (
											<span className="badge badge-accent badge-sm ml-2 text-xs">
												Not Available
											</span>
										)}
									</label>

									<div className="flex items-center gap-2">
										{size.available && (
											<QuantityControls
												product={product}
												quantity={quantity}
												size={size}
											/>
										)}

										<span className="min-w-12 text-center font-bold">
											${size.price.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default ProductCollapseCard
