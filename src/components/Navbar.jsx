import React from 'react'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const userData = useSelector((store) => store.user.user)
    console.log("userData", userData)
    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">DevTinder 🚀</a>
                </div>
                {userData ?
                    (<div className="flex-none gap-2">
                        <p className=' btn btn-ghost label-text'>Wellcome, {userData?.firstName}</p>
                        <div className="dropdown dropdown-end me-8">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User photo"
                                        src={userData?.photo} />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li>
                                    <a className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </a>
                                </li>
                                <li><a>Settings</a></li>
                                <li><a>Logout</a></li>
                            </ul>
                        </div>
                    </div>) : null}

            </div>
        </div>
    )
}

export default Navbar
