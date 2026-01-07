import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'
import { createSocketConnection } from '../../utils/helper/socket'
import {
    BsCheck, BsCheckAll, BsSendFill, BsThreeDotsVertical,
    BsX, BsPersonPlusFill, BsPersonCheckFill, BsInfoCircle
} from 'react-icons/bs'
import toast from 'react-hot-toast'

const ChatWindow = ({ targetUserId, onNewMessage }) => {
    const user = useSelector(state => state.user.user)
    const socketRef = useRef(null)
    const bottomRef = useRef(null)

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [targetUser, setTargetUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(new Set())

    // --- NEW STATE FOR MODAL & CONNECTION ---
    const [showModal, setShowModal] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('unknown') // 'unknown', 'connected', 'not_connected', 'pending'

    /* ---------------- FETCH CHAT ---------------- */
    useEffect(() => {
        if (!targetUserId || !user?._id) return

        axios
            .get(`${Base_URL}/chat/${targetUserId}`, { withCredentials: true })
            .then(res => {
                const formatted = res.data.chat.messages.map(msg => ({
                    _id: msg._id,
                    text: msg.text,
                    createdAt: msg.createdAt,
                    seen: msg.seen,
                    sender: msg.senderId?._id === user._id ? 'me' : 'other'
                }))
                setMessages(formatted)
            })
    }, [targetUserId, user?._id])

    /* ---------------- FETCH TARGET USER & CHECK CONNECTION ---------------- */
    useEffect(() => {
        if (!targetUserId) return

        const fetchData = async () => {
            try {
                // 1. Fetch User Data
                const userRes = await axios.get(`${Base_URL}/user/${targetUserId}`, { withCredentials: true })
                setTargetUser(userRes.data.data)

                // 2. Check Connection Status (Using your new API)
                // This determines if the button should be "Connect" or "Connected"
                const connectionRes = await axios.get(
                    `${Base_URL}/chat/is-connected/${targetUserId}`,
                    { withCredentials: true }
                )
                console.log('connectionRes', connectionRes)

                if (connectionRes.data.success) {
                    setConnectionStatus(connectionRes.data.isConnected ? 'connected' : 'not_connected')
                }

            } catch (error) {
                console.error("Error fetching chat details:", error)
                // If error occurs, we assume not connected so the user can try again
                setConnectionStatus('not_connected')
            }
        }
        fetchData()
    }, [targetUserId])

    /* ---------------- SOCKET INIT ---------------- */
    useEffect(() => {
        if (!user?._id) return
        socketRef.current = createSocketConnection()
        socketRef.current.emit('userOnline', user._id)
        socketRef.current.on('userStatus', ({ userId, online }) => {
            setOnlineUsers(prev => {
                const updated = new Set(prev)
                online ? updated.add(userId) : updated.delete(userId)
                return updated
            })
        })
        return () => socketRef.current.disconnect()
    }, [user?._id])

    /* ---------------- JOIN CHAT ---------------- */
    useEffect(() => {
        if (!socketRef.current || !targetUserId || !user?._id) return

        socketRef.current.emit('joinChat', { userId: user._id, targetUserId })

        const handleReceiveMessage = (msg) => {
            setMessages(prev => [
                ...prev,
                {
                    _id: msg._id,
                    text: msg.text,
                    createdAt: msg.createdAt,
                    seen: false,
                    sender: msg.senderId === user._id ? 'me' : 'other'
                }
            ])
            onNewMessage(msg.senderId, msg.text)

            if (msg.senderId !== user._id) {
                socketRef.current.emit('markSeen', { userId: user._id, targetUserId })
            }
        }

        const handleMessagesSeen = () => {
            setMessages(prev => prev.map(m => (m.sender === 'me' ? { ...m, seen: true } : m)))
        }

        socketRef.current.on('receiveMessage', handleReceiveMessage)
        socketRef.current.on('messagesSeen', handleMessagesSeen)

        return () => {
            socketRef.current.off('receiveMessage', handleReceiveMessage)
            socketRef.current.off('messagesSeen', handleMessagesSeen)
        }
    }, [targetUserId, user?._id])

    /* ---------------- MARK SEEN & SCROLL ---------------- */
    useEffect(() => {
        if (!socketRef.current || messages.length === 0) return
        socketRef.current.emit('markSeen', { userId: user._id, targetUserId })
    }, [messages])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    /* ---------------- ACTIONS ---------------- */
    const sendMessage = () => {
        if (!message.trim()) return
        socketRef.current.emit('sendMessage', { userId: user._id, targetUserId, text: message })
        onNewMessage(targetUserId, message)
        setMessage('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage()
    }

    // --- NEW: SEND CONNECTION REQUEST ---
    const sendConnectionRequest = async () => {
        try {
            await axios.post(`${Base_URL}/request/send/${targetUserId}`, {}, { withCredentials: true })
            toast.success("Connection Request Sent!")
            setConnectionStatus('pending')
        } catch (error) {
            // If error says "already exists", we mark as pending/connected
            if (error.response?.data?.message?.includes("already")) {
                toast.error("Request already sent or connected")
                setConnectionStatus('pending')
            } else {
                toast.error("Unable to send request. Please search for the user by name to connect In Home Page.");
            }
        }
    }

    return (
        <div className="flex flex-col h-full w-full bg-base-100 relative">

            {/* --- HEADER (CLICKABLE) --- */}
            <div
                onClick={() => setShowModal(true)}
                className="flex items-center justify-between px-4 py-3  border-b shadow-sm z-20 cursor-pointer hover:bg-base-300 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={targetUser?.photo || DEFAULT_IMG}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                            alt="Target User"
                        />
                        {onlineUsers.has(targetUserId) && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                    </div>
                    <div>
                        <p className="font-bold text-sm md:text-base">
                            {targetUser?.firstName} {targetUser?.lastName || ''}
                        </p>
                        <p className={`text-xs ${onlineUsers.has(targetUserId) ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                            {onlineUsers.has(targetUserId) ? 'Active now' : 'Offline'}
                        </p>
                    </div>
                </div>
                <button className="btn btn-ghost btn-circle btn-sm text-gray-500">
                    <BsThreeDotsVertical />
                </button>
            </div>

            {/* --- MESSAGES --- */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar">
                {messages.length === 0 && (
                    <div className="flex justify-center mt-10">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg text-xs text-gray-500 shadow-sm">
                            Start a conversation with {targetUser?.firstName}
                        </div>
                    </div>
                )}

                {messages.map((msg, idx) => {
                    const isMe = msg.sender === 'me';
                    return (
                        <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`relative max-w-[75%] md:max-w-[60%] px-4 py-2 shadow-sm text-sm ${isMe ? 'bg-primary text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white text-gray-800 rounded-r-2xl rounded-tl-2xl border border-gray-100'}`}>
                                <p className="leading-relaxed break-words">{msg.text}</p>
                                <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {isMe && (msg.seen ? <BsCheckAll className="text-white text-sm" /> : <BsCheck className="text-white/70 text-sm" />)}
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {/* --- INPUT --- */}
            <div className="p-3 bg-base-100 border-t border-gray-200">
                <div className="flex items-center gap-2 bg-base-100 px-4 py-2 rounded-full border focus-within:border-primary focus-within:bg transition-all">
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-500"
                        placeholder="Type a message..."
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className={`p-2 rounded-full transition-all ${message.trim() ? 'bg-primary text-white hover:scale-110 shadow-md' : 'bg-gray-200 text-gray-400 cursor-default'}`}
                    >
                        <BsSendFill className="text-sm" />
                    </button>
                </div>
            </div>

            {/* --- USER DETAILS MODAL --- */}
            {showModal && targetUser && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-base-100 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative">

                        {/* Modal Header / Banner */}
                        <div className="h-24 bg-gradient-to-r from-primary to-purple-600 relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost text-white hover:bg-white/20"
                            >
                                <BsX className="text-2xl" />
                            </button>
                        </div>

                        {/* Avatar & Content */}
                        <div className="px-6 pb-6 -mt-12 text-center">
                            <div className="avatar mb-4">
                                <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg bg-white">
                                    <img src={targetUser.photo || DEFAULT_IMG} className="object-cover" />
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold ">
                                {targetUser.firstName} {targetUser.lastName}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 mb-4">
                                {targetUser.experienceLevel ? `${targetUser.experienceLevel} Developer` : 'Developer'}
                                {targetUser.location?.country ? ` • ${targetUser.location.country}` : ''}
                            </p>

                            {/* Bio */}
                            <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 mb-6 text-left border border-gray-100">
                                <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold text-xs uppercase">
                                    <BsInfoCircle /> About
                                </div>
                                <p className="leading-relaxed">
                                    {targetUser.bio || "This user hasn't written a bio yet."}
                                </p>
                            </div>

                            {/* Action Button */}
                            {connectionStatus === 'connected' ? (
                                <button disabled className="btn btn-disabled w-full gap-2 rounded-full">
                                    <BsPersonCheckFill className="text-lg" /> Connected
                                </button>
                            ) : connectionStatus === 'pending' ? (
                                <button disabled className="btn btn-disabled w-full gap-2 rounded-full">
                                    <BsThreeDotsVertical /> Pending
                                </button>
                            ) : (
                                <button
                                    onClick={sendConnectionRequest}
                                    className="btn btn-primary w-full gap-2 rounded-full shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                                >
                                    <BsPersonPlusFill className="text-lg" /> Connect
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ChatWindow