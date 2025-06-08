'use client'

type IProps = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function GlobalError({ error, reset }: IProps) {
	return (
		// global-error must include html and body tags
		<html lang="en">
			<body>
				<div className="flex min-h-screen flex-col items-center justify-center bg-red-50 p-4">
					<div className="text-center">
						<h2 className="mb-4 text-2xl font-bold text-red-600">
							Something went wrong!
						</h2>
						<p className="mb-6 text-gray-700">
							{error.message || 'An unexpected error occurred'}
						</p>
						<button className="btn btn-accent" onClick={reset}>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	)
}
