'use client'

import { FC, useCallback } from 'react'

import { cn } from '@/utils'
import { CartItem, Product, ProductSize } from '@/types'

interface ProductCollapseCardProps {
	product: Product
	cartItems: Record<string, CartItem>
	onUpdateCartItem: (
		product: Product,
		size: ProductSize,
		quantity: number
	) => void
}

const ProductCollapseCard: FC<ProductCollapseCardProps> = ({
	product,
	cartItems,
	onUpdateCartItem,
}) => {
	const adjustQuantity = useCallback(
		(size: ProductSize, delta: number) => {
			const key = `${product.id}-${size.id}`
			const currentQuantity = cartItems[key]?.quantity || 0
			const newQuantity = Math.max(0, currentQuantity + delta)

			onUpdateCartItem(product, size, newQuantity)
		},
		[product, cartItems, onUpdateCartItem]
	)

	const toggleSizeSelection = useCallback(
		(size: ProductSize, checked: boolean) => {
			const quantity = checked ? 1 : 0

			onUpdateCartItem(product, size, quantity)
		},
		[product, onUpdateCartItem]
	)

	const handleProductChange = useCallback(
		(product: Product, size: ProductSize, quantity: number) => {
			onUpdateCartItem(product, size, quantity)
		},
		[onUpdateCartItem]
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
						const key = `${product.id}-${size.id}`
						const cartItem = cartItems[key]
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
										id={key + 'checkbox'}
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
										htmlFor={key + 'checkbox'}
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
											<>
												<button
													aria-label={`Decrease ${size.name} quantity`}
													className="btn btn-circle btn-outline btn-xs"
													disabled={quantity <= 0}
													onClick={(e) => {
														e.stopPropagation()
														adjustQuantity(size, -1)
													}}
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
													// readOnly
													aria-label={`${size.name} quantity`}
													className="input input-bordered input-xs w-10 text-center"
													value={quantity}
													onChange={(e) =>
														handleProductChange(
															product,
															size,
															Number(e.target.value)
														)
													}
												/>

												<button
													aria-label={`Increase ${size.name} quantity`}
													className="btn btn-circle btn-outline btn-xs"
													onClick={(e) => {
														e.stopPropagation()
														adjustQuantity(size, 1)
													}}
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
											</>
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
