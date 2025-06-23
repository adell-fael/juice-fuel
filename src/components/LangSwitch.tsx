'use client'

import { FC, useTransition } from 'react'
import { useLocale } from 'next-intl'

import { setUserLocale } from '@/services/locale'
import { LangCode, Locale } from '@/i18n/config'

import Loader from './Loader'

const LangSwitch: FC = () => {
	const currentLocale = useLocale() as Locale
	const [isPending, startTransition] = useTransition()

	const handleLanguageChange = (locale: Locale) => {
		startTransition(() => {
			setUserLocale(locale)
		})
	}

	const isArabic = currentLocale === LangCode.AR

	const globeSvg = (
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
	)

	return (
		<>
			{isPending && (
				<div className="fixed inset-0 z-[9999] h-full w-full cursor-progress bg-transparent" />
			)}

			<label className="swap swap-rotate btn">
				<input
					checked={isArabic}
					type="checkbox"
					onChange={(e) => {
						const newLocale = e.target.checked ? LangCode.AR : LangCode.EN

						handleLanguageChange(newLocale)
					}}
				/>

				{isPending ? (
					<Loader />
				) : (
					<>
						<div className="swap-on flex items-center gap-1">
							{LangCode.AR.toUpperCase()} {globeSvg}
						</div>
						<div className="swap-off flex items-center gap-1">
							{globeSvg} {LangCode.EN.toUpperCase()}
						</div>
					</>
				)}
			</label>
		</>
	)
}

export default LangSwitch
