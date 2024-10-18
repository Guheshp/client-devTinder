import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdConnectWithoutContact } from "react-icons/md";
import axios from 'axios';
import { Base_URL } from '../utils/helper/constant';
import Adds from './Adds';

const SideProfile = ({ stockApi }) => {
    const userData = useSelector((store) => store.user.user)
    const [requestData, setRequestData] = useState([])
    const [connectionData, setConectionData] = useState([])
    const fetchConnection = async () => {
        try {
            const res = await axios.get(Base_URL + "/user/connections", { withCredentials: true })
            const data = res?.data?.message
            // console.log("res", data)
            setConectionData(data)
        } catch (error) {
            console.error(error)
        }
    }
    const fetchRequest = async () => {
        try {
            const res = await axios.get(Base_URL + "/user/request/received", { withCredentials: true })
            const data = res?.data?.message
            // console.log("request", data)
            setRequestData(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchConnection()
        fetchRequest()
    }, [])

    console.log("userData.!..", userData)
    return (
        <div className=''>
            <div className='bg-base-300 h-full p-4 rounded-t-xl'>
                <div className="avatar online align-middle">
                    <div className="w-24 rounded-full">
                        <img src={userData?.photo} />
                    </div>
                </div>
                <Link to={`/profile`} className='hover:text-primary hover:underline'>
                    <p className='font-bold '>{userData?.firstName} {userData?.lastName}</p>
                </Link>
                <p className='text-sm'>{userData?.emailId}</p>

                {/* <p>Here's the corrected JSON representation of 20 users with their email formatted as</p> */}
                <p className='text-sm py-2'>{userData?.skills}</p>


            </div>
            <hr />
            <div>
                <ul className="menu bg-base-200 w-full p-2">
                    <li>
                        <a>
                            <MdConnectWithoutContact />
                            <Link to={`/connections`} className='hover:text-primary hover:underline'>
                                <p className='text-sm'> {connectionData?.length} Connection.</p>
                            </Link>
                        </a>
                    </li>
                    <li>
                        <a>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <Link to={`/requests`} className='hover:text-primary hover:underline'>
                                <p className='text-sm'> {requestData?.length} Request.</p>
                            </Link>
                        </a>
                    </li>
                </ul>
            </div>
            <hr />
            <div className='menu bg-base-200 w-full p-3 text-center border-b-2'>
                <p><span className='text-bold text-indigo-500'>* Working on:</span> Users will soon be able to message connected people!</p>
            </div>
            <div className='mt-4'>
                <Adds stockApi={stockApi} />
            </div>
        </div>
    )
}

export default SideProfile
