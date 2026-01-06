import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'

import { Base_URL } from '../utils/helper/constant'
import { createSocketConnection } from '../utils/helper/socket'
import SideProfileSkeleton from './skeleton/SideProfileSkeleton'
import SideProfileCard from './sideprofile/SideProfileCard' // Adjust import path
import SocialLinksCard from './sideprofile/SocialLinksCard' // Adjust import path

const SideProfile = () => {
    const userData = useSelector(store => store.user.user)
    const [requestData, setRequestData] = useState([])
    const [connectionData, setConnectionData] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    // --- Actions ---
    const fetchUnreadCount = async () => {
        try {
            const res = await axios.get(`${Base_URL}/chat/unread-count`, { withCredentials: true })
            setUnreadCount(res?.data?.data || 0)
        } catch (err) {
            console.error(err)
        }
    }

    const handleShareProfile = () => {
        const profileUrl = `${window.location.origin}/profile/${userData?._id}`;
        navigator.clipboard.writeText(profileUrl);
        toast.success("Profile link copied to clipboard!");
    }

    // --- Effects ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const [connRes, reqRes] = await Promise.all([
                    axios.get(`${Base_URL}/user/connections`, { withCredentials: true }),
                    axios.get(`${Base_URL}/user/request/received`, { withCredentials: true }),
                ])
                setConnectionData(connRes.data.data || [])
                setRequestData(reqRes.data.data || [])

            } catch (error) {
                console.error("Error loading side profile:", error)
            } finally {
                setTimeout(() => setIsLoading(false), 500)
            }
        }

        if (userData) {
            fetchData()
            fetchUnreadCount()
        }
    }, [userData])

    // --- Socket ---
    useEffect(() => {
        if (!userData?._id) return
        const socket = createSocketConnection()
        socket.emit('userOnline', userData._id)

        const handleUnreadUpdate = () => fetchUnreadCount()
        socket.on('unreadCountUpdated', handleUnreadUpdate)

        return () => {
            socket.off('unreadCountUpdated', handleUnreadUpdate)
        }
    }, [userData?._id])

    // if (isLoading || !userData) return <SideProfileSkeleton />

    return (
        <div className="w-full flex flex-col gap-4">
            {/* 1. Main Profile Info */}
            <SideProfileCard
                userData={userData}
                stats={{
                    connectionCount: connectionData.length,
                    requestCount: requestData.length,
                    unreadCount: unreadCount
                }}
                onShare={handleShareProfile}
            />

            {/* 2. Social Links */}
            <SocialLinksCard userData={userData} />
        </div>
    )
}

export default SideProfile