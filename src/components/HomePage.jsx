import React from 'react'
import { userData } from '../utils/helper/Info'
import { BUTTON_IMAGE } from '../utils/helper/constant'
import FeedBack from './FeedBack'

const HomePage = () => {
    return (
        <div className='m-10'>
            <div className='text-center'>
                <h1 className='text-7xl font-extrabold text-white'>Start Something Epic 🚀</h1>
                <button className='my-6 border py-3 px-5 rounded-xl bg-pink-700 text-xl text-white'>Create an Account</button>
            </div>

            <FeedBack userData={userData} BUTTON_IMAGE={BUTTON_IMAGE} />
            <div className=' text-center '>
                <button className=' text-center my-6 border py-3 px-5 rounded-xl bg-pink-700 text-xl text-white'>Explore</button>
            </div>

        </div>

    )
}

export default HomePage
