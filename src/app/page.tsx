'use client'

import { ProductCollapseCard } from '@/components'
import { products } from '@/data'

export default function Home() {
	return (
		<section className="px-2">
			{products.map((product) => (
				<ProductCollapseCard key={product.id} product={product} />
			))}
		</section>
	)
}
