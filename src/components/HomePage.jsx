import React, { useEffect, useState } from 'react'
import { userData as initialUserData } from '../utils/helper/Info'
import { BUTTON_IMAGE } from '../utils/helper/constant'
import FeedBack from './FeedBack'
import FeedBackCard from './FeedBackCard'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import HomeFooter from './HomeFooter'
import Comments from './Comments'


const HomePage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    const handleClickOnCreateBtn = () => {
        navigate("/login");
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setUserData(initialUserData);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (!userData) {
        return (

            <div
                className="hero h-screen bg-gradient-to-b from-neutral-950 to-transparent fixed top-0 left-0 w-full -z-10"
                style={{
                    backgroundImage: "url(https://images.pexels.com/photos/5981929/pexels-photo-5981929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backdropFilter: 'blur(100px)',
                }}
            >
                <div className="relative  z-10 top-0">
                    <div className=' mt-52 items-center h-screen'>
                        {/* <p className="text-lg">Hang tight! </p> */}
                        <span className="loading loading-spinner loading-lg mt-96"></span>

                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className='m-10 sm:m-3'>
                <div
                    className="hero h-screen bg-gradient-to-b from-neutral-950 to-transparent fixed top-0 left-0 w-full -z-10"
                    style={{
                        backgroundImage: "url(https://cdn.pixabay.com/photo/2024/05/20/13/28/ai-generated-8775233_1280.png)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="relative z-10"></div>
                </div>

                <div className=' '>
                    <div className="h-screen flex justify-center items-center text-neutral-content text-center">
                        <div className='bg-black bg-opacity-70 py-8 rounded'>
                            <h1 className="text-2xl font-extrabold text-white  md:text-6xl h-[77px] ">
                                Start Something Epic<span >.</span>
                            </h1>
                            <p className='mx-auto my-2 w-3/6 text-lg text-white font-semibold'>
                                "A platform that connects developers through a matching system, allowing them to find and collaborate on projects based on shared skills and interests. Users can create profiles to showcase their work, participate in discussions, and engage with others to build valuable networking opportunities."
                                <span className='font-semibold text-lg bg-gradient bg-clip-text text-transparent'> - DevTinder</span>
                            </p>
                            <button className='my-3 border rounded-xl bg-custom-gradient text-lg text-white transform transition duration-300 hover:scale-105 shadow-xl md:py-2 md:px-5 sm:p-2 sm:px-4 p-2 px-3' onClick={handleClickOnCreateBtn}>
                                Create an Account
                            </button>
                        </div>

                    </div>
                </div>

            </div>
            <div className='bg-neutral-950  py-8 z-50'>
                {/* <FeedBack userData={userData} BUTTON_IMAGE={BUTTON_IMAGE} /> */}
                <div className='px-20'>
                    <Comments />
                    <FeedBackCard />
                </div>
                <div className='text-center'>
                    <button className='my-6 border-spacing-44 py-3 px-5 rounded-xl bg-custom-gradient text-xl text-white transform transition duration-300 hover:scale-105 shadow-xl' onClick={() => toast("Please Login!😁", { duration: 2000, position: 'bottom-left' })}>
                        Explore More
                    </button>
                </div>

                <HomeFooter />
            </div>
        </div>
    );
};

export default HomePage;
