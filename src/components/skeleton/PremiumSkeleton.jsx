import React from 'react'

const PremiumSkeleton = () => {
    return (
        <div className="py-12 px-4 mt-14 max-w-5xl mx-auto">
            {/* Header Skeleton */}
            <div className="text-center mb-12 space-y-4">
                <div className="h-10 w-64 bg-base-300 rounded-lg animate-pulse mx-auto"></div>
                <div className="h-4 w-96 bg-base-300 rounded-lg animate-pulse mx-auto"></div>
            </div>

            {/* Cards Skeleton Grid */}
            <div className="grid md:grid-cols-2 gap-8">
                {[1, 2].map((i) => (
                    <div key={i} className="card bg-base-100 shadow-xl border border-base-200 h-[500px] animate-pulse">
                        <div className="card-body">
                            {/* Title Area */}
                            <div className="flex justify-between mb-6">
                                <div className="space-y-2">
                                    <div className="h-8 w-40 bg-base-300 rounded"></div>
                                    <div className="h-4 w-24 bg-base-300 rounded"></div>
                                </div>
                                <div className="h-6 w-20 bg-base-300 rounded-full"></div>
                            </div>

                            {/* Price Area */}
                            <div className="h-12 w-32 bg-base-300 rounded mb-8"></div>

                            {/* List Items */}
                            <div className="space-y-4 flex-1">
                                <div className="h-10 w-full bg-base-300 rounded"></div>
                                <div className="h-6 w-3/4 bg-base-300 rounded"></div>
                                <div className="h-6 w-5/6 bg-base-300 rounded"></div>
                                <div className="h-6 w-2/3 bg-base-300 rounded"></div>
                            </div>

                            {/* Button */}
                            <div className="h-12 w-full bg-base-300 rounded-lg mt-8"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PremiumSkeleton
