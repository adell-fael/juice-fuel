'use client'

import { useState, useCallback } from 'react'
import { Trash2, ShoppingCart } from 'lucide-react'

import { ProductCollapseCard } from '@/components'
import { CartItem, Product, ProductSize } from '@/types'
import { products } from '@/data'

export default function Home() {
	const [cartItems, setCartItems] = useState<Record<string, CartItem>>({})

	const updateCartItem = useCallback(
		(product: Product, size: ProductSize, quantity: number) => {
			const key = `${product.id}-${size.id}`

			setCartItems((prev) => {
				if (quantity <= 0) {
					const { [key]: _, ...rest } = prev

					return rest
				}

				return {
					...prev,
					[key]: {
						product,
						size,
						quantity,
						price: size.price,
					},
				}
			})
		},
		[]
	)

	const removeProductSizeFromCart = useCallback(
		(productId: string, sizeId: string) => {
			const key = `${productId}-${sizeId}`

			setCartItems((prev) => {
				const { [key]: _, ...rest } = prev

				return rest
			})
		},
		[]
	)

	// Calculate total quantity and total price
	const { totalItems, totalPrice } = Object.values(cartItems).reduce(
		(acc, item) => {
			acc.totalItems += item.quantity
			acc.totalPrice += item.quantity * item.price

			return acc
		},
		{ totalItems: 0, totalPrice: 0 }
	)

	const removeBtn = (item: CartItem, className?: string) => (
		<div className={className}>
			<button
				aria-label={`Remove ${item.product.name} from cart`}
				className="btn btn-ghost btn-sm text-error hover:bg-error hover:text-error-content"
				onClick={() => removeProductSizeFromCart(item.product.id, item.size.id)}
			>
				<Trash2 className="h-4 w-4" />
			</button>
		</div>
	)

	return (
		<div>
			<div className="mx-auto w-full max-w-2xl p-4">
				{/* Header Card */}
				<div className="card from-primary bg-primary text-primary-content mb-6 shadow-xl">
					<div className="card-body">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<ShoppingCart className="h-8 w-8" />
								<div>
									<h2 className="card-title text-primary-content text-2xl font-bold lg:text-3xl">
										${totalPrice.toFixed(2)}
									</h2>
									<div className="text-primary-content/90 flex items-center gap-2 text-sm">
										{totalItems} item{totalItems !== 1 ? 's' : ''}
									</div>
								</div>
							</div>
							<div className="hidden sm:block">
								<div className="stat-value text-base-100 text-right">Total</div>
							</div>
						</div>
					</div>
				</div>

				{/* Cart Items */}
				<div className="space-y-4">
					{Object.values(cartItems).map((item, index) => (
						<div
							key={index}
							className="card bg-base-100 relative shadow-lg transition-shadow duration-300 hover:shadow-xl"
						>
							<div className="card-body p-4 sm:p-6">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
									{/* Product Image Placeholder */}

									<div className="flex items-center justify-between gap-2">
										{item.product.image ? (
											<div className="avatar placeholder">
												<img alt={item.product.name} src={item.product.image} />
											</div>
										) : (
											<div className="avatar placeholder">
												<div className="text-neutral-content h-12 w-12 rounded-full bg-gray-400 sm:h-16 sm:w-16" />
											</div>
										)}

										{/* Remove Button  */}
										{removeBtn(item, 'sm:hidden')}
									</div>

									{/* Product Details */}
									<div className="flex-1 space-y-2">
										<div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
											<div>
												<h3 className="text-base-content text-lg font-bold">
													{item.product.name}
												</h3>
												<div className="mt-1 flex flex-wrap gap-2">
													<div className="badge badge-outline badge-sm">
														Size: {item.size.name}
													</div>
													<div className="badge badge-primary badge-sm">
														Qty: {item.quantity}
													</div>
												</div>
											</div>

											{/* Remove Button  */}
											{removeBtn(item, 'hidden sm:block')}
										</div>

										{/* Pricing Details */}
										<div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
											<div>
												<span className="text-base-content/70">Unit Price</span>
												<div className="text-base-content font-semibold">
													${item.price.toFixed(2)}
												</div>
											</div>
											<div>
												<span className="text-base-content/70">Subtotal</span>
												<div className="text-primary text-lg font-bold">
													${(item.quantity * item.price).toFixed(2)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				{/* Empty Cart State */}
				{Object.keys(cartItems).length === 0 && (
					<div className="card bg-base-100 shadow-lg">
						<div className="card-body py-12 text-center">
							<ShoppingCart className="text-base-content/30 mx-auto mb-4 h-16 w-16" />
							<h3 className="text-base-content/70 mb-2 text-xl font-semibold">
								Your cart is empty
							</h3>
							<p className="text-base-content/50">
								Add some items to get started!
							</p>
						</div>
					</div>
				)}

				{/* Checkout Actions */}
				{Object.keys(cartItems).length > 0 && (
					<button className="btn btn-primary mt-4 w-full shadow-lg">
						Proceed to Checkout
					</button>
				)}
			</div>

			<section className="px-2">
				{products.map((product) => (
					<ProductCollapseCard
						key={product.id}
						cartItems={cartItems}
						product={product}
						onUpdateCartItem={updateCartItem}
					/>
				))}
			</section>
		</div>
	)
}
