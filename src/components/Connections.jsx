import React, { useEffect } from 'react'
import axios from "axios"
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/redux/slices/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
    const dispatch = useDispatch()
    const connectionData = useSelector((store) => store.connection.connectection)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };



    const fetchConnection = async () => {
        try {
            const res = await axios.get(Base_URL + "/user/connections", { withCredentials: true })
            const data = res?.data?.message
            console.log("res", data)
            dispatch(addConnection(data))

        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchConnection()
    }, [])
    if (!connectionData) return;
    if (connectionData.length === 0) return (
        <div className='h-screen'>
            <div className='flex flex-col justify-center items-center mt-24'>
                <h1 className='text-center text-2xl font-bold'>No Connections Found</h1>
                <p className='text-center text-gray-600 mt-2'>You will receive connections when the person accepts your request.</p>
                <button className='btn mt-10'>
                    <Link to={`/feed`}>
                        Home
                    </Link>
                </button>
            </div>
        </div>
    )


    return (
        <div className='h-screen'>
            <div className="flex justify-center items-center mt-24">
                <h1 className="text-2xl btn rounded-md ">Connections</h1>
            </div>
            <div className='flex flex-col items-center'>
                {connectionData && connectionData.map((connection) => {
                    const { firstName, lastName, age, gender, skills, photo } = connection
                    return (

                        <div key={connection._id} className="flex justify-between shadow-mg m-4 border border-gray-400 p-4 rounded-xl w-1/2">
                            <img className='w-20 rounded ' src={photo} alt="" />
                            <div className=''>
                                <h3 className="font-bold text-xl">{capitalizeFirstLetter(firstName)} {capitalizeFirstLetter(lastName)} </h3>
                                <div className="text-md mt-1 ">{age}, {gender}</div>
                                <div className="text-md mt-1 ">Skill: {skills}</div>
                            </div>
                            <button className="btn btn-sm">See</button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Connections
