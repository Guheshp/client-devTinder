import React, { useEffect, useRef, useState } from 'react'
import { Base_URL, DEFAULT_IMG } from '../utils/helper/constant'
import { createSocketConnection } from '../utils/helper/socket'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { BsSendFill, BsArrowLeft, BsThreeDotsVertical } from 'react-icons/bs'

const Chat = () => {
    const { targetUserId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.user)

    const socketRef = useRef(null)
    const messagesEndRef = useRef(null) // For auto-scrolling

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [targetUserProfile, setTargetUserProfile] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // Scroll to bottom helper
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    // --- 1. Fetch Messages & Target User Info ---
    const fetchChatMessages = async () => {
        try {
            // Fetch the chat history
            const res = await axios.get(Base_URL + `/chat/${targetUserId}`, {
                withCredentials: true
            })

            // Format messages for UI
            const formattedMessages = res?.data?.chat?.messages?.map(msg => ({
                text: msg.text,
                sender: msg.senderId._id === user._id ? 'me' : 'other',
                createdAt: msg.createdAt // Keep timestamp if available
            })) || []

            setMessages(formattedMessages)

            // Optional: Fetch basic info about who we are talking to
            // You can also just extract this from the first 'other' message if your API supports it
            // For now, I'll assume we might need a separate call or just use a placeholder
            // If you have an API like /user/:id, call it here. Otherwise, use defaults.
            const userRes = await axios.get(Base_URL + `/user/${targetUserId}`, { withCredentials: true });
            setTargetUserProfile(userRes?.data?.data);

        } catch (error) {
            console.log('Error fetching chat:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchChatMessages()
    }, [targetUserId])

    // Auto-scroll when messages update
    useEffect(() => {
        scrollToBottom()
    }, [messages])


    /* ---------- CONNECT SOCKET ---------- */
    useEffect(() => {
        if (!user?._id || !targetUserId) return

        socketRef.current = createSocketConnection()

        socketRef.current.emit('joinChat', {
            userId: user._id,
            userName: user.firstName,
            targetUserId
        })

        socketRef.current.on('receiveMessage', msg => {
            setMessages(prev => [
                ...prev,
                {
                    ...msg,
                    sender: msg.senderId === user._id ? 'me' : 'other'
                }
            ])
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [user?._id, targetUserId])

    /* ---------- SEND MESSAGE ---------- */
    const sendMessage = () => {
        if (!message.trim()) return

        socketRef.current.emit('sendMessage', {
            text: message,
            userId: user._id,
            targetUserId,
            firstName: user.firstName,
        })

        // Optimistic UI update
        setMessages(prev => [
            ...prev,
            {
                text: message,
                sender: 'me',
                createdAt: new Date().toISOString()
            }
        ])

        setMessage('')
    }

    // Handle Enter key
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage()
    }

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-base-200">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        )
    }

    return (
        <div className="flex h-screen bg-base-200 pt-16 md:pt-20 pb-4 justify-center">
            <div className="flex flex-col w-full max-w-4xl bg-base-100 shadow-xl rounded-xl overflow-hidden h-[85vh] md:h-[90vh]">

                {/* --- HEADER --- */}
                <div className="bg-base-100 border-b border-base-200 px-4 py-3 flex items-center justify-between shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost btn-sm md:hidden">
                            <BsArrowLeft className="text-xl" />
                        </button>

                        <div className="avatar">
                            <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                <img
                                    src={targetUserProfile?.photo || DEFAULT_IMG}
                                    alt="User"
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold  leading-tight">
                                {targetUserProfile ? `${targetUserProfile.firstName} ${targetUserProfile.lastName || ''}` : 'Chat'}
                            </h3>
                            {/* <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block"></span> Online
                            </p> */}
                        </div>
                    </div>

                    {/* <button className="btn btn-ghost btn-circle btn-sm">
                        <BsThreeDotsVertical />
                    </button> */}
                </div>

                {/* --- MESSAGES AREA --- */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-100 relative">
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                            <p className="text-sm">No messages yet.</p>
                            <p className="text-xs">Say hello! 👋</p>
                        </div>
                    )}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat ${msg.sender === 'me' ? 'chat-end' : 'chat-start'}`}
                        >
                            <div className="chat-header text-xs opacity-50 mb-1">
                                {msg.sender === 'me' ? 'You' : targetUserProfile?.firstName || 'User'}
                            </div>

                            <div className={`chat-bubble shadow-sm ${msg.sender === 'me'
                                ? 'chat-bubble-primary text-white'
                                : 'bg-white text-gray-800 border border-gray-100'
                                }`}>
                                {msg.text}
                            </div>

                            {/* Simple Time Display (Optional) */}
                            {msg.createdAt && (
                                <div className="chat-footer opacity-50 text-[10px] mt-1">
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            )}
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* --- INPUT AREA --- */}
                <div className="p-3 bg-base-100 border-t border-base-200">
                    <div className="join w-full shadow-sm rounded-full overflow-hidden border border-gray-200 focus-within:border-primary transition-colors">
                        <input
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            className="input input-ghost join-item w-full focus:bg-transparent focus:outline-none px-6"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!message.trim()}
                            className="btn btn-primary join-item px-6 rounded-r-full"
                        >
                            <BsSendFill className={message.trim() ? "text-white" : "text-primary-content/50"} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat