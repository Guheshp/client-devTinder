import React from 'react';
import { STACK_USER } from '../utils/helper/Info';

const FeedBackCard = () => {

    const theme = localStorage.getItem("theme");

    return (

        <div className='text-center py-6 bottom-0 mt-10'>
            <div className="">
                <div className={`stats shadow flex overflow-x-scroll ${theme === "dark" ? "bg-neutral-900 text-white" : "bg-white text-black"}`}>
                    {STACK_USER.map((user) => (
                        <div className="stat" key={user.firstName}>
                            <div className="justify-center flex">
                                <img className='w-20 rounded' src={user?.photoUrl} alt="" />
                            </div>
                            <div className={`stat-desc w-40 mt-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
                                <p className={`stat-desc w-40 mt-2 text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>{user.firstName} {user.lastName}</p>
                                <p className='font-semibold'>Skills:</p>
                                <p className='overflow-auto p-3'>{user.skills.join(", ")}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default FeedBackCard;
