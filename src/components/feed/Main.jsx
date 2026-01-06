import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import FeedCardPreview from './FeedCardPreview'
import FeedCardModal from './FeedCardModal'
import { calculateSkillMatch } from '../../utils/helper/skillMatch'
import { removeUserFromFeed } from '../../utils/redux/slices/feedSlice'
import { Base_URL, skillList } from '../../utils/helper/constant'

// Import the sub-components
const Main = ({ user }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loggedInUser = useSelector(state => state.user.user)
    if (!user) return null

    // --- 1. Unique ID for this user's modal ---
    const modalId = `modal_${user._id}`;

    // --- 2. Action Handlers ---
    const handleSendRequest = async (status) => {
        if (!user._id) return
        try {
            await axios.post(
                `${Base_URL}/request/send/${status}/${user._id}`,
                {},
                { withCredentials: true }
            )
            // Close modal if it's open
            const modal = document.getElementById(modalId);
            if (modal) modal.close();

            dispatch(removeUserFromFeed(user._id))
            toast.success(status === 'intrested' ? 'Request Sent!' : 'User Ignored')
        } catch (error) {
            console.error('Request failed:', error)
            toast.error('Action failed')
        }
    }

    const handleChatClick = async () => {
        try {
            const res = await axios.get(
                `${Base_URL}/user/is-connected/${user._id}`,
                { withCredentials: true }
            )
            if (res.data.isConnected) {
                navigate(`/chat/${user._id}`)
            } else {
                toast.error('🔒 Upgrade to Premium to chat with people outside your connections.')
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }

    const handleOpenModal = () => {
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
    }

    // --- 3. Data Calculation & Preparation ---

    // Convert Skill IDs to Names
    const allSkillNames = Array.isArray(user.skills)
        ? user.skills.map(id => skillList.find(s => s.id === id)?.name).filter(Boolean)
        : []

    // Calculate Match
    const mySkills = loggedInUser?.skills || []
    const otherSkills = user.skills || []
    const { percentage, commonSkills } = calculateSkillMatch(mySkills, otherSkills)

    const commonSkillNames = commonSkills
        .map(id => skillList.find(s => s.id === id)?.name)
        .filter(Boolean)

    // Prepare Preview Data (Limit 4)
    const PREVIEW_LIMIT = 4;
    const previewSkills = allSkillNames.slice(0, PREVIEW_LIMIT);
    const remainingSkillsCount = allSkillNames.length - PREVIEW_LIMIT;

    return (
        <>
            <FeedCardPreview
                user={user}
                percentage={percentage}
                previewSkills={previewSkills}
                remainingSkillsCount={remainingSkillsCount}
                commonSkillNames={commonSkillNames}
                onOpenModal={handleOpenModal}
                onConnect={() => handleSendRequest('intrested')}
                onIgnore={() => handleSendRequest('ignored')}
                onChat={handleChatClick}
            />

            <FeedCardModal
                user={user}
                modalId={modalId}
                percentage={percentage}
                allSkillNames={allSkillNames}
                commonSkillNames={commonSkillNames}
                onConnect={() => handleSendRequest('intrested')}
                onIgnore={() => handleSendRequest('ignored')}
                onChat={handleChatClick}
            />
        </>
    )
}

export default Main