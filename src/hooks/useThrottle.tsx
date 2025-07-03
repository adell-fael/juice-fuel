'use client'

import { useEffect, useRef, useState } from 'react'

// Define the function type with generics
const useThrottle = <T,>(value: T, intervalMs: number): T => {
	const [throttledValue, setThrottledValue] = useState<T>(value)
	const lastExecuted = useRef<number>(Date.now())

	useEffect(() => {
		const now = Date.now()

		if (now - lastExecuted.current >= intervalMs) {
			setThrottledValue(value)
			lastExecuted.current = now
		} else {
			const timeout = setTimeout(
				() => {
					setThrottledValue(value)
					lastExecuted.current = Date.now()
				},
				intervalMs - (now - lastExecuted.current)
			)

			return () => clearTimeout(timeout)
		}
	}, [value, intervalMs])

	return throttledValue
}

export default useThrottle
