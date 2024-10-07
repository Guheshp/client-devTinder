import React, { useEffect } from 'react'
import axios from "axios"
import { Base_URL } from '../utils/helper/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/redux/slices/connectionSlice'

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
    if (connectionData.length === 0) return <h1>No connection found</h1>
    return (
        <div>
            <div className="flex justify-center items-center">
                <h1 className="text-2xl mt-2 border-black bg-slate-950 inline-block align-middle rounded-md p-3">Connections</h1>
            </div>
            <div className='flex justify-center'>
                {connectionData && connectionData.map((connection) => {
                    const { firstName, lastName, age, gender, skills, photo } = connection
                    return (

                        <div role="alert" key={connection._id} className="alert shadow-mg m-4 border-black w-1/2">
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
