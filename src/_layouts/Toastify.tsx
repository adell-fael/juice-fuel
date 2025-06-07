'use client'

import { Slide, ToastContainer } from 'react-toastify'

const Toastify = () => {
	return (
		<ToastContainer
			draggable
			pauseOnFocusLoss
			pauseOnHover
			autoClose={5000}
			hideProgressBar={true}
			// newestOnTop={true}
			position="top-center"
			// rtl={isRTL}
			// theme="light"
			transition={Slide}
		/>
	)
}

export default Toastify
