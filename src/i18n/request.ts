import { getRequestConfig } from 'next-intl/server'

import { getUserLocale } from '@/services/locale'

import { defaultLocale } from './config'

export default getRequestConfig(async () => {
	// getUserLocale now handles both cookies and header parsing with validation
	const locale = (await getUserLocale()) || defaultLocale

	// console.log('🚀 ~ getRequestConfig ~ locale:', locale)

	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
	}
})
