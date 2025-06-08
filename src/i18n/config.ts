/**
 * Enumeration of supported language codes.
 *
 * EN = 'en'
 *
 * AR = 'ar'
 *
 * @enum
 */
export enum LangCode {
	/**
	 * English language code.
	 */
	EN = 'en',

	/**
	 * Arabic language code.
	 */
	AR = 'ar',
}

/**
 * Array of supported locales.
 *
 * @remarks
 * This array is used for iteration and validation of supported locales.
 */
export const locales = [LangCode.EN, LangCode.AR] as const

/**
 * Type representing the supported locale codes.
 *
 * @remarks
 * This type is derived from the `locales` array.
 */
export type Locale = (typeof locales)[number]

/**
 * The default locale used in the application.
 *
 * @defaultValue 'en'
 */
export const defaultLocale: Locale = LangCode.EN
