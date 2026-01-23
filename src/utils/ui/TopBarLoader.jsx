import React from 'react';

const TopBarLoader = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-base-100 overflow-hidden">
            {/* The moving bar */}
            <div className="h-full bg-primary animate-[progress_1s_infinite_linear] origin-left"></div>

            {/* Add this keyframe to your index.css if not using Tailwind arbitrary values:
                @keyframes progress {
                    0% { width: 0%; margin-left: 0; }
                    50% { width: 50%; margin-left: 25%; }
                    100% { width: 100%; margin-left: 100%; }
                }
            */}
        </div>
    );
};

export default TopBarLoader;