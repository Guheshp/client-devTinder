import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";

import { Base_URL } from '../utils/helper/constant'
import { addConnection } from '../utils/redux/slices/connectionSlice'

import ConnectionSkeleton from './skeleton/ConnectionSkeleton';
import ConnectionCard from './ConnectionCard';

const Connections = () => {
    const dispatch = useDispatch()
    const connectionData = useSelector(store => store.connection.connectection) // Kept exact selector path
    const [isLoading, setIsLoading] = useState(true)

    /* ---------- API ---------- */
    const fetchConnection = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(
                `${Base_URL}/user/connections`,
                { withCredentials: true }
            )
            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.error("Error fetching connections:", error)
        } finally {
            // Tiny delay to prevent flicker if API is instant
            setTimeout(() => setIsLoading(false), 300)
        }
    }

    useEffect(() => {
        fetchConnection()
    }, [])


    /* ---------- 1. Loading State ---------- */
    if (isLoading) {
        return <ConnectionSkeleton />
    }

    /* ---------- 2. Empty State ---------- */
    if (!connectionData || connectionData.length === 0) {
        return (
            <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                        <BsPeopleFill className="text-5xl text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800">No Connections Yet</h1>
                    <p className="text-gray-500 mt-2 mb-6">
                        It looks like you haven't connected with anyone yet.
                        Go to the feed to find like-minded developers!
                    </p>
                    <Link to="/feed" className="btn btn-primary w-full text-white">
                        Find Connections
                    </Link>
                </div>
            </div>
        )
    }

    /* ---------- 3. Main List ---------- */
    return (
        <div className="min-h-screen bg-base-200 pt-28 pb-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">My Connections</h1>
                    <div className="badge badge-primary badge-lg text-white">
                        {connectionData.length}
                    </div>
                </div>

                {/* Grid List */}
                <div className="grid grid-cols-1 gap-4">
                    {connectionData.map(connection => (
                        <ConnectionCard
                            key={connection._id}
                            connection={connection}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Connections