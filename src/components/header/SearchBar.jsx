import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
    BsSearch, BsLockFill, BsArrowRight, BsX, BsInfoCircle,
    BsGithub, BsLinkedin, BsTwitter, BsGlobe, BsGenderAmbiguous, BsCalendar3
} from 'react-icons/bs'
import toast from 'react-hot-toast'
import { Base_URL, DEFAULT_IMG } from '../../utils/helper/constant'

// 1. Import the custom hook
import useDebounce from '../../utils/hooks/useDebounce'

const SearchBar = ({ userData }) => {
    const navigate = useNavigate()
    const searchRef = useRef(null)

    const [query, setQuery] = useState("")
    // 2. Create the debounced version of the query
    const debouncedQuery = useDebounce(query, 500) // 500ms delay

    const [suggestions, setSuggestions] = useState([])
    const [showDropdown, setShowDropdown] = useState(false)
    const [loading, setLoading] = useState(false)

    // --- MODAL STATE ---
    const [selectedUser, setSelectedUser] = useState(null)
    const [showModal, setShowModal] = useState(false)

    // Click Outside Hook
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowDropdown(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // 3. EFFECT: Depends on 'debouncedQuery' instead of 'query'
    // This effect runs ONLY when the user stops typing for 500ms
    useEffect(() => {
        // Guard clause: If not premium, or query is empty, clear results and exit
        if (!userData.isPremium) return;

        const fetchSuggestions = async () => {
            if (debouncedQuery.trim()) {
                setLoading(true)
                try {
                    const res = await axios.post(
                        `${Base_URL}/user/search`,
                        { query: debouncedQuery },
                        { withCredentials: true }
                    )
                    setSuggestions(res?.data?.data || [])
                    setShowDropdown(true)
                } catch (err) {
                    console.error("Search Error:", err)
                    setSuggestions([])
                } finally {
                    setLoading(false)
                }
            } else {
                setSuggestions([])
                setShowDropdown(false)
            }
        };

        fetchSuggestions();

    }, [debouncedQuery, userData.isPremium]) // Only re-run when debounced value changes

    // --- HANDLERS (Unchanged) ---
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (!userData.isPremium) return toast.error("Search is a Premium feature!", { icon: '💎' })
            setShowDropdown(false)
            if (query.trim()) navigate(`/search?query=${encodeURIComponent(query)}`)
        }
    }

    const handleOpenSearchModal = async (userId) => {
        try {
            const res = await axios.get(
                Base_URL + `/user/${userId}`,
                { withCredentials: true }
            )
            setSelectedUser(res?.data?.data)
            setShowModal(true)
            setShowDropdown(false)
            setQuery("") // Clear the input after selection if desired
        } catch (error) {
            console.error(error)
            toast.error("Could not fetch user details")
        }
    }

    return (
        <>
            <div className="flex-1 justify-end hidden md:flex relative" ref={searchRef}>
                <div className="relative w-full max-w-md group">
                    <input
                        type="text"
                        placeholder={userData.isPremium ? "Search skills or people..." : "Search is locked (Premium only)"}
                        className={`input input-sm input-bordered w-full pl-10 transition-all ${userData.isPremium
                            ? 'bg-base-100 focus:bg-base-100 focus:border-primary'
                            : 'bg-base-200/50 cursor-not-allowed text-gray-400 border-transparent'
                            }`}
                        value={query}
                        // Update local state immediately so input is responsive
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => { if (suggestions.length > 0) setShowDropdown(true) }}
                        onKeyDown={handleKeyDown}
                        disabled={!userData.isPremium}
                    />

                    <div className="absolute left-3.5 top-2">
                        {loading ? (
                            <span className="loading loading-spinner loading-xs text-primary"></span>
                        ) : userData.isPremium ? (
                            <BsSearch className="text-gray-400 group-focus-within:text-primary transition-colors" />
                        ) : (
                            <BsLockFill className="text-gray-400" />
                        )}
                    </div>

                    {!userData.isPremium && (
                        <div
                            className="absolute inset-0 cursor-pointer z-10"
                            onClick={() => toast("Upgrade to Premium to unlock Search!", { icon: '💎' })}
                        ></div>
                    )}

                    {/* DROPDOWN */}
                    {showDropdown && userData.isPremium && (
                        <div className="absolute top-full left-0 w-full bg-base-100 rounded-xl shadow-2xl border border-base-200 mt-2 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            {suggestions.length > 0 ? (
                                <>
                                    <div className="py-2">
                                        {suggestions.map((user) => (
                                            <div
                                                key={user._id}
                                                onClick={() => handleOpenSearchModal(user._id)}
                                                className="px-4 py-3 hover:bg-base-200 cursor-pointer flex items-center gap-3 transition-colors border-b border-base-100 last:border-0"
                                            >
                                                <div className="avatar">
                                                    <div className="w-10 h-10 rounded-full">
                                                        <img src={user.photo || DEFAULT_IMG} alt={user.firstName} />
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-sm text-gray-800">{user.firstName} {user.lastName}</h4>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{user.experienceLevel} • {user.skills?.[0] || "Developer"}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div
                                        onClick={() => navigate(`/search?query=${encodeURIComponent(query)}`)}
                                        className="px-4 py-3 bg-base-200/50 hover:bg-base-200 cursor-pointer text-center text-sm font-semibold text-primary flex items-center justify-center gap-2 border-t border-base-200"
                                    >
                                        See all results for "{query}" <BsArrowRight />
                                    </div>
                                </>
                            ) : (
                                !loading && query && (
                                    <div className="p-6 text-center text-gray-400 text-sm">No users found matching "{query}"</div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* --- USER DETAIL MODAL (Unchanged) --- */}
            {showModal && selectedUser && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto custom-scrollbar">

                        {/* Banner */}
                        <div className="h-24 bg-gradient-to-r from-primary to-secondary relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-2 right-2 btn btn-circle btn-sm btn-ghost text-white hover:bg-white/20"
                            >
                                <BsX className="text-2xl" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-6 pb-6 -mt-12 text-center">
                            {/* Avatar */}
                            <div className="avatar mb-3">
                                <div className="w-24 h-24 rounded-full ring-4 ring-white shadow-lg bg-white">
                                    <img src={selectedUser.photo || DEFAULT_IMG} className="object-cover" />
                                </div>
                            </div>

                            {/* Name & Title */}
                            <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                                {selectedUser.firstName} {selectedUser.lastName}
                            </h2>
                            <p className="text-sm text-gray-500 capitalize mt-1">
                                {selectedUser.experienceLevel} Developer
                                {selectedUser.location?.country ? ` • ${selectedUser.location.country}` : ''}
                            </p>

                            {/* Social Links Row */}
                            <div className="flex justify-center gap-4 my-4">
                                {selectedUser.githubUrl && (
                                    <a href={selectedUser.githubUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black transition-colors text-xl"><BsGithub /></a>
                                )}
                                {selectedUser.linkedinUrl && (
                                    <a href={selectedUser.linkedinUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-600 transition-colors text-xl"><BsLinkedin /></a>
                                )}
                                {selectedUser.twitterUrl && (
                                    <a href={selectedUser.twitterUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-400 transition-colors text-xl"><BsTwitter /></a>
                                )}
                                {selectedUser.portfolioUrl && (
                                    <a href={selectedUser.portfolioUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-purple-600 transition-colors text-xl"><BsGlobe /></a>
                                )}
                            </div>

                            {/* Info Badges (Age/Gender) */}
                            <div className="flex justify-center gap-3 mb-4 text-xs font-medium text-gray-500">
                                {selectedUser.age && (
                                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md">
                                        <BsCalendar3 /> {selectedUser.age} years
                                    </span>
                                )}
                                {selectedUser.gender && (
                                    <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md capitalize">
                                        <BsGenderAmbiguous /> {selectedUser.gender}
                                    </span>
                                )}
                            </div>

                            {/* Bio */}
                            <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600 mb-4 text-left border border-gray-100">
                                <div className="flex items-center gap-2 mb-1 text-gray-800 font-bold text-xs uppercase">
                                    <BsInfoCircle /> Bio
                                </div>
                                <p className="leading-relaxed line-clamp-3">
                                    {selectedUser.bio || "No bio available."}
                                </p>
                            </div>

                            {/* Skills */}
                            {selectedUser.skills && selectedUser.skills.length > 0 && (
                                <div className="mb-6 text-left">
                                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {selectedUser.skills.slice(0, 8).map((skill, index) => (
                                            <span key={index} className="badge badge-sm badge-outline border-gray-300 text-gray-600">
                                                {skill}
                                            </span>
                                        ))}
                                        {selectedUser.skills.length > 8 && (
                                            <span className="text-[10px] text-gray-400 self-center">+{selectedUser.skills.length - 8} more</span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Button */}
                            <button
                                onClick={() => toast("Working on profile page", { icon: "ℹ️" })}
                                className="btn btn-primary w-full rounded-full shadow-lg shadow-primary/20"
                            >
                                View Full Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchBar