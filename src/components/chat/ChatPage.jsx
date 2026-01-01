import React, { useState } from 'react'
import ChatConnectionsList from './ChatConnectionsList'
import ChatWindow from './ChatWindow'

const ChatPage = () => {
    const [activeUserId, setActiveUserId] = useState(null)
    const [chats, setChats] = useState([])

    const moveChatToTop = (chatUserId, messageText) => {
        setChats(prev => {
            const index = prev.findIndex(
                c => c.user?._id === chatUserId
            )
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
        <div className="h-[calc(100vh-64px)] mt-16 bg-base-200 flex overflow-hidden">

            {/* LEFT SIDEBAR */}
            <div
                className={`
                    bg-base-100 border-r transition-all duration-300
                    w-full sm:w-2/5 md:w-1/3 lg:w-1/4
                    ${activeUserId ? 'hidden sm:block' : 'block'}
                `}
            >
                <ChatConnectionsList
                    chats={chats}
                    setChats={setChats}
                    activeUserId={activeUserId}
                    setActiveUserId={setActiveUserId}
                />
            </div>

            {/* RIGHT CHAT WINDOW */}
            <div
                className={`
        flex-1 flex
        hidden sm:flex
        bg-base-100
    `}
            >
                {activeUserId ? (
                    <div className="w-full h-full">
                        <ChatWindow
                            targetUserId={activeUserId}
                            onNewMessage={moveChatToTop}
                        />
                    </div>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
                        <div className="text-lg font-medium">
                            Select a conversation
                        </div>
                        <p className="text-sm mt-1">
                            Choose a chat to start messaging
                        </p>
                    </div>
                )}
            </div>


        </div>
    )
}

export default ChatPage
