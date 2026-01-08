import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsEmojiDizzy, BsArrowLeft, BsHouseDoor } from 'react-icons/bs'

const Error404 = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 animate-in fade-in zoom-in duration-300">

            {/* Big Background Number */}
            <div className="text-9xl font-black text-base-300 select-none">404</div>

            {/* Icon Overlay */}
            <div className="-mt-16 mb-6 bg-base-100 p-6 rounded-full shadow-xl border-8 border-base-200">
                <BsEmojiDizzy className="text-6xl text-error animate-pulse" />
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-base-content mb-3">
                Page Not Found
            </h1>

            <p className="text-gray-500 max-w-md mb-8 text-lg leading-relaxed">
                Oops! It looks like you've ventured into <span className="font-mono bg-base-200 px-1 rounded text-error">undefined</span> territory.
                This route doesn't exist in our stack.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline gap-2 rounded-full px-6"
                >
                    <BsArrowLeft /> Go Back
                </button>

                <Link to="/" className="btn btn-primary gap-2 rounded-full px-8 shadow-lg shadow-primary/30 hover:scale-105 transition-transform text-white">
                    <BsHouseDoor /> Home
                </Link>
            </div>
        </div>
    )
}

export default Error404