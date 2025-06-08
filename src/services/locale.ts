'use server'

import { cookies, headers } from 'next/headers'

import { defaultLocale, Locale, locales } from '@/i18n/config'
import { COOKIE_LOCALE } from '@/constants'

export async function getUserLocale() {
	// First check cookies
	const cookieValue = (await cookies()).get(COOKIE_LOCALE)?.value

	if (cookieValue && locales.includes(cookieValue as Locale)) {
		return cookieValue as Locale
	}

	// Fallback to Accept-Language header
	const acceptLanguage = (await headers()).get('accept-language')

	if (acceptLanguage) {
		// Parse the Accept-Language header properly
		const languages = acceptLanguage
			.split(',')
			.map((lang) => lang.split(';')[0].trim().toLowerCase())

		// Find the first supported locale
		for (const lang of languages) {
			// Check exact match first (e.g., 'en', 'ar')
			if (locales.includes(lang as Locale)) {
				return lang as Locale
			}
			// Check language prefix (e.g., 'en-US' -> 'en')
			const langPrefix = lang.split('-')[0]

			if (locales.includes(langPrefix as Locale)) {
				return langPrefix as Locale
			}
		}
	}

	return defaultLocale
}

export async function setUserLocale(locale: Locale) {
	;(await cookies()).set(COOKIE_LOCALE, locale)
}
