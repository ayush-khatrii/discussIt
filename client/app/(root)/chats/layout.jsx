import React from 'react'
import { poppins } from '@/fonts/font';

const Layout = ({ children }) => {
	return (
		<>
			<main className={`${poppins.className}`}>
				<section className=''>
					{children}
				</section>
			</main>
		</>
	)
}

export default Layout