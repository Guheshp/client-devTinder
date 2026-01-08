import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import Logo from './header/Logo'
import SearchBar from './header/SearchBar'
import ProfileMenu from './header/ProfileMenu'
import AuthButtons from './header/AuthButtons'

const Navbar = () => {
    const userData = useSelector((store) => store.user.user)
    const [isScrolled, setIsScrolled] = useState(false)

    // Scroll Effect
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div
            className={`navbar fixed top-0 z-50 w-full transition-all duration-300 border-b ${isScrolled
                ? 'bg-base-100/90 backdrop-blur-lg border-base-200 shadow-sm'
                : 'bg-base-100 border-base-200'
                }`}
        >
            {/* --- LEFT: LOGO --- */}
            <Logo userData={userData} />

            {/* --- CENTER: SEARCH BAR (Only for logged-in users) --- */}
            {userData && <SearchBar userData={userData} />}

            {/* --- RIGHT: ACTIONS & PROFILE --- */}
            <div className={`flex-none gap-2 sm:gap-4 ${!userData ? 'ml-auto' : ''}`}>
                <ThemeToggle />
                {userData ? <ProfileMenu userData={userData} /> : <AuthButtons />}
            </div>
        </div>
    )
}

export default Navbar