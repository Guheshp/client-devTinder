import React, { useEffect, useRef, useState } from 'react'
import { Base_URL, DEFAULT_IMG } from '../utils/helper/constant'
import { createSocketConnection } from '../utils/helper/socket'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Chat = () => {
    const { targetUserId } = useParams()
    const user = useSelector(state => state.user.user)

    const socketRef = useRef(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    const fetchChatMessages = async () => {
        try {

            const data = await axios.get(Base_URL + `/chat/${targetUserId}`, {
                withCredentials: true
            })

            console.log('Chat data:', data.data.chat.messages);

            const formattedMessages = data?.data?.chat?.messages?.map(msg => ({
                text: msg.text,
                sender: msg.senderId._id === user._id ? 'me' : 'other',
            }))

            setMessages(formattedMessages)

        } catch (error) {
            console.log('error', error)
        }
    }

    useEffect(() => {
        fetchChatMessages()
    }, [])


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

        setMessages(prev => [
            ...prev,
            {
                text: message,
                sender: 'me',
            }
        ])

        setMessage('')
    }

    return (
        <div className="flex h-screen bg-base-200 pt-20">
            <div className="flex flex-col w-full max-w-3xl mx-auto bg-base-100 shadow-lg">

                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b">
                    <img src={DEFAULT_IMG} className="w-10 h-10 rounded-full" />
                    <p className="font-semibold">Chat</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.sender === 'me'
                                ? 'justify-end'
                                : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${msg.sender === 'me'
                                    ? 'bg-primary text-white'
                                    : 'bg-base-300'
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p className="text-[10px] opacity-70 text-right">
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="flex gap-2 px-4 py-3 border-t">
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="input input-bordered w-full"
                    />
                    <button
                        onClick={sendMessage}
                        className="btn btn-primary"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat
