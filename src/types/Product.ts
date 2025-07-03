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
	category: string
	bestSelling: boolean
}
