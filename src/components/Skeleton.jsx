import React from 'react'

const Skeleton = () => {
    return (
        <div className="w-9/12 mx-auto">
            <div className="flex my-14 gap-6">

                <div className="w-80">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 m-3">
                            <div className="skeleton h-20 w-20 shrink-0 rounded-full"></div>
                        </div>
                        <div className="skeleton h-4 w-56 mt-0"></div>
                        <div className="skeleton h-4 w-56"></div>
                        <div className="skeleton h-4 w-56"></div>
                    </div>
                    <div className='mt-4'>
                        <div className="skeleton h-40 w-full"></div>
                    </div>
                    <div className='mt-4'>
                        <div className="skeleton h-60 w-full"></div>
                        <div className="skeleton float-end h-12 mt-2 w-[100px]"></div>
                    </div>
                </div>


                <div className="flex-1">
                    <div className="skeleton h-72 w-full"></div>
                    <div className="skeleton text-start h-4 mt-3 w-28"></div>
                    <div className="skeleton h-4 mt-3 w-full"></div>
                    <div className="skeleton h-4 mt-3 w-full"></div>
                    <div className="flex justify-center gap-4 w-full mt-4">
                        <div className="skeleton h-10 w-20"></div>
                        <div className="skeleton h-10 w-20"></div>
                    </div>

                </div>

                <div className="w-80 h-[630px]">
                    <div className="flex flex-col gap-4">
                        <div className="skeleton h-10 w-full"></div>
                        <div className="skeleton h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                        <div className="skeleton  h-16 w-full"></div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Skeleton
