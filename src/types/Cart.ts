import { Product, ProductSize } from './Product'

export interface CartItem {
	product: Product // full product
	size: ProductSize // selected size
	quantity: number
	price: number // unit price (redundant but useful for display/calculation)
}

export interface CartState {
	cartItems: CartItem[]
	totalItems: number
	totalPrice: number

	updateCartItem: (
		product: Product,
		size: ProductSize,
		quantity: number
	) => void
	removeProductSizeFromCart: (productId: string, sizeId: string) => void
	adjustItemQuantity: (
		product: Product,
		size: ProductSize,
		delta: number
	) => void
}
