import Sidebar from '@/components/Sidebar'
import React from 'react'
import { poppins } from '@/fonts/font';

const Layout = ({ children }) => {
	return (
		<>
			<Sidebar position={`top-4`} />
			<main className={`${poppins.className}`}>
				<section className=''>
					{children}
				</section>
			</main>
		</>
	)
}

export default Layout