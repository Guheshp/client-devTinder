import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'
import { createSocketConnection } from '../../utils/helper/socket'
import { BsCheck, BsCheckAll } from 'react-icons/bs'

const ChatWindow = ({ targetUserId, onNewMessage }) => {
    const user = useSelector(state => state.user.user)
    const socketRef = useRef(null)
    const bottomRef = useRef(null)

    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [targetUser, setTargetUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState(new Set())

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

    /* ---------------- FETCH TARGET USER ---------------- */
    useEffect(() => {
        if (!targetUserId) return

        axios
            .get(`${Base_URL}/user/${targetUserId}`, { withCredentials: true })
            .then(res => setTargetUser(res.data.data))
    }, [targetUserId])

    /* ---------------- SOCKET INIT (ONLY ONCE) ---------------- */
    useEffect(() => {
        if (!user?._id) return

        socketRef.current = createSocketConnection()

        // 🔥 tell server user is online
        socketRef.current.emit('userOnline', user._id)

        // 🔥 listen online/offline
        socketRef.current.on('userStatus', ({ userId, online }) => {
            setOnlineUsers(prev => {
                const updated = new Set(prev)
                online ? updated.add(userId) : updated.delete(userId)
                return updated
            })
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [user?._id])

    /* ---------------- JOIN CHAT + MESSAGE EVENTS ---------------- */
    /* Inside ChatWindow.jsx - Update the socket useEffect */

    useEffect(() => {
        if (!socketRef.current || !targetUserId || !user?._id) return

        socketRef.current.emit('joinChat', {
            userId: user._id,
            targetUserId
        })

        const handleReceiveMessage = (msg) => {
            setMessages(prev => [
                ...prev,
                {
                    _id: msg._id,
                    text: msg.text,
                    createdAt: msg.createdAt,
                    seen: false, // realtime msgs are unseen initially
                    sender: msg.senderId === user._id ? 'me' : 'other'
                }
            ])
            onNewMessage(msg.senderId, msg.text)

            // 🔥 If I am viewing this chat, mark it seen immediately via socket
            if (msg.senderId !== user._id) {
                socketRef.current.emit('markSeen', {
                    userId: user._id,
                    targetUserId
                })
            }
        }

        const handleMessagesSeen = () => {
            setMessages(prev =>
                prev.map(m => (m.sender === 'me' ? { ...m, seen: true } : m))
            )
        }

        socketRef.current.on('receiveMessage', handleReceiveMessage)
        socketRef.current.on('messagesSeen', handleMessagesSeen)

        return () => {
            // ⚠️ ONLY REMOVE LISTENERS, DO NOT DISCONNECT
            socketRef.current.off('receiveMessage', handleReceiveMessage)
            socketRef.current.off('messagesSeen', handleMessagesSeen)
        }
    }, [targetUserId, user?._id])

    /* ---------------- MARK SEEN ---------------- */
    useEffect(() => {
        if (!socketRef.current || messages.length === 0) return

        socketRef.current.emit('markSeen', {
            userId: user._id,
            targetUserId
        })
    }, [messages])

    /* ---------------- AUTO SCROLL ---------------- */
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    /* ---------------- SEND MESSAGE ---------------- */
    const sendMessage = () => {
        if (!message.trim()) return

        socketRef.current.emit('sendMessage', {
            userId: user._id,
            targetUserId,
            text: message
        })

        onNewMessage(targetUserId, message)
        setMessage('')
    }

    return (
        <div className="flex flex-col h-full w-full bg-base-100">

            {/* HEADER */}
            <div className="flex items-center gap-3 p-4 border-b">
                <img
                    src={targetUser?.photo || DEFAULT_IMG}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                    <p className="font-semibold">
                        {targetUser?.firstName} {targetUser?.lastName || ''}
                    </p>
                    <p className="text-xs flex items-center gap-1">
                        <span
                            className={`w-2 h-2 rounded-full ${onlineUsers.has(targetUserId)
                                ? 'bg-green-500'
                                : 'bg-gray-400'
                                }`}
                        />
                        <span className="text-gray-500">
                            {onlineUsers.has(targetUserId) ? 'Online' : 'Offline'}
                        </span>
                    </p>
                </div>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 py-3 bg-base-200 space-y-2">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`flex ${msg.sender === 'me'
                            ? 'justify-end'
                            : 'justify-start'
                            }`}
                    >
                        <div
                            className={`px-3 py-2 rounded-lg max-w-[75%] text-sm ${msg.sender === 'me'
                                ? 'bg-primary text-white'
                                : 'bg-base-100'
                                }`}
                        >
                            <p>{msg.text}</p>
                            <div className="text-[10px] opacity-70 text-right mt-1 flex gap-1 justify-end">
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                                {msg.sender === 'me' &&
                                    (msg.seen ? (
                                        <BsCheckAll className="text-blue-400" />
                                    ) : (
                                        <BsCheck className="text-gray-400" />
                                    ))}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="flex items-center gap-2 p-3 border-t">
                <input
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    className="input input-bordered w-full rounded-full"
                    placeholder="Type a message…"
                />
                <button
                    onClick={sendMessage}
                    className="btn btn-primary rounded-full px-6"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default ChatWindow
