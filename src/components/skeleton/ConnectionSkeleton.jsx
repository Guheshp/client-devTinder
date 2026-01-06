import React from 'react'

const ConnectionSkeleton = () => {
    return (
        <div className="min-h-screen bg-base-200 pt-28 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="h-8 w-48 bg-gray-300 rounded mb-6 animate-pulse"></div>
                <div className="grid grid-cols-1 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="card md:card-side bg-base-100 shadow-xl border border-gray-100 p-4 items-center animate-pulse">
                            {/* Avatar */}
                            <figure className="md:w-24 flex-none m-0 flex justify-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200"></div>
                            </figure>
                            {/* Info */}
                            <div className="card-body py-2 px-4 md:px-6 flex-1 w-full gap-3">
                                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                            {/* Button */}
                            <div className="flex-none mt-4 md:mt-0">
                                <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ConnectionSkeleton