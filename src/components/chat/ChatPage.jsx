import React, { useState } from 'react'
import ChatConnectionsList from './ChatConnectionsList'
import ChatWindow from './ChatWindow'
import { BsChatSquareText } from 'react-icons/bs'

const ChatPage = () => {
    const [activeUserId, setActiveUserId] = useState(null)
    const [chats, setChats] = useState([])

    const moveChatToTop = (chatUserId, messageText) => {
        setChats(prev => {
            const index = prev.findIndex(c => c.user?._id === chatUserId)
            if (index === -1) return prev

            const updatedChat = {
                ...prev[index],
                lastMessage: messageText,
                lastMessageAt: new Date().toISOString()
            }

            const rest = prev.filter((_, i) => i !== index)
            return [updatedChat, ...rest]
        })
    }

    return (
        <div className="h-[calc(100vh-64px)] mt-16 bg-base-100 flex overflow-hidden shadow-lg rounded-lg max-w-[1600px] mx-auto border border-base-300">
            {/* Sidebar - Connection List */}
            <div className={`bg-base-100 border-r border-base-300 w-full sm:w-1/3 lg:w-1/4 flex flex-col ${activeUserId ? 'hidden sm:flex' : 'flex'}`}>
                <ChatConnectionsList
                    chats={chats}
                    setChats={setChats}
                    activeUserId={activeUserId}
                    setActiveUserId={setActiveUserId}
                />
            </div>

            {/* Main Chat Window */}
            <div className={`flex-1 bg-[#F3F4F6] relative ${activeUserId ? 'flex' : 'hidden sm:flex'}`}>
                {activeUserId ? (
                    <ChatWindow
                        targetUserId={activeUserId}
                        onNewMessage={moveChatToTop}
                    />
                ) : (
                    // Empty State UI
                    <div className="flex flex-1 flex-col items-center justify-center text-gray-400 bg-base-200/50 w-full">
                        <div className="w-24 h-24 bg-base-300 rounded-full flex items-center justify-center mb-4 animate-pulse">
                            <BsChatSquareText className="text-4xl text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-600">Your Messages</h3>
                        <p className="text-sm mt-2">Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatPage