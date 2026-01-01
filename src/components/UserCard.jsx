import React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Base_URL, DEFAULT_IMG, skillList } from '../utils/helper/constant'
import { removeUserFromFeed } from '../utils/redux/slices/feedSlice'
import { calculateSkillMatch } from '../utils/helper/skillMatch'
import { useNavigate } from 'react-router-dom'
import { BsChatDots } from 'react-icons/bs'
import toast from 'react-hot-toast'

const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    if (!user) return null

    const {
        _id,
        firstName = '',
        lastName = '',
        age,
        gender,
        experienceLevel,
        bio,
        skills = [],
        photo,
        location
    } = user
    const navigate = useNavigate()

    const capitalize = (str = '') =>
        str.charAt(0).toUpperCase() + str.slice(1)

    const handleSendRequest = async (status) => {
        if (!_id) return
        try {
            await axios.post(
                `${Base_URL}/request/send/${status}/${_id}`,
                {},
                { withCredentials: true }
            )
            dispatch(removeUserFromFeed(_id))
        } catch (error) {
            console.error('Request failed:', error)
        }
    }

    const handleChatClick = async () => {
        try {
            const res = await axios.get(
                `${Base_URL}/user/is-connected/${_id}`,
                { withCredentials: true }
            )

            if (res.data.isConnected) {
                navigate(`/chat/${_id}`)
            } else {
                toast.error(
                    '🔒 Upgrade to Premium to chat with people outside your connections.'
                )
            }
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    const skillNames = Array.isArray(skills)
        ? skills
            .map(id => skillList.find(s => s.id === id)?.name)
            .filter(Boolean)
        : []

    const loggedInUser = useSelector(state => state.user.user)

    const mySkills = loggedInUser?.skills || []
    const otherSkills = skills || []

    const { percentage, commonSkills } = calculateSkillMatch(
        mySkills,
        otherSkills
    )

    // convert IDs → names
    const commonSkillNames = commonSkills
        .map(id => skillList.find(s => s.id === id)?.name)
        .filter(Boolean)


    return (
        <div className="card bg-base-300 w-full max-w-sm shadow-xl">

            <figure className="pt-6">
                <img
                    src={photo || DEFAULT_IMG}
                    alt="User"
                    className="rounded-2xl w-52 h-52 object-cover"
                />
            </figure>

            <div className="card-body px-8 py-5 text-center">

                <h2 className="text-lg font-semibold">
                    {capitalize(firstName)} {capitalize(lastName)}
                </h2>

                <div className="mt-2 text-sm text-gray-500 space-y-0.5">
                    {age && <p>Age: {age} yrs</p>}
                    {gender && <p>Gender: {capitalize(gender)}</p>}
                    {experienceLevel && <p>Experience: {capitalize(experienceLevel)}</p>}
                    {location?.state && location?.country && (
                        <p>
                            Location: {capitalize(location.state)}, {capitalize(location.country)}
                        </p>
                    )}
                </div>

                {bio && (
                    <p className="mt-3 text-sm italic text-gray-600 line-clamp-3">
                        “{bio}”
                    </p>
                )}


                {/* 🔥 Skill Match */}
                <div className="mt-2 text-center">
                    <p className="text-sm font-semibold text-primary">
                        Match Score: {percentage}%
                    </p>

                    {commonSkillNames.length > 0 && (
                        <p className="text-xs text-gray-500 mt-0.5">
                            You both know: {commonSkillNames.join(', ')}
                        </p>
                    )}
                </div>

                <div className="w-full mt-4">
                    <p className="text-sm font-medium mb-2">Skills</p>

                    <div className="grid grid-cols-3 gap-2 max-h-[120px] overflow-y-auto">
                        {skillNames.length > 0 ? (
                            skillNames.map(skill => (
                                <span
                                    key={skill}
                                    className="badge badge-outline text-xs py-1.5 w-full justify-center"
                                >
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-400 text-xs col-span-3 text-center">
                                No skills added
                            </span>
                        )}
                    </div>
                </div>

                <div className="card-actions justify-center mt-5 gap-5">
                    <button
                        className="btn btn-outline btn-sm px-4"
                        onClick={handleChatClick}
                        title="Chat"
                    >
                        <BsChatDots className="text-lg" />
                    </button>

                    <button
                        className="btn btn-outline btn-sm px-6"
                        onClick={() => handleSendRequest('ignored')}
                    >
                        Ignore
                    </button>

                    {/* ✅ FIXED */}
                    <button
                        className="btn btn-primary btn-sm px-6"
                        onClick={() => handleSendRequest('intrested')}
                    >
                        Interested
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserCard
