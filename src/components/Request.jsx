import axios from 'axios'
import React, { useEffect } from 'react'
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/redux/slices/requestSlice'
import { Link } from 'react-router-dom'

const Request = () => {
    const dispatch = useDispatch()
    const requestData = useSelector((store) => store.request.request)
    console.log("requestData...", requestData)
    const capitalizeFirstLetter = (string) => {
        return string?.charAt(0).toUpperCase() + string?.slice(1);
    };

    const fetchRequest = async () => {
        try {
            const res = await axios.get(Base_URL + "/user/request/received", { withCredentials: true })
            const data = res?.data?.message
            // console.log("request", data)
            dispatch(addRequest(data))
        } catch (error) {
            console.log(error)
        }
    }

    const reviewRequest = async (status, _id) => {
        try {
            const res = await axios.post(Base_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true })
            dispatch(removeRequest(_id))
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchRequest()
    }, [])
    if (!requestData) return (
        <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Requests Found</h1>
                <p className='text-center text-gray-600 mt-2'>If someone is interested in your profile, they will send you a request.</p>
                <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
                    <Link to={`/feed`} className='no-underline'>
                        Home
                    </Link>
                </button>
            </div>

        </div>
    )

    if (requestData.length === 0) return (
        <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Requests Found</h1>
                <p className='text-center text-gray-600 mt-2'>If someone is interested in your profile, they will send you a request.</p>
                <button className='btn mt-10  text-white py-2 px-4 rounded  transition'>
                    <Link to={`/feed`} className='no-underline'>
                        Home
                    </Link>
                </button>
            </div>

        </div>
    )

    return (
        <div className='mt-24'>
            <div className="flex justify-center items-center">
                <h1 className="text-2xl  btn rounded-md">Request</h1>
            </div>
            <div className="flex flex-col items-center">
                {requestData && requestData.map((request) => {
                    const { firstName, lastName, age, gender, skills, photo } = request?.fromUserId
                    return (

                        <div role="alert" key={request._id} className="alert shadow-mg m-3 border-black w-1/2">
                            <img className='w-20 rounded ' src={photo} alt="" />
                            <div className=''>
                                <h3 className="font-bold text-xl">{capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)} </h3>
                                <div className="text-md mt-1 ">{age}, {gender}</div>
                                <div className="text-md mt-1 ">Skill: {skills}</div>
                            </div>
                            <button className="btn btn-primary" onClick={() => reviewRequest("accepeted", request._id)}>Accept</button>
                            <button className="btn btn-secondary" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Request
