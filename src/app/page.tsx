'use client'

import { useState, useCallback } from 'react'

import { ProductCard } from '@/components'
export interface ProductSize {
	id: string
	name: string
	price: number
	available: boolean
}

export interface Product {
	id: string
	name: string
	image: string
	sizes: ProductSize[]
	description: string
}

export interface CartItem {
	productId: string
	sizeId: string
	quantity: number
	price: number
}

const products: Product[] = [
	{
		id: '1',
		name: 'Orange Juice',
		description: 'freshly fucked up squeezed',
		image: '/placeholder.svg?height=80&width=80',
		sizes: [
			{ id: 'small', name: 'Small', price: 1.5, available: true },
			{ id: 'medium', name: 'Medium', price: 2.0, available: true },
			{ id: 'large', name: 'Large', price: 3.0, available: true },
			{ id: 'bottle', name: 'Bottle', price: 5.0, available: false },
		],
	},
	{
		id: '2',
		name: 'Orange Smoothie',
		description: 'Made with orange and milk',
		image: '/placeholder.svg?height=80&width=80',
		sizes: [
			{ id: 'small', name: 'Small', price: 2.0, available: true },
			{ id: 'medium', name: 'Medium', price: 3.0, available: true },
			{ id: 'large', name: 'Large', price: 4.0, available: true },
			{ id: 'bottle', name: 'Bottle', price: 6.0, available: true },
		],
	},
]

export default function Home() {
	const [cartItems, setCartItems] = useState<Record<string, CartItem>>({})

	const updateCartItem = useCallback(
		(productId: string, size: ProductSize, quantity: number) => {
			const key = `${productId}-${size.id}`

			setCartItems((prev) => {
				if (quantity <= 0) {
					const { [key]: removed, ...rest } = prev

					return rest
				}

				return {
					...prev,
					[key]: {
						productId,
						sizeId: size.id,
						quantity,
						price: size.price,
					},
				}
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

	return (
		<div>
			{products.map((product) => (
				<ProductCard
					key={product.id}
					cartItems={cartItems}
					product={product}
					onUpdateCartItem={updateCartItem}
				/>
			))}

			{/* Checkout Section */}
			<div className="fixed right-4 bottom-4 flex items-center justify-between gap-4 rounded-xl border bg-white p-4 shadow-lg">
				<div>
					<div className="text-sm font-semibold">
						{totalItems} item{totalItems !== 1 && 's'}
					</div>
					<div className="text-xl font-bold text-gray-800">
						Total: ${totalPrice.toFixed(2)}
					</div>
				</div>
				<button
					className="btn btn-sm rounded-full bg-black px-4 text-white hover:bg-gray-800 disabled:opacity-50"
					disabled={totalItems === 0}
				>
					Checkout
				</button>
			</div>
		</div>
	)
}
