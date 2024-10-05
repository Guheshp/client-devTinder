import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const Body = () => {
    return (
        <div>
            <Navbar />
            <h2>Hello world!</h2>
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
