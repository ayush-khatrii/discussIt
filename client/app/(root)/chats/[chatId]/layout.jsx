import Sidebar from '@/components/Sidebar'
import React from 'react'
import { poppins } from '@/fonts/font';

const Layout = ({ children }) => {
    return (
        <main className={`${poppins.className}`}>
            <Sidebar />
            <section className=''>
                {children}
            </section>
        </main>
    )
}

export default Layout