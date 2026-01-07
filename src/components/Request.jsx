import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsPersonX } from 'react-icons/bs'

import { addRequest, removeRequest } from '../utils/redux/slices/requestSlice'
import { Base_URL } from '../utils/helper/constant'
import RequestSkeleton from './skeleton/RequestSkeleton'

import RequestCard from './request/RequestCard'
import RequestDetailModal from './request/RequestDetailModal'

const Request = () => {
    const dispatch = useDispatch()
    const requestData = useSelector((store) => store.request.request)

    const [modalUser, setModalUser] = useState(null)
    const [currentRequestId, setCurrentRequestId] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isModalLoading, setIsModalLoading] = useState(false)

    const fetchRequest = async () => {
        try {
            setIsLoading(true)
            const res = await axios.get(Base_URL + "/user/request/received", { withCredentials: true })
            const data = res?.data?.data
            dispatch(addRequest(data))
        } catch (error) {
            console.error("Error fetching requests:", error)
        } finally {
            setTimeout(() => setIsLoading(false), 300)
        }
    }

    const reviewRequest = async (status, requestId) => {
        try {
            await axios.post(`${Base_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true })
            dispatch(removeRequest(requestId))
            // If we accepted/rejected from within the modal, close it
            closeLocalModal()
        } catch (error) {
            console.error(`Error reviewing request (${status}):`, error)
        }
    }

    // 1. Handle Click: Just fetch data and update state
    const handleCardClick = async (userId, requestId) => {
        setIsModalLoading(true);
        setCurrentRequestId(requestId);

        try {
            const res = await axios.get(`${Base_URL}/user/${userId}`, { withCredentials: true });
            setModalUser(res?.data?.data);
            // Note: We don't open the modal here anymore. 
            // The useEffect below handles it once the DOM is ready.
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setIsModalLoading(false);
        }
    }

    // 2. Effect: Open Modal automatically when modalUser data is populated
    useEffect(() => {
        if (modalUser) {
            const modal = document.getElementById('user-detail-modal');
            if (modal) {
                modal.showModal();
            }
        }
    }, [modalUser]); // Runs whenever modalUser changes

    const closeLocalModal = () => {
        // We can just clear the user, which removes the modal from DOM (if your Modal returns null on no user)
        // Or strictly close the dialog first if needed.
        const modal = document.getElementById('user-detail-modal');
        if (modal) modal.close();
        setModalUser(null);
        setCurrentRequestId(null);
    }

    useEffect(() => {
        fetchRequest()
    }, [])

    if (isLoading) return <RequestSkeleton />

    if (!requestData || requestData.length === 0) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-base-200 pt-16'>
                <div className='text-center p-8'>
                    <div className="bg-gray-100 p-6 rounded-full inline-block mb-4">
                        <BsPersonX className="text-6xl text-gray-400" />
                    </div>
                    <h1 className='text-2xl font-bold text-gray-700'>No Pending Requests</h1>
                    <p className='text-gray-500 mt-2 max-w-md mx-auto'>
                        It looks quiet here. Keep exploring the feed to connect with more developers!
                    </p>
                    <Link to="/feed" className='btn btn-primary mt-6 text-white px-8'>
                        Explore Feed
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='min-h-screen bg-base-200 pt-28 pb-10 px-4 relative'>

            {/* Modal Component */}
            <RequestDetailModal
                user={modalUser}
                requestId={currentRequestId}
                onClose={closeLocalModal}
                onReview={reviewRequest}
            />

            {/* Spinner for Modal Loading */}
            {isModalLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            )}

            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                    Connection Requests
                    <span className="badge badge-primary badge-lg text-white">{requestData.length}</span>
                </h1>

                <div className="flex flex-col gap-4">
                    {requestData.map((request) => (
                        <RequestCard
                            key={request._id}
                            request={request}
                            onReview={reviewRequest}
                            // Pass the IDs securely via closure
                            onClick={() => handleCardClick(request?.fromUserId?._id, request?._id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Request