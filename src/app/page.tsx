'use client'

import { useState } from 'react'

import { CategoryFilter, ProductCollapseCard } from '@/components'
import { products } from '@/data'

export default function Home() {
	const categories = Array.from(new Set(products.map((x) => x.category)))

	const [selectedCategory, setSelectedCategory] = useState<string[]>([])

	// Filter menu data based on selected category
	const filteredDrinks =
		selectedCategory.length > 0
			? products.filter((item) => selectedCategory.includes(item.category))
			: products

	const handleFilterChange = (categoryKeys: string[]) => {
		setSelectedCategory(categoryKeys)
	}

	return (
		<section className="px-2">
			<CategoryFilter
				categories={categories}
				selectedCategories={selectedCategory}
				onFilterChange={handleFilterChange}
			/>
			{filteredDrinks.map((product) => (
				<ProductCollapseCard key={product.id} product={product} />
			))}
		</section>
	)
}
