import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import axios from 'axios'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/redux/slices/userSlice'

const ProfilePage = ({ user }) => {


    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [skills, setskills] = useState(user.skills)
    const [photo, setPhoto] = useState(user.photo)

    const dispatch = useDispatch()

    const saveProfile = async () => {

        try {
            const res = await axios.post(Base_URL + "/profile/edit",
                { firstName, lastName, age, gender, skills, photo }, { withCredentials: true });
            dispatch(addUser(res?.data?.data))
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center my-8'>
            <div className='flex justify-center mx-8'>
                <div className="card bg-base-300 w-96 shadow-xl">
                    <h1 className='text-xl font-medium text-center mt-4'>Edit Profile</h1>
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
            <UserCard user={{ firstName, lastName, age, gender, skills, photo }} />

        </div>
    )
}

export default ProfilePage
