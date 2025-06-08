'use client'

import { FC, useTransition } from 'react'
import { useLocale } from 'next-intl'

import { setUserLocale } from '@/services/locale'
import { LangCode, Locale } from '@/i18n/config'

/**
 * Language switcher component allowing users to toggle between English and Arabic.
 *
 * @component
 */
const LangSwitch: FC = () => {
	const currentLocale = useLocale()
	const [isPending, startTransition] = useTransition()

	/**
	 * Handles the language selection.
	 *
	 * @param {Locale} locale - The selected locale.
	 */
	const handleLanguageChange = (locale: Locale) => {
		startTransition(() => {
			setUserLocale(locale)
		})
	}

	const languages = [
		{ code: LangCode.EN, label: 'English', nativeLabel: 'English' },
		{ code: LangCode.AR, label: 'العربية', nativeLabel: 'العربية' },
	]

	return (
		<div className="dropdown dropdown-start p-2">
			<div
				aria-label="Language"
				className="btn btn-sm btn-ghost gap-1 px-1.5 text-[.5625rem] font-bold"
				role="button"
				tabIndex={0}
				title="Change Language"
			>
				<svg
					className="text-base-content/70 size-6"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12 21a9 9 0 1 0 0-18m0 18a9 9 0 1 1 0-18m0 18c2.761 0 3.941-5.163 3.941-9S14.761 3 12 3m0 18c-2.761 0-3.941-5.163-3.941-9S9.239 3 12 3M3.5 9h17m-17 6h17"
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					/>
				</svg>
				<svg
					className="mt-px hidden size-2 fill-current opacity-60 sm:inline-block"
					viewBox="0 0 2048 2048"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z" />
				</svg>
			</div>

			<div
				className="dropdown-content bg-base-200 text-base-content rounded-box top-px mt-14 w-48 border border-white/5 shadow-2xl outline-1 outline-black/5"
				tabIndex={0}
			>
				<ul className="menu menu-sm w-full">
					{languages.map((lang) => (
						<li key={lang.code}>
							<button
								className={currentLocale === lang.code ? 'menu-active' : ''}
								disabled={isPending}
								onClick={() => handleLanguageChange(lang.code)}
							>
								<span className="pe-4 font-mono text-[.5625rem] font-bold tracking-[0.09375rem] opacity-40">
									{lang.code.toUpperCase()}
								</span>
								<span className="font-[sans-serif]">{lang.nativeLabel}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default LangSwitch
