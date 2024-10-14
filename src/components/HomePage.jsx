import React from 'react'
import { userData } from '../utils/helper/Info'
import { BUTTON_IMAGE } from '../utils/helper/constant'
import FeedBack from './FeedBack'
import FeedBackCard from './FeedBackCard'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate()
    const handleClickOnCreateBtn = () => {
        navigate("/login")
    }
    return (
        <div className='m-10 sm:m-3'>
            <div className='text-center my-20' >
                <h1 className="text-3xl font-extrabold bg-gradient bg-clip-text text-transparent md:text-6xl">
                    Start Something Epic <span className="text-transparent">🚀</span>
                </h1>
                <button className='my-6 border  rounded-xl bg-custom-gradient text-lg text-white transform transition duration-300 hover:scale-105 shadow-xl md:py-2 md:px-5 sm:p-2 sm:px-4  p-2 px-3' onClick={handleClickOnCreateBtn}>Create an Account</button>
            </div>
            <hr className='my-6' />

            <FeedBack userData={userData} BUTTON_IMAGE={BUTTON_IMAGE} />


            <FeedBackCard />

            <div className=' text-center' >
                <button className='my-6 border py-3 px-5 rounded-xl bg-custom-gradient text-xl text-white transform transition duration-300 hover:scale-105 shadow-xl' onClick={() => toast("Please Login!😁", {
                    duration: 2000,
                    position: 'bottom-left',
                })}>Explore More</button>
            </div>
        </div>

    )
}

export default HomePage
