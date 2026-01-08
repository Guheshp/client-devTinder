import React from 'react'
import { Link } from 'react-router-dom'

const AuthButtons = () => (
    <div className="flex gap-2 mr-2">
        <Link
            to="/login"
            className="btn btn-primary btn-sm px-6 rounded-full text-white shadow-lg shadow-primary/30"
        >
            Authenticate
        </Link>
    </div>
)

export default AuthButtons
