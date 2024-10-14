import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/redux/slices/userSlice'
import { Base_URL } from '../utils/helper/constant'
import toast from 'react-hot-toast'
import { validateLogin } from '../utils/validate/validateLogin'


const Login = () => {

    const [emailId, setEmailId] = useState("")
    const [password, setPassword] = useState("")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [isLoginfrom, setLoginForm] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLoginSubmit = async () => {

        const errorMessage = validateLogin(emailId, password)
        if (errorMessage) {
            // return toast.(errorMessage)
            return toast.error(
                errorMessage

            );
        }
        try {
            const res = await axios.post(Base_URL + `/login`,
                { emailId, password },
                { withCredentials: true })
            const userData = res?.data?.data
            dispatch(addUser(userData))
            navigate("/feed")
        } catch (error) {
            console.error(error)
            return toast.error(
                error?.response?.data?.message || 'Login failed, please try again.'
            );
        }
    }

    const handleSignUp = async () => {
        try {
            const res = await axios.post(Base_URL + "/signup",
                { firstName, lastName, emailId, password },
                { withCredentials: true })
            dispatch(addUser(res?.data?.data))
            navigate("/profile")
        } catch (error) {
            console.error(error)
            return toast.error(
                error?.response?.data?.message || 'Login failed, please try again.'
            );
        }
    }

    return (
        <>
            <div className='flex justify-center my-20'>
                <div className="card bg-base-300 w-96 shadow-xl">
                    <h1 className='text-xl font-medium text-center mt-7'>{isLoginfrom ? "Login" : "Sign Up"}</h1>

                    <div className="card-body">
                        {!isLoginfrom &&
                            <>  <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">First Name <span className='text-red-800'>*</span></span>
                                </div>
                                <input
                                    type="text"
                                    value={firstName}
                                    placeholder="Enter Your First Name"
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className="label">
                                        <span className="label-text">Last Name <span className='text-red-800'>*</span></span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        placeholder="Enter Your Last Name"
                                        className="input input-bordered w-full max-w-xs"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                            </>}

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Email <span className='text-red-800'>*</span></span>
                            </div>
                            <input
                                type="text"
                                value={emailId}
                                placeholder="Enter Your Email"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setEmailId(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full max-w-xs my-2">
                            <div className="label">
                                <span className="label-text">Password <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={password}
                                placeholder="Enter Password"
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {isLoginfrom ?
                                <div className="text-end">
                                    <Link to={``} className='label-text'>Forgot Password</Link>
                                </div> : null}

                        </label>
                        <div className='text-center mt-2'>
                            <button className='btn btn-primary' onClick={isLoginfrom ? handleLoginSubmit : handleSignUp}>
                                {isLoginfrom ? "Login" : "Sign Up"}
                            </button>
                        </div>

                        <p role='button' className='m-auto py-2 hover:text-primary ' onClick={() => setLoginForm((value) => !value)}>{isLoginfrom ? "New User? Sign up Here!" : "Esisting user Login Here!"}</p>
                    </div>

                </div>
            </div>

        </>
    )
}

export default Login
