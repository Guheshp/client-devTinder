import React from 'react'

const SideProfileSkeleton = () => {
    return (
        <div className="w-full card bg-base-100 shadow-xl p-4 border border-base-200">
            <div className="flex flex-col items-center gap-3 animate-pulse">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gray-200"></div>
                {/* Name & Email */}
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                {/* Skills */}
                <div className="flex gap-2 mt-2">
                    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                    <div className="h-5 w-12 bg-gray-200 rounded-full"></div>
                </div>
            </div>
            {/* Menu Items */}
            <div className="mt-6 space-y-3">
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
                <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            </div>
        </div>
    )
}

export default SideProfileSkeleton