import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Base_URL } from '../utils/helper/constant'
import toast from 'react-hot-toast'
import { removeUser } from '../utils/redux/slices/userSlice'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const userData = useSelector((store) => store.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [learnToggle, setLearnToggle] = useState(false);
    const [active, setActive] = useState(false);

    const setUpOnHover = () => {
        setLearnToggle(true);
    };

    const setUpOnLeave = () => {
        setLearnToggle(false);
    };

    const handleLogout = async () => {
        try {
            const res = await axios.post(Base_URL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser())
            navigate("/")
            return toast.success("Logged Out!")
        } catch (error) {
            console.error(error)
            return toast.error(error)
        }
    }

    return (
        <div>
            <div className="navbar bg-gradient-to-b from-neutral-950  p-4 fixed top-0 z-30 bg-opacity-90 ">

                <div className="flex-1">
                    <Link
                        to={`/`}
                        className="btn btn-ghost text-xl sm:text-1xl md:text-2xl lg:text-3xl font-bold text-white"
                    >
                        Dev-Tinder 🚀
                    </Link>

                    <div onMouseEnter={setUpOnHover}
                        onMouseLeave={setUpOnLeave}>
                        <Link
                            className={`px-2 text-xl ${learnToggle ? 'text-red-500 underline' : 'text-white'}`}
                        >
                            Learn
                        </Link>


                        {learnToggle &&
                            <div className='absolute  bg-opacity-50'>
                                <ul className='ml mt-1'>
                                    <li role='button' className='text-white text-lg font-semibold hover:text-black p-1' onClick={() => toast((t) => (
                                        <span>
                                            Still working on it,😁<b> DSA roadmap will be done soon.</b>
                                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                                            </button>
                                        </span>
                                    ))}>Data Strycture and Algorithm</li>
                                    <li role='button' className='text-white text-lg font-semibold hover:text-black p-1' onClick={() => toast((t) => (
                                        <span>
                                            Still working on it,😁<b> MERN Stack roadmap will be done soon.</b>
                                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                                            </button>
                                        </span>
                                    ))}>MERN Stack</li>
                                    <li role='button' className='text-white text-lg font-semibold hover:text-black p-1' onClick={() => toast((t) => (
                                        <span>
                                            Still working on it,😁<b>Java Spring roadmap will be done soon.</b>
                                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                                            </button>
                                        </span>
                                    ))}>Java Spring</li>
                                    <li role='button' className='text-white text-lg font-semibold hover:text-black p-1' onClick={() => toast((t) => (
                                        <span>
                                            Still working on it,😁<b>Python Django roadmap will be done soon.</b>
                                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                                            </button>
                                        </span>
                                    ))}>Python Django</li>
                                </ul>
                            </div>
                        }
                    </div>

                    <Link className='px-2 text-xl text-white  hover:text-red-500 hover:underline' onClick={() => toast((t) => (
                        <span>
                            Working on it,😁<b>Developer Component.</b>
                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                            </button>
                        </span>
                    ))}>
                        Developers
                    </Link>
                    <Link className='px-2 text-xl text-white  hover:text-red-500 hover:underline' onClick={() => toast((t) => (
                        <span>
                            Working on it,😁<b>Support Component.</b>
                            <button onClick={() => toast.dismiss(t.id)} className='text-red-600'>

                            </button>
                        </span>
                    ))}>
                        Support
                    </Link>
                </div>

                <ThemeToggle />

                {userData ? (
                    <div className="flex-none gap-2">
                        <p className="hidden sm:block btn btn-ghost label-text pt-3">
                            Welcome, {userData?.firstName}
                        </p>
                        <div className="dropdown dropdown-end me-2 sm:me-4 md:me-8">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-8 sm:w-9 md:w-10 rounded-full">
                                    <img alt="User photo" src={userData?.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 sm:w-52 p-2 shadow"
                            >
                                <li>
                                    <Link to={`/profile`} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/connections"}>Connections</Link>
                                </li>
                                <li>
                                    <Link to={"/requests"}>Request</Link>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-end">
                        <button>
                            <Link
                                className="p-1 sm:p-2 rounded-lg hover:bg-slate-300 bg-white text-black px-5 sm:px-6 md:px-8 text-sm sm:text-md md:text-lg font-semibold me-1 sm:me-2 md:me-4"
                                to={"/login"}
                            >
                                Log in
                            </Link>
                        </button>
                    </div>
                )}
            </div>
        </div >

    )
}

export default Navbar
