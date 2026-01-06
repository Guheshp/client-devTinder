import React from 'react'
import { Link } from 'react-router-dom'
import { BsChatDots, BsGeoAlt, BsBriefcase } from 'react-icons/bs'
import { DEFAULT_IMG, skillList } from '../utils/helper/constant'

const ConnectionCard = ({ connection }) => {
    const {
        _id, firstName, lastName, age, gender,
        skills, photo, experienceLevel, location
    } = connection

    // --- Helpers ---
    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    // Helper to get skill names (Moved logic here for cleaner parent)
    const getSkillNames = (skillIds = []) => {
        if (!Array.isArray(skillIds)) return []
        const skillMap = new Map(skillList.map(skill => [skill.id, skill.name]))
        return skillIds.map(id => skillMap.get(id)).filter(Boolean)
    }

    const skillNames = getSkillNames(skills);

    return (
        <div className="card md:card-side bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-gray-100 p-4 items-center">

            {/* Avatar Section */}
            <figure className="md:w-24 flex-none m-0 flex items-center justify-center">
                <div className="avatar">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mt-3 ml-2">
                        <img
                            src={photo || DEFAULT_IMG}
                            alt={`${firstName} ${lastName}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </figure>

            {/* Info Section */}
            <div className="card-body py-2 px-4 md:px-6 flex-1 text-center md:text-left w-full">
                <h2 className="card-title text-xl font-bold justify-center md:justify-start text-gray-800">
                    {capitalize(firstName)} {capitalize(lastName)}
                    {age && <span className="text-sm font-normal text-gray-500 ml-1">({age})</span>}
                </h2>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 text-xs text-gray-500 mt-1">
                    {experienceLevel && (
                        <span className="flex items-center gap-1">
                            <BsBriefcase /> {capitalize(experienceLevel)}
                        </span>
                    )}
                    {location?.state && (
                        <span className="flex items-center gap-1">
                            <BsGeoAlt /> {capitalize(location.state)}, {location.country || 'India'}
                        </span>
                    )}
                </div>

                {/* Skills Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-3">
                    {skillNames.length > 0 ? (
                        skillNames.slice(0, 5).map((skill, index) => (
                            <span key={index} className="badge badge-ghost badge-sm text-gray-600 border-gray-300">
                                {skill}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400">No skills specified</span>
                    )}
                    {skillNames.length > 5 && (
                        <span className="text-xs text-gray-400 flex items-center">+{skillNames.length - 5} more</span>
                    )}
                </div>
            </div>

            {/* Action Section */}
            <div className="flex-none mt-4 md:mt-0 md:pl-4">
                <Link to={`/chat/${_id}`} className="btn btn-primary text-white gap-2 w-full md:w-auto px-6">
                    <BsChatDots className="text-lg" />
                    Message
                </Link>
            </div>
        </div>
    )
}

export default ConnectionCard