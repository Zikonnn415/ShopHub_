import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React from 'react'
import { Outlet } from 'react-router'

const AppLayout = ({children}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default AppLayout