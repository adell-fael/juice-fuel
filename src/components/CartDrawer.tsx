'use client'
import { ShoppingCart, Trash2, X } from 'lucide-react'
import React from 'react'

import { useCartStore } from '@/stores'

const CartDrawer = () => {
	const { cartItems, removeProductSizeFromCart, totalItems, totalPrice } =
		useCartStore()

	return (
		<div className="drawer drawer-end">
			<input className="drawer-toggle" id="cart-drawer" type="checkbox" />
			<div className="drawer-content">
				{/* Cart Button */}
				<label className="drawer-button btn relative" htmlFor="cart-drawer">
					<ShoppingCart className="h-5 w-5" />
					{totalItems > 0 && (
						<div className="badge badge-secondary badge-sm absolute -top-2 -right-2">
							{totalItems}
						</div>
					)}
				</label>
			</div>
			<div className="drawer-side z-50">
				<label
					aria-label="close sidebar"
					className="drawer-overlay"
					htmlFor="cart-drawer"
				/>
				<div className="bg-base-100 flex min-h-full w-full flex-col md:max-w-sm">
					{/* Header */}
					<div className="bg-base-300 text-base-content flex items-center justify-between p-4">
						<div className="flex items-center gap-3">
							<div>
								<h2 className="text-xl font-bold">
									${totalPrice.toFixed(2)} Total
								</h2>
								<p className="text-sm opacity-90">
									{totalItems} item{totalItems !== 1 ? 's' : ''}
								</p>
							</div>
						</div>
						<label className="btn btn-sm btn-circle" htmlFor="cart-drawer">
							<X className="h-4 w-4" />
						</label>
					</div>

					{/* Cart Items - Scrollable */}
					<div className="flex-1 overflow-y-auto p-4">
						{Object.keys(cartItems).length === 0 ? (
							/* Empty Cart State */
							<div className="flex h-full flex-col items-center justify-center py-8 text-center">
								<ShoppingCart className="text-base-content/30 mb-4 h-16 w-16" />
								<h3 className="text-base-content/70 mb-2 text-lg font-semibold">
									Your cart is empty
								</h3>
								<p className="text-base-content/50 text-sm">
									Add some items to get started!
								</p>
							</div>
						) : (
							/* Cart Items */
							<div className="space-y-3">
								{Object.values(cartItems).map((item, index) => (
									<div
										key={index}
										className="bg-base-200 relative rounded-lg p-3"
									>
										<div className="flex gap-3">
											{/* Product Image */}
											<div className="flex-shrink-0">
												{item.product.image ? (
													<img
														alt={item.product.name}
														className="h-12 w-12 rounded-full object-cover"
														src={item.product.image || '/placeholder.svg'}
													/>
												) : (
													<div className="bg-base-300 flex h-12 w-12 items-center justify-center rounded-full">
														<span className="text-base-content/50 text-xs font-medium">
															{item.product.name.charAt(0)}
														</span>
													</div>
												)}
											</div>

											{/* Product Details */}
											<div className="min-w-0 flex-1 pr-4">
												<div className="flex items-center justify-between gap-1">
													<h3 className="text-base-content truncate font-semibold">
														{item.product.name}
													</h3>

													<button
														aria-label={`Remove ${item.product.name} from cart`}
														className="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content"
														onClick={() =>
															removeProductSizeFromCart(
																item.product.id,
																item.size.id
															)
														}
													>
														<Trash2 className="size-3" />
													</button>
												</div>

												{/* Size and Quantity */}
												<div className="mt-1 flex flex-wrap gap-2">
													<span className="badge badge-outline badge-xs">
														Size: {item.size.name}
													</span>
													<span className="badge badge-primary badge-xs">
														Qty: {item.quantity}
													</span>
												</div>

												{/* Pricing */}
												<div className="mt-2 flex flex-wrap items-center justify-between">
													<div className="text-base-content/70 text-xs">
														Unit Price: ${item.price.toFixed(2)}
													</div>
													<div className="text-primary font-bold">
														${(item.quantity * item.price).toFixed(2)}
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>

					{/* Footer - Checkout Button */}
					{Object.keys(cartItems).length > 0 && (
						<div className="border-base-300 border-t p-4">
							<button className="btn btn-primary w-full">
								Proceed to Checkout
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default CartDrawer
