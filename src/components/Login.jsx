import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/redux/slices/userSlice'
import { Base_URL } from '../utils/helper/constant'

const Login = () => {

    const [emailId, setEmailId] = useState("guhesh@gmail.com")
    const [password, setPassword] = useState("Charger@123")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLoginSubmit = async () => {
        try {
            const res = await axios.post(Base_URL + `/login`,
                { emailId, password },
                { withCredentials: true })
            const userData = res?.data?.data
            dispatch(addUser(userData))
            navigate("/")
            // console.log(userData)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center my-20'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <h1 className='text-xl font-medium text-center mt-7'>Login</h1>
                <div className="card-body">
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

                        <div className="text-end">
                            <Link to={``} className='label-text'>Forgot Password</Link>
                        </div>
                    </label>
                    <div className='text-center'>
                        <button className='btn btn-primary' onClick={handleLoginSubmit}>
                            Login

                        </button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Login
