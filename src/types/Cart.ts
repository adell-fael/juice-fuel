import { Product, ProductSize } from './Product'

export interface CartItem {
	product: Product // full product
	size: ProductSize // selected size
	quantity: number
	price: number // unit price (redundant but useful for display/calculation)
}
