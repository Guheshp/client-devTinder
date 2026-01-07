import React from 'react'

const RequestSkeleton = () => {
    return (
        <div className='min-h-screen bg-base-200 pt-28 pb-10 px-4'>
            <div className="max-w-4xl mx-auto">
                {/* Title Skeleton */}
                <div className="h-8 w-48 bg-gray-300 rounded mb-6 animate-pulse"></div>

                <div className="flex flex-col gap-4">
                    {/* Render 3 Skeleton Cards */}
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="card md:card-side bg-base-100 shadow-xl border border-gray-100 p-4 animate-pulse"
                        >
                            {/* Avatar Skeleton */}
                            <figure className="md:w-32 flex justify-center items-center md:justify-start">
                                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200"></div>
                            </figure>

                            {/* Text Content Skeleton */}
                            <div className="card-body py-2 px-4 md:px-6 flex-1 flex flex-col items-center md:items-start justify-center gap-3">
                                {/* Name */}
                                <div className="h-6 w-3/4 md:w-1/2 bg-gray-200 rounded"></div>
                                {/* Gender/Meta */}
                                <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
                                {/* Skills */}
                                <div className="flex gap-2 mt-2">
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>

                            {/* Buttons Skeleton */}
                            <div className="flex flex-row md:flex-col justify-center items-center gap-3 mt-4 md:mt-0 md:border-l md:pl-6 border-gray-100">
                                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
                                <div className="h-8 w-32 bg-gray-200 rounded-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RequestSkeleton