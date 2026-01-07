import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'
import { createSocketConnection } from '../../utils/helper/socket'

const ChatConnectionsList = ({ activeUserId, setActiveUserId, chats, setChats }) => {
    const loggedInUserId = useSelector(state => state.user.user?._id)

    /* ---------------- FETCH CHAT LIST ---------------- */
    const fetchChats = async () => {
        try {
            const res = await axios.get(
                `${Base_URL}/chat/list`,
                { withCredentials: true }
            )
            setChats(res.data.data || [])
        } catch (err) {
            console.error('Chat list error', err)
        }
    }

    // Initial Load
    useEffect(() => {
        fetchChats()
    }, [])

    /* ---------------- SOCKET: UNREAD UPDATE ---------------- */
    useEffect(() => {
        if (!loggedInUserId) return

        const socket = createSocketConnection()

        const handleUnreadUpdate = () => {
            fetchChats()
        }

        socket.on('unreadCountUpdated', handleUnreadUpdate)
        socket.on('receiveMessage', handleUnreadUpdate)

        return () => {
            socket.off('unreadCountUpdated', handleUnreadUpdate)
            socket.off('receiveMessage', handleUnreadUpdate)
        }
    }, [loggedInUserId])

    /* ---------------- HANDLE CLICK ---------------- */
    const handleChatClick = (chat) => {
        setActiveUserId(chat.user._id)
        setChats(prev => prev.map(c =>
            c.chatId === chat.chatId
                ? { ...c, unreadCount: 0 }
                : c
        ))
    }

    /* ---------------- SORT BY RECENT MESSAGE ---------------- */
    const sortedChats = useMemo(() => {
        return [...chats].sort(
            (a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt)
        )
    }, [chats])

    // Helper to format time strictly using JS if timeago.js isn't installed
    const formatTime = (dateString) => {
        if (!dateString) return ''
        const date = new Date(dateString)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    return (
        <div className="h-full flex flex-col bg-base-100 ">
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-base-100/80 backdrop-blur-md sticky top-0 z-10">
                <h2 className="text-xl font-bold ">Chats</h2>
                <span className="badge badge-ghost text-xs font-semibold">{sortedChats.length}</span>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {sortedChats.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <p className="text-sm">No conversations yet</p>
                    </div>
                )}

                {sortedChats.map(chat => (
                    <div
                        key={chat.chatId}
                        onClick={() => handleChatClick(chat)}
                        className={`
                            group flex items-center gap-3 px-4 py-4 cursor-pointer transition-all duration-200 border-b 
                            hover:bg-base-100
                            ${activeUserId === chat.user._id ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}
                        `}
                    >
                        <div className="relative">
                            <img
                                src={chat.user.photo || DEFAULT_IMG}
                                className="w-12 h-12 rounded-full object-cover border border-base-200 group-hover:scale-105 transition-transform"
                                alt="User"
                            />
                            {/* Online Indicator Dot (Optional logic could go here) */}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                                <h4 className={`font-semibold text-sm truncate ${activeUserId === chat.user._id ? 'text-primary' : ''}`}>
                                    {chat.user.firstName} {chat.user.lastName}
                                </h4>
                                <span className="text-[10px] text-gray-400 shrink-0">
                                    {formatTime(chat.lastMessageAt)}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <p className={`text-xs truncate max-w-[85%] ${chat.unreadCount > 0 ? 'font-semibold text-gray-700' : 'text-gray-500'}`}>
                                    {chat.lastMessage || 'Start a conversation'}
                                </p>

                                {chat.unreadCount > 0 && (
                                    <span className="badge badge-primary badge-xs font-bold shadow-sm animate-pulse">
                                        {chat.unreadCount}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatConnectionsList