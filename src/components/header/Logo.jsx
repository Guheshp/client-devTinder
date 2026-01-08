import React from 'react'
import { Link } from 'react-router-dom'

const Logo = ({ userData }) => (
    <div className="flex-none">
        <Link
            to={userData ? "/feed" : "/"}
            className="btn btn-ghost text-2xl font-black tracking-tight"
        >
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dev-Tinder
            </span>
            <span className="text-xl">🚀</span>
        </Link>
    </div>
)
export default Logo