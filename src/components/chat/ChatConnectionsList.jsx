import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'
import { createSocketConnection } from '../../utils/helper/socket'

// Receive activeUserId and setActiveUserId from props
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

        // Define the function so we can remove it specifically later
        const handleUnreadUpdate = () => {
            fetchChats()
        }

        // Listen for updates
        socket.on('unreadCountUpdated', handleUnreadUpdate)
        socket.on('receiveMessage', handleUnreadUpdate) // Also refresh list on new msg

        return () => {
            // ⚠️ CRITICAL FIX: Do NOT disconnect. Just turn off the listener.
            socket.off('unreadCountUpdated', handleUnreadUpdate)
            socket.off('receiveMessage', handleUnreadUpdate)
        }
    }, [loggedInUserId])

    /* ---------------- HANDLE CLICK (Optimistic Update) ---------------- */
    const handleChatClick = (chat) => {
        setActiveUserId(chat.user._id)

        // 🔥 INSTANTLY set count to 0 in UI without waiting for server/refresh
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

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b sticky top-0 bg-base-100 z-10">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                {sortedChats.length === 0 && (
                    <p className="text-sm text-gray-500 p-4">No chats yet</p>
                )}

                {sortedChats.map(chat => (
                    <div
                        key={chat.chatId}
                        onClick={() => handleChatClick(chat)} // Use new handler
                        className={`
                            flex items-center gap-3 px-4 py-3 cursor-pointer
                            hover:bg-base-200
                            ${activeUserId === chat.user._id ? 'bg-base-300' : ''}
                        `}
                    >
                        <img
                            src={chat.user.photo || DEFAULT_IMG}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div className="flex-1 border-b pb-2 min-w-0">
                            <div className="flex justify-between items-center">
                                <p className="font-medium truncate">
                                    {chat.user.firstName} {chat.user.lastName}
                                </p>

                                {/* 🔴 UNREAD COUNT */}
                                {chat.unreadCount > 0 && (
                                    <span className="badge badge-primary badge-sm">
                                        {chat.unreadCount}
                                    </span>
                                )}
                            </div>

                            <p className="text-xs text-gray-500 truncate">
                                {chat.lastMessage || 'Tap to chat'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatConnectionsList