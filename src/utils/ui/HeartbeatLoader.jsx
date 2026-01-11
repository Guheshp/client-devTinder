import React from 'react';
import { FaCode } from "react-icons/fa"; // Or use your App Logo

const HeartbeatLoader = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-base-100">

            {/* Centered Logo with Ripple Effect */}
            <div className="relative flex items-center justify-center">
                {/* The Ripple/Ping Animation */}
                <div className="absolute w-24 h-24 bg-primary/30 rounded-full animate-ping opacity-75"></div>

                {/* The Static Logo Circle */}
                <div className="relative w-16 h-16 bg-gradient-to-tr from-primary to-secondary rounded-full flex items-center justify-center shadow-xl z-10">
                    <FaCode className="text-white text-3xl" />
                </div>
            </div>

            {/* Subtle Text */}
            <p className="mt-8 text-gray-400 font-medium text-xs tracking-[0.2em] uppercase animate-pulse">
                Dev Tinder
            </p>
        </div>
    );
};

export default HeartbeatLoader;