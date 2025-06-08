import { locales } from '@/i18n/config'

import messages from './src/i18n/messages/en.json'

declare module 'next-intl' {
	interface AppConfig {
		Locale: (typeof locales)[number]
		Messages: typeof messages
	}
}
