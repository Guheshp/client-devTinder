import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsPeopleFill } from "react-icons/bs";

import { Base_URL } from '../utils/helper/constant'
import { addConnection } from '../utils/redux/slices/connectionSlice'

import ConnectionSkeleton from './skeleton/ConnectionSkeleton';
import ConnectionCard from './ConnectionCard';
import ConnectionDetailModal from './connection/ConnectionDetailModal';


const Connections = () => {
    const dispatch = useDispatch()
    const connectionData = useSelector(store => store.connection.connectection)
    const [isLoading, setIsLoading] = useState(true)

    // --- Modal State ---
    const [modalUser, setModalUser] = useState(null)
    const [isModalLoading, setIsModalLoading] = useState(false)

    /* ---------- API: Fetch List ---------- */
    const fetchConnection = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${Base_URL}/user/connections`, { withCredentials: true })
            dispatch(addConnection(res.data.data))
        } catch (error) {
            console.error("Error fetching connections:", error)
        } finally {
            setTimeout(() => setIsLoading(false), 300)
        }
    }

    useEffect(() => {
        fetchConnection()
    }, [])

    /* ---------- HANDLER: Fetch Detail on Click ---------- */
    const handleCardClick = async (userId) => {
        setIsModalLoading(true);
        // We set modalUser to null first to ensure the modal doesn't show stale data
        setModalUser(null);

        try {
            const res = await axios.get(`${Base_URL}/user/${userId}`, { withCredentials: true });
            setModalUser(res?.data?.data);
            // The useEffect inside ConnectionDetailModal will detect `modalUser` changes and open the modal
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setIsModalLoading(false);
        }
    }

    const handleCloseModal = () => {
        setModalUser(null);
    }

    console.log("Connection Data:", connectionData);

    /* ---------- RENDER ---------- */
    if (isLoading) return <ConnectionSkeleton />

    if (!connectionData || connectionData.length === 0) {
        return (
            <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center p-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
                        <BsPeopleFill className="text-5xl text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold">No Connections Yet</h1>
                    <Link to="/feed" className="btn btn-primary w-full text-white mt-4">Find Connections</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-200 pt-28 pb-10 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <h1 className="text-2xl font-bold">My Connections</h1>
                    <div className="badge badge-primary badge-lg text-white">{connectionData.length}</div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {connectionData.map(connection => (
                        <ConnectionCard
                            key={connection._id}
                            connection={connection}
                            onClick={() => handleCardClick(connection._id)} // Pass handler
                            isLoading={isModalLoading} // Optional: show spinner on card if clicked
                        />
                    ))}
                </div>

                {/* --- MODAL --- */}
                {/* We render the modal only when we have data */}
                <ConnectionDetailModal
                    user={modalUser}
                    onClose={handleCloseModal}
                // No onReview needed for connections page
                />

                {/* Optional: Global Loading Overlay for Modal Fetch */}
                {isModalLoading && (
                    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Connections