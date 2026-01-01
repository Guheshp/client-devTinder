import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { MdConnectWithoutContact } from 'react-icons/md'
import axios from 'axios'
import { Base_URL, DEFAULT_IMG, skillList } from '../utils/helper/constant'
import Adds from './Adds'

const SideProfile = ({ stockApi }) => {
    const userData = useSelector(store => store.user.user)
    const [requestData, setRequestData] = useState([])
    const [connectionData, setConnectionData] = useState([])
    console.log('connectionData', connectionData)
    /* ---------------- Fetch data ---------------- */
    useEffect(() => {
        const fetchConnections = async () => {
            const res = await axios.get(
                `${Base_URL}/user/connections`,
                { withCredentials: true }
            )
            setConnectionData(res.data.data || [])
        }

        const fetchRequests = async () => {
            const res = await axios.get(
                `${Base_URL}/user/request/received`,
                { withCredentials: true }
            )
            setRequestData(res.data.data || [])
        }

        fetchConnections()
        fetchRequests()
    }, [])



    const getSkillNames = (skills = []) => {
        if (!Array.isArray(skills)) return []

        return skills
            .map(id => skillList.find(s => s.id === id)?.name)
            .filter(Boolean)
    }


    if (!userData) return null

    return (
        <div className="w-full">

            {/* -------- Profile Header -------- */}
            <div className="bg-base-300 p-4 rounded-t-xl">
                <div className="avatar online mb-2">
                    <div className="w-24 rounded-full">
                        <img
                            src={userData.photo || DEFAULT_IMG}
                            alt="Profile"
                        />
                    </div>
                </div>

                <Link
                    to="/profile"
                    className="font-semibold hover:text-primary hover:underline block"
                >
                    {userData.firstName} {userData.lastName}
                </Link>

                <p className="text-xs text-gray-500 break-all">
                    {userData.emailId}
                </p>

                {/* Skills */}
                <p className="text-xs mt-2 font-medium text-gray-600 break-words">
                    {getSkillNames(userData.skills).length > 0
                        ? getSkillNames(userData.skills).join(' | ')
                        : 'No skills added'}
                </p>

            </div>

            <hr />

            {/* -------- Menu -------- */}
            <ul className="menu bg-base-200 w-full p-2 text-sm">

                <li>
                    <Link to="/connections" className="flex items-center gap-2">
                        <MdConnectWithoutContact className="text-lg" />
                        <span>{connectionData.length} Connections</span>
                    </Link>
                </li>

                <li>
                    <Link to="/requests" className="flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>{requestData.length} Requests</span>
                    </Link>
                </li>

            </ul>

            <hr />

            {/* -------- Info -------- */}
            <div className="bg-base-200 p-3 text-center text-xs border-b">
                <span className="font-semibold text-indigo-500">
                    * Working on:
                </span>{' '}
                Messaging between connected users coming soon!
            </div>

            {/* -------- Ads -------- */}
            <div className="mt-4">
                <Adds stockApi={stockApi} />
            </div>
        </div>
    )
}

export default SideProfile
