import React from 'react'

const Skeleton = () => {
    return (
        <div className="flex w-96 flex-col gap-4 items-center justify-center">
            <div className="skeleton h-72  w-full"></div>
            <div className="skeleton text-start h-4 w-28"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="flex flex-row justify-center mx-22 gap-4 w-full">
                <div className="skeleton h-10 w-20"></div>
                <div className="skeleton h-10 w-20"></div>
            </div>

        </div>
    )
}

export default Skeleton
