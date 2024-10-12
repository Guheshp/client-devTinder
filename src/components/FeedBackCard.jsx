import React from 'react';
import { STACK_USER } from '../utils/helper/Info';

const FeedBackCard = () => {


    return (
        <div className='text-center py-8 mt-10 '>
            <div className="">
                <div className="stats shadow flex overflow-x-scroll ">
                    {STACK_USER.map((user) => (
                        <div className="stat " key={user.firstName}>
                            <div className="justify-center flex">
                                <img className='w-28 rounded ' src={user?.photoUrl} alt="" />
                            </div>
                            <div className="stat-desc w-40 mt-2 ">
                                <p className="stat-title text-lg mb-2 text-white">{user.firstName} {user.lastName}</p>
                                <p className='font-semibold text-white'>Skills:</p>
                                <p className='text-gray-300 overflow-auto p-3'>{user.skills.join(",")}</p>
                            </div>
                            {/* <div className="stat-value text-primary">25.6K</div> */}

                        </div>
                    ))}
                </div>


            </div>

        </div>
    );
};

export default FeedBackCard;
