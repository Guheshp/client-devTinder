import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/redux/slices/userSlice'
import toast from 'react-hot-toast'

const ProfilePage = ({ user }) => {
    console.log("usershavs..", user)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age || "")
    const [gender, setGender] = useState(user.gender || "")
    const [skills, setskills] = useState(user.skills || "")
    const [photo, setPhoto] = useState(user.photo || "")
    const [_id, setId] = useState(user._id)
    const [showTost, setShowTost] = useState(false)
    const [error, setError] = useState("")
    const [sucess, setsuccess] = useState("")

    const dispatch = useDispatch()

    const saveProfile = async () => {

        try {
            const res = await axios.post(Base_URL + "/profile/edit",
                { firstName, lastName, age, gender, skills, photo }, { withCredentials: true });
            dispatch(addUser(res?.data?.data))
            setsuccess("Profile saved successfully")
            setError("")
            setShowTost(true)
            setTimeout(() => {
                setShowTost(false)
            }, 3000)

        } catch (error) {
            console.error(error)
            let message = "ERROR: While updateing profile!"
            if (error?.response?.data?.error) {
                message = error.response.data.error;
            }
            setError(message)
            setsuccess("")
            setShowTost(true)
            setTimeout(() => {
                setShowTost(false)
            }, 3000)

        }
    }

    return (
        <div className='flex justify-center my-8'>
            <div className='flex justify-center mx-8'>
                <div className="card bg-base-300 w-96 shadow-xl">

                    <h1 className='text-xl font-medium text-center mt-4'>Edit Profile</h1>
                    {showTost &&
                        <div className="toast toast-top toast-center">
                            {error &&
                                <div className="alert alert-info">
                                    <span>{error}</span>
                                </div>
                            }
                            {sucess &&
                                <div className="alert alert-success">
                                    <span>Profile saved Successfully</span>
                                </div>
                            }

                        </div>
                    }
                    <div className="card-body py-1">
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name <span className='text-red-800'>*</span></span>
                            </div>
                            <input
                                type="text"
                                value={firstName}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>

                        <label className="form-control w-full max-w-xs my-0">
                            <div className="label">
                                <span className="label-text">Last Name <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={lastName}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setLastName(e.target.value)}
                            />


                        </label>
                        <label className="form-control w-full max-w-xs my-0">
                            <div className="label">
                                <span className="label-text">Photo URL: <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={photo}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setPhoto(e.target.value)}
                            />
                        </label>
                        <label className="form-control w-full max-w-xs my-0">
                            <div className="label">
                                <span className="label-text">Age: <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={age}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setAge(e.target.value)}
                            />


                        </label>
                        <label className="form-control w-full max-w-xs my-0">
                            <div className="label">
                                <span className="label-text">Gender: <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={gender}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setGender(e.target.value)}
                            />


                        </label>
                        <label className="form-control w-full max-w-xs my-0">
                            <div className="label">
                                <span className="label-text">Skills: <span className='text-red-800'>*</span></span>
                            </div>

                            <input
                                type="text"
                                value={skills}
                                className="input input-bordered w-full max-w-xs"
                                onChange={(e) => setskills(e.target.value)}
                            />


                        </label>
                        <div className='text-center my-1 '>
                            <button className='btn btn-primary' onClick={saveProfile}>
                                Save Profile
                            </button>
                        </div>

                    </div>

                </div>
            </div>
            <UserCard user={{ _id, firstName, lastName, age, gender, skills, photo }} />

        </div>
    )
}

export default ProfilePage
