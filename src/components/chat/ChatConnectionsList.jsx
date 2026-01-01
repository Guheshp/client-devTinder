import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'

const ChatConnectionsList = ({
    chats,
    setChats,
    activeUserId,
    setActiveUserId
}) => {

    useEffect(() => {
        axios
            .get(`${Base_URL}/chat/list`, { withCredentials: true })
            .then(res => setChats(res?.data?.data || []))
    }, [])

    return (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b sticky top-0 bg-base-100 z-10">
                <h2 className="text-lg font-semibold">Chats</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
                {chats.map(chat => (
                    <div
                        key={chat.chatId}
                        onClick={() => setActiveUserId(chat.user._id)}
                        className={`
                            flex items-center gap-3 px-4 py-3 cursor-pointer
                            hover:bg-base-200
                            ${activeUserId === chat.user._id ? 'bg-base-300' : ''}
                        `}
                    >
                        <img
                            src={chat.user.photo || DEFAULT_IMG}
                            className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 border-b pb-2 min-w-0">
                            <p className="font-medium truncate">
                                {chat.user.firstName} {chat.user.lastName}
                            </p>
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
