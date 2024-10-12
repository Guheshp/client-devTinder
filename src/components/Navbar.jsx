import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Base_URL } from '../utils/helper/constant'
import toast from 'react-hot-toast'
import { removeUser } from '../utils/redux/slices/userSlice'

const Navbar = () => {
    const userData = useSelector((store) => store.user.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

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
            <div className="navbar bg-gradient-to-b from-base-300 pt-5">
                <div className="flex-1">
                    <Link
                        to={`/`}
                        className="btn btn-ghost text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
                    >
                        Dev-Tinder 🚀
                    </Link>
                </div>
                {userData ? (
                    <div className="flex-none gap-2">
                        <p className="hidden sm:block btn btn-ghost label-text">
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
        </div>

    )
}

export default Navbar
