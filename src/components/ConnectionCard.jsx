import React from 'react'
import { Link } from 'react-router-dom'
// 1. Import the checkmark icon
import { BsChatDots, BsGeoAlt, BsBriefcase, BsPatchCheckFill } from 'react-icons/bs'
import { DEFAULT_IMG, skillList } from '../utils/helper/constant'

const ConnectionCard = ({ connection, onClick }) => {
    const {
        _id, firstName,
        lastName,
        photo,
        age,
        gender,
        skills,
        experienceLevel,
        location,
        bio,
        githubUrl,
        linkedinUrl,
        twitterUrl,
        portfolioUrl,
        isPremium,
        memberShipType,
        emailId
    } = connection
    console.log("connection", connection)

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    const getSkillNames = (skillIds = []) => {
        if (!Array.isArray(skillIds)) return []
        const skillMap = new Map(skillList.map(skill => [skill.id, skill.name]))
        return skillIds.map(id => skillMap.get(id)).filter(Boolean)
    }
    const skillNames = getSkillNames(skills);

    return (
        // Add onClick here to make the whole card clickable
        <div
            onClick={onClick}
            className="card md:card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-gray-100 p-4 items-center cursor-pointer group"
        >
            {/* Avatar */}
            <figure className="md:w-24 flex-none m-0 flex items-center justify-center">
                <div className="avatar">
                    {/* Added specific ring color for premium */}
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ring ${isPremium ? 'ring-accent' : 'ring-primary'} ring-offset-base-100 ring-offset-2 overflow-hidden mt-3 ml-2 group-hover:scale-105 transition-transform`}>
                        <img src={photo || DEFAULT_IMG} alt="Profile" className="object-cover w-full h-full" />
                    </div>
                </div>
            </figure>

            {/* Info */}
            <div className="card-body py-2 px-4 md:px-6 flex-1 text-center md:text-left w-full">
                {/* 2. Updated h2 layout for alignment */}
                <h2 className="card-title text-xl font-bold justify-center md:justify-start flex items-center flex-wrap gap-1">
                    {capitalize(firstName)} {capitalize(lastName)}

                    {/* 3. Conditionally render the blue tick */}
                    {isPremium && (
                        <BsPatchCheckFill
                            className="text-blue-500 text-lg shrink-0"
                            title={`Premium ${memberShipType || ''} Member`}
                        />
                    )}

                    {age && <span className="text-sm font-normal text-gray-500">({age})</span>}
                </h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-gray-500 mt-1">
                    {experienceLevel && (
                        <span className="flex items-center gap-1"><BsBriefcase /> {capitalize(experienceLevel)}</span>
                    )}
                    {location?.state && (
                        <span className="flex items-center gap-1"><BsGeoAlt /> {capitalize(location.state)}</span>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                    {skillNames.slice(0, 5).map((skill, index) => (
                        <span key={index} className="badge badge-ghost badge-sm text-gray-600 border-gray-300">{skill}</span>
                    ))}
                    {skillNames.length > 5 && <span className="text-xs text-gray-400">+{skillNames.length - 5} more</span>}
                </div>
            </div>

            {/* Action */}
            <div className="flex-none mt-4 md:mt-0 md:pl-4 z-10">
                <Link
                    to={`/chat/${_id}`}
                    className="btn btn-primary text-white gap-2 w-full md:w-auto px-6 hover:scale-105"
                    onClick={(e) => e.stopPropagation()} // STOP PROPAGATION HERE
                >
                    <BsChatDots className="text-lg" />
                    Message
                </Link>
            </div>
        </div>
    )
}

export default ConnectionCard