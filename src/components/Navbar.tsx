'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

import { LangSwitch, CartDrawer } from '.'

const Navbar = () => {
	const t = useTranslations('header')

	return (
		<nav className="navbar bg-base-100 text-base-content shadow-sm">
			<div className="navbar-start">
				<div className="dropdown">
					<div className="btn btn-ghost lg:hidden" role="button" tabIndex={0}>
						<svg
							className="h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							{' '}
							<path
								d="M4 6h16M4 12h8m-8 6h16"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
							/>{' '}
						</svg>
					</div>
					<ul
						className="menu menu-sm dropdown-content rounded-box mt-3 w-52 p-2 shadow"
						tabIndex={0}
					>
						<li>
							<a>{t('nav.home')}</a>
						</li>
						<li>
							<a>Parent</a>
							<ul className="p-2">
								<li>
									<a>Submenu 1</a>
								</li>
								<li>
									<a>Submenu 2</a>
								</li>
							</ul>
						</li>
						<li>
							<a>Item 3</a>
						</li>
					</ul>
				</div>
				<a className="btn btn-ghost text-xl">Logo</a>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">
					<li>
						<a>{t('nav.home')}</a>
					</li>
					<li>
						<details>
							<summary>Parent</summary>
							<ul className="z-10 p-2">
								<li>
									<a>Submenu 1</a>
								</li>
								<li>
									<a>Submenu 2</a>
								</li>
							</ul>
						</details>
					</li>
					<li>
						<a>Item 3</a>
					</li>
				</ul>
			</div>
			<div className="navbar-end gap-2">
				<div>
					<CartDrawer />
				</div>

				<LangSwitch />
			</div>
		</nav>
	)
}

export default Navbar
