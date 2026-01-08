import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import toast from 'react-hot-toast'
import { removeUser } from '../../utils/redux/slices/userSlice'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'
import {
    BsChatDots, BsGem, BsSearch, BsBell, BsBoxArrowRight,
    BsPerson, BsPeople, BsPersonCheck
} from 'react-icons/bs'
import { createSocketConnection } from '../../utils/helper/socket'

const ProfileMenu = ({ userData }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation() // Detect current URL
    const [unreadCount, setUnreadCount] = useState(0)

    // --- 1. Fetch Logic ---
    const fetchUnreadCount = async () => {
        // If user is currently on the chat page, don't fetch count (keep it 0)
        if (location.pathname === '/chat') return;

        try {
            const res = await axios.get(`${Base_URL}/chat/unread-count`, { withCredentials: true })
            setUnreadCount(res?.data?.data || 0)
        } catch (err) {
            console.error("Error fetching unread count:", err)
        }
    }

    // --- 2. Socket & Initial Load Effect ---
    useEffect(() => {
        if (!userData?._id) return

        // A. Initial Fetch
        fetchUnreadCount()

        // B. Socket Setup
        const socket = createSocketConnection()

        // Handler to refresh count
        const handleUnreadUpdate = () => fetchUnreadCount()

        // Listen for events
        socket.on('unreadCountUpdated', handleUnreadUpdate) // Specific event
        socket.on('receiveMessage', handleUnreadUpdate)     // New message event

        // Cleanup
        return () => {
            socket.off('unreadCountUpdated', handleUnreadUpdate)
            socket.off('receiveMessage', handleUnreadUpdate)
            socket.disconnect()
        }
    }, [userData?._id])

    // --- 3. Route Change Effect (Clear Count) ---
    useEffect(() => {
        if (location.pathname === '/chat') {
            setUnreadCount(0)
        }
    }, [location.pathname])


    // --- Logout Handler ---
    const handleLogout = async () => {
        try {
            await axios.post(Base_URL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser())
            navigate("/")
            toast.success("Logged Out successfully")
        } catch (error) {
            console.error(error)
            toast.error("Logout failed")
        }
    }

    const isActive = (path) => location.pathname === path ? 'text-primary bg-primary/10' : 'text-gray-500 hover:bg-base-200'

    return (
        <div className="flex items-center gap-2 sm:gap-3 pr-2">
            {/* Mobile Search Button */}
            <button
                className="btn btn-ghost btn-circle btn-sm md:hidden"
                onClick={() => {
                    if (!userData.isPremium) toast("Upgrade to Premium to unlock Search!", { icon: '💎' })
                    else navigate("/search")
                }}
            >
                <BsSearch className="text-lg text-gray-500" />
            </button>

            {/* Notifications */}
            <Link
                to="#"
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    toast("Notifications feature coming soon!", { icon: "ℹ️" });
                }}
                className="btn btn-ghost btn-circle btn-sm relative"
            >
                <BsBell className="text-xl text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-base-100"></span>
            </Link>

            {/* Chat Icon with Badge */}
            <Link
                to="/chat"
                className={`btn btn-ghost btn-circle btn-sm transition-colors relative ${isActive('/chat')}`}
                title="Messages"
                // Immediate feedback on click
                onClick={() => setUnreadCount(0)}
            >
                <BsChatDots className="text-xl" />

                {/* Show Badge only if unreadCount > 0 AND not on chat page */}
                {unreadCount > 0 && location.pathname !== '/chat' && (
                    <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-error border-2 border-base-100"></span>
                        </span>
                    </span>
                )}
            </Link>

            {/* Avatar Dropdown */}
            <div className="flex items-center gap-3 border-l border-base-300 pl-3 ml-1">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar transition-transform hover:scale-105">
                        <div className={`w-9 h-9 rounded-full ring ring-offset-2 ${userData.isPremium ? 'ring-warning ring-offset-base-100' : 'ring-primary ring-offset-base-100'}`}>
                            <img alt="Profile" src={userData?.photo || DEFAULT_IMG} />
                        </div>
                    </div>

                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-xl bg-base-100 rounded-2xl w-60 border border-base-200">
                        <li className="menu-title text-gray-400 uppercase text-xs font-bold mt-1">
                            Signed in as <span className="text-base-content">{userData.firstName + " " + userData.lastName}</span>
                        </li>
                        <li><Link to="/profile" className="py-2"><BsPerson className="text-lg" /> Edit Profile</Link></li>
                        <li><Link to="/connections" className="py-2"><BsPeople className="text-lg" /> Connections</Link></li>
                        <li><Link to="/requests" className="py-2"><BsPersonCheck className="text-lg" /> Requests</Link></li>
                        {userData.isPremium && (
                            <li className="mt-1"><div className="bg-warning/10 text-warning"><BsGem /> Premium Member</div></li>
                        )}
                        <div className="divider my-1"></div>
                        <li><button onClick={handleLogout} className="text-error font-medium py-2"><BsBoxArrowRight className="text-lg" /> Logout</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProfileMenu