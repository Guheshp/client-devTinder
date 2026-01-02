import React, { useState } from 'react'
import ChatConnectionsList from './ChatConnectionsList'
import ChatWindow from './ChatWindow'

const ChatPage = () => {
    const [activeUserId, setActiveUserId] = useState(null)
    const [chats, setChats] = useState([]) // Lifted state

    const moveChatToTop = (chatUserId, messageText) => {
        setChats(prev => {
            // Logic to move chat to top... (same as your code)
            const index = prev.findIndex(c => c.user?._id === chatUserId)
            if (index === -1) return prev

            // If we are currently chatting with this user, unread stays 0
            // If we are NOT chatting with them, increment unread (optional, handled by socket fetch usually)
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
            <div className={`bg-base-100 border-r w-full sm:w-1/3 ${activeUserId ? 'hidden sm:block' : 'block'}`}>
                <ChatConnectionsList
                    chats={chats}
                    setChats={setChats}
                    activeUserId={activeUserId}
                    setActiveUserId={setActiveUserId}
                />
            </div>

            <div className="hidden sm:flex flex-1 bg-base-100">
                {activeUserId ? (
                    <ChatWindow
                        targetUserId={activeUserId}
                        onNewMessage={moveChatToTop}
                    />
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
                        <p>Select a conversation</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ChatPage