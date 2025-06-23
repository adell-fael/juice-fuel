import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem, CartState } from '@/types'

const calculateCartQuantity = (items: CartItem[]) =>
	items.reduce((total, item) => total + item.quantity, 0)

const calculateCartPrice = (items: CartItem[]) =>
	items.reduce((total, item) => total + item.quantity * item.price, 0)

const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			cartItems: [],
			totalItems: 0,
			totalPrice: 0,

			updateCartItem: (product, size, quantity) => {
				const current = get().cartItems
				const existingIndex = current.findIndex(
					(item) => item.product.id === product.id && item.size.id === size.id
				)

				const updatedItems = [...current]

				if (quantity <= 0) {
					if (existingIndex !== -1) {
						updatedItems.splice(existingIndex, 1)
					}
				} else {
					const newItem: CartItem = {
						product,
						size,
						quantity,
						price: size.price,
					}

					if (existingIndex !== -1) {
						updatedItems[existingIndex] = newItem
					} else {
						updatedItems.push(newItem)
					}
				}

				set({
					cartItems: updatedItems,
					totalItems: calculateCartQuantity(updatedItems),
					totalPrice: calculateCartPrice(updatedItems),
				})
			},

			removeProductSizeFromCart: (productId, sizeId) => {
				const updatedItems = get().cartItems.filter(
					(item) => item.product.id !== productId || item.size.id !== sizeId
				)

				set({
					cartItems: updatedItems,
					totalItems: calculateCartQuantity(updatedItems),
					totalPrice: calculateCartPrice(updatedItems),
				})
			},

			adjustItemQuantity: (product, size, delta) => {
				const item = get().cartItems.find(
					(item) => item.product.id === product.id && item.size.id === size.id
				)

				const currentQuantity = item?.quantity || 0
				const newQuantity = Math.max(0, currentQuantity + delta)

				get().updateCartItem(product, size, newQuantity)
			},
		}),
		{
			name: 'cart-store',
		}
	)
)

export default useCartStore
