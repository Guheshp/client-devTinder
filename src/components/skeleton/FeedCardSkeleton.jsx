import React from 'react'

const FeedCardSkeleton = () => {
    return (
        <div className="card w-full bg-base-100 shadow-xl h-[500px] border border-base-200 overflow-hidden relative">
            <div className="h-1/2 w-full bg-base-300 animate-pulse flex items-center justify-center">
                <div className="w-24 h-24 bg-base-200 rounded-full"></div>
            </div>
            <div className="card-body items-center text-center pt-8">
                <div className="h-6 w-3/5 bg-base-300 rounded animate-pulse mb-4"></div>
                <div className="h-4 w-full bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-4/5 bg-base-300 rounded animate-pulse mb-2"></div>
                <div className="h-4 w-3/5 bg-base-300 rounded animate-pulse mb-6"></div>
                <div className="flex gap-6 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-base-300 animate-pulse"></div>
                    <div className="w-12 h-12 rounded-full bg-base-300 animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}

export default FeedCardSkeleton
