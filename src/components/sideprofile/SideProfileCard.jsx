import React from 'react'
import { Link } from 'react-router-dom'
import { MdChat, MdPeople, MdPersonAdd } from 'react-icons/md'
import { BsPatchCheckFill, BsShareFill } from 'react-icons/bs'
import { DEFAULT_IMG, skillList } from '../../utils/helper/constant'

const SideProfileCard = ({ userData, stats, onShare }) => {
    // Helper to process skills for display
    const getSkillNames = (skills = []) => {
        if (!Array.isArray(skills)) return []
        return skills
            .map(s => {
                if (typeof s === 'object') return s.name;
                return skillList.find(list => list.id === s)?.name || s;
            })
            .filter(Boolean)
            .slice(0, 3)
    }

    const skillNames = getSkillNames(userData.skills);

    return (
        <div className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden w-full">
            {/* Header Banner */}
            <div className="h-16 bg-gradient-to-r from-primary/10 to-base-200"></div>

            <div className="px-4 pb-4 -mt-10 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="avatar online">
                    <div className={`w-20 md:w-20 lg:w-24 rounded-full ring ring-offset-2 bg-base-100 p-0.5 ${userData.isPremium ? 'ring-blue-500' : 'ring-base-100'}`}>
                        <img
                            src={userData.photo || DEFAULT_IMG}
                            alt="Profile"
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Name & Email */}
                <div className="mt-3 w-full px-1">
                    <Link
                        to="/profile"
                        className="font-bold text-lg text-base-content hover:text-primary transition-colors flex items-center justify-center gap-1 leading-tight"
                    >
                        <span className="truncate max-w-[180px]">
                            {userData.firstName} {userData.lastName}
                        </span>
                        {userData.isPremium && (
                            <BsPatchCheckFill className="text-blue-500 text-base flex-shrink-0" title="Verified Premium" />
                        )}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 truncate max-w-full">{userData.emailId}</p>
                </div>

                {/* Skills Chips */}
                <div className="flex flex-wrap justify-center gap-1 mt-3 w-full">
                    {skillNames.length > 0 ? (
                        skillNames.map((skill, idx) => (
                            <span key={idx} className="badge badge-ghost badge-xs text-gray-500 font-normal">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">Add skills in profile</span>
                    )}
                </div>
            </div>

            <div className="divider my-0"></div>

            {/* Menu Links */}
            <ul className="menu w-full p-2 text-sm font-medium text-gray-600 space-y-1">
                <li>
                    <Link to="/connections" className="flex items-center justify-between active:bg-primary/10 active:text-primary">
                        <div className="flex items-center gap-3">
                            <MdPeople className="text-xl text-primary" /> <span>Connections</span>
                        </div>
                        <span className="badge badge-ghost badge-sm">{stats.connectionCount}</span>
                    </Link>
                </li>
                <li>
                    <Link to="/requests" className="flex items-center justify-between active:bg-primary/10 active:text-primary">
                        <div className="flex items-center gap-3">
                            <MdPersonAdd className="text-xl text-primary" /> <span>Requests</span>
                        </div>
                        {stats.requestCount > 0 && (
                            <span className="badge badge-secondary badge-sm text-white">{stats.requestCount}</span>
                        )}
                    </Link>
                </li>
                <li>
                    <Link to="/chat" className="flex items-center justify-between active:bg-primary/10 active:text-primary">
                        <div className="flex items-center gap-3">
                            <MdChat className="text-xl text-primary" /> <span>Chat</span>
                        </div>
                        {stats.unreadCount > 0 && (
                            <span className="badge badge-error badge-sm text-white animate-pulse">{stats.unreadCount}</span>
                        )}
                    </Link>
                </li>
            </ul>

            <div className="p-3 border-t border-base-200">
                <button
                    onClick={onShare}
                    className="btn btn-sm btn-ghost w-full text-gray-500 hover:text-primary hover:bg-primary/10 gap-2 font-normal"
                >
                    <BsShareFill /> Share Profile
                </button>
            </div>
        </div>
    )
}

export default SideProfileCard