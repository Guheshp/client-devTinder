import React, { useEffect, useState } from 'react'
import { COMMENTS } from '../utils/helper/comments'
import { SiComma } from "react-icons/si";


const Comments = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalComments = COMMENTS?.length || 0;
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % totalComments);
        }, 4000);

        return () => clearInterval(interval);
    }, [totalComments]);
    return (
        <div className='flex justify-evenly'>
            {COMMENTS?.slice(currentIndex, currentIndex + 3).map((data) => (
                <div className="card border-[0.5px] w-96 ">
                    <div className="card-body">
                        <>
                            <div className='flex justify-between text-2xl'>
                                <h2 className="card-title text-white">{data?.fullName}</h2>
                                <div className='flex'>
                                    <SiComma className="font-extrabold" />
                                    <SiComma className="font-extrabold" />
                                </div>

                            </div>

                            <hr className='h-1 opacity-35' />
                            <p>{data?.comment}</p>

                        </>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default Comments
