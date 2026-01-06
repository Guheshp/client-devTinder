import React from 'react'

const FeedSkeleton = () => {

    // --- 1. Custom Animation Styles ---
    // This creates the sliding wave effect found on YouTube/LinkedIn
    const shimmerStyle = {
        animation: 'shimmer 1.5s infinite linear',
        background: 'linear-gradient(to right, var(--fallback-b3,oklch(var(--b3)/1)) 4%, var(--fallback-b2,oklch(var(--b2)/1)) 25%, var(--fallback-b3,oklch(var(--b3)/1)) 36%)',
        backgroundSize: '1000px 100%',
    };

    // --- 2. Helper Component for Shimmer Blocks ---
    const ShimmerBlock = ({ className }) => (
        <div className={`bg-base-300 ${className}`} style={shimmerStyle}></div>
    );

    return (
        <>
            {/* Inject Keyframes for the animation */}
            <style>
                {`
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                `}
            </style>

            <div className='flex justify-center items-center mt-14'>
                <div className='w-9/12'>
                    <div className='flex my-14 gap-6'>

                        {/* ================= LEFT COLUMN (Side Profile) ================= */}
                        <div className='w-[30%] flex flex-col gap-4'>

                            {/* Profile Card */}
                            <div className="card bg-base-100 shadow-xl border border-base-200 h-[300px] p-4 flex flex-col items-center overflow-hidden relative">
                                {/* Header Banner Strip */}
                                <ShimmerBlock className="absolute top-0 left-0 w-full h-14 opacity-50" />

                                {/* Avatar */}
                                <ShimmerBlock className="w-20 h-20 rounded-full mt-6 border-4 border-base-100 relative z-10" />

                                {/* Name & Email */}
                                <ShimmerBlock className="h-5 w-3/4 rounded mt-4" />
                                <ShimmerBlock className="h-3 w-1/2 rounded mt-2" />

                                {/* Skills Chips */}
                                <div className="flex gap-2 mt-5">
                                    <ShimmerBlock className="h-5 w-14 rounded-full" />
                                    <ShimmerBlock className="h-5 w-14 rounded-full" />
                                    <ShimmerBlock className="h-5 w-14 rounded-full" />
                                </div>

                                {/* Menu Lines */}
                                <div className="w-full mt-8 space-y-4 px-2">
                                    <div className='flex justify-between items-center'>
                                        <ShimmerBlock className="h-3 w-1/3 rounded" />
                                        <ShimmerBlock className="h-3 w-6 rounded-full" />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <ShimmerBlock className="h-3 w-1/3 rounded" />
                                        <ShimmerBlock className="h-3 w-6 rounded-full" />
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <ShimmerBlock className="h-3 w-1/3 rounded" />
                                        <ShimmerBlock className="h-3 w-6 rounded-full" />
                                    </div>
                                </div>
                            </div>

                            {/* Social Links Card */}
                            <div className="card bg-base-100 shadow-xl border border-base-200 h-[220px] p-5">
                                <ShimmerBlock className="h-4 w-1/3 rounded mb-6" />
                                <div className="space-y-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex gap-3 items-center">
                                            <ShimmerBlock className="w-5 h-5 rounded-full" />
                                            <ShimmerBlock className="h-3 w-1/2 rounded" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ================= MIDDLE COLUMN (Main User Card) ================= */}
                        <div className="w-[36%] flex justify-center">
                            <div className="card bg-base-100 w-full shadow-xl border border-base-200 h-[600px] p-0 overflow-hidden flex flex-col">

                                {/* Banner Area (Optional visual) */}
                                <ShimmerBlock className="w-full h-24 opacity-30" />

                                <div className='px-6 flex flex-col items-center -mt-12'>
                                    {/* Big Avatar */}
                                    <ShimmerBlock className="w-36 h-36 rounded-full border-[6px] border-base-100" />

                                    {/* Name & Age */}
                                    <ShimmerBlock className="h-7 w-2/3 rounded mt-4" />

                                    {/* Badges */}
                                    <div className="flex gap-3 mt-4">
                                        <ShimmerBlock className="h-6 w-20 rounded" />
                                        <ShimmerBlock className="h-6 w-24 rounded" />
                                    </div>

                                    {/* Bio Lines */}
                                    <div className="w-full mt-8 space-y-3">
                                        <ShimmerBlock className="h-3 w-full rounded" />
                                        <ShimmerBlock className="h-3 w-5/6 rounded mx-auto" />
                                        <ShimmerBlock className="h-3 w-4/6 rounded mx-auto" />
                                    </div>

                                    {/* Tech Stack Chips */}
                                    <div className="flex gap-2 mt-8 flex-wrap justify-center">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <ShimmerBlock key={i} className="h-7 w-20 rounded-full" />
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex w-full justify-between px-10 mt-auto mb-8">
                                    <ShimmerBlock className="w-28 h-12 rounded-full" />
                                    <ShimmerBlock className="w-28 h-12 rounded-full" />
                                </div>
                            </div>
                        </div>

                        {/* ================= RIGHT COLUMN (Widgets) ================= */}
                        <div className='w-[30%] flex flex-col gap-4'>

                            {/* Premium Banner */}
                            <div className="card bg-neutral/10 shadow-xl h-[180px] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                                <ShimmerBlock className="absolute inset-0 opacity-20" />
                                <ShimmerBlock className="w-12 h-12 rounded-full mb-3 relative z-10" />
                                <ShimmerBlock className="h-4 w-2/3 rounded mb-5 relative z-10" />
                                <ShimmerBlock className="h-10 w-full rounded-lg relative z-10" />
                            </div>

                            {/* Profile Strength */}
                            <div className="card bg-base-100 shadow-xl border border-base-200 p-5">
                                <ShimmerBlock className="h-4 w-1/3 rounded mb-4" />
                                <div className="flex justify-between mb-2">
                                    <ShimmerBlock className="h-2 w-8 rounded" />
                                    <ShimmerBlock className="h-2 w-8 rounded" />
                                </div>
                                <ShimmerBlock className="w-full h-3 rounded-full" />
                            </div>

                            {/* Recommended Skills */}
                            <div className="card bg-base-100 shadow-xl border border-base-200 p-5">
                                <ShimmerBlock className="h-4 w-1/2 rounded mb-2" />
                                <ShimmerBlock className="h-3 w-3/4 rounded mb-5 opacity-60" />
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <ShimmerBlock key={i} className="h-7 w-20 rounded-full" />
                                    ))}
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default FeedSkeleton