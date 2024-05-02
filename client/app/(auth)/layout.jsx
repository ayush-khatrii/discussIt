import { poppins } from '@/fonts/font'
import React from 'react'

const Layout = ({ children }) => {
    return (
        <main className={`${poppins.className}`}>
            {children}
        </main>
    )
}

export default Layout