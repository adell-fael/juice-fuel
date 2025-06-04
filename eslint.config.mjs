import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import prettierPlugin from 'eslint-plugin-prettier'
import nextPlugin from '@next/eslint-plugin-next'
import unusedImports from 'eslint-plugin-unused-imports'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			'react-hooks': reactHooksPlugin,
			prettier: prettierPlugin,
			'unused-imports': unusedImports,
			'@next/next': nextPlugin,
		},
		rules: {
			// '@typescript-eslint/no-explicit-any': 'off',
			'prettier/prettier': 'warn',
			'no-unused-vars': 'off',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'unused-imports/no-unused-imports': 'error',
			'@next/next/no-img-element': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'import/order': [
				'warn',
				{
					groups: [
						'type',
						'builtin',
						'object',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					pathGroups: [
						{
							pattern: '~/**',
							group: 'external',
							position: 'after',
						},
					],
					'newlines-between': 'always',
				},
			],
			'react/jsx-sort-props': [
				'warn',
				{
					callbacksLast: true,
					shorthandFirst: true,
					noSortAlphabetically: false,
					reservedFirst: true,
				},
			],
			'padding-line-between-statements': [
				'warn',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
				{
					blankLine: 'any',
					prev: ['const', 'let', 'var'],
					next: ['const', 'let', 'var'],
				},
			],
		},
	},
]

export default eslintConfig
