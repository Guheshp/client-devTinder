import React from 'react'
import { Link } from 'react-router-dom'
import { BsGlobe } from 'react-icons/bs'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

const SocialLinksCard = ({ userData }) => {
    return (
        <div className="card bg-base-100 shadow-lg border border-base-200 overflow-hidden hidden md:block w-full">
            <div className="card-body p-4">
                <div className='flex justify-between items-center mb-2'>
                    <h3 className="font-bold text-gray-700 text-sm">Social Presence</h3>
                    <Link to="/profile" className="text-xs text-primary hover:underline">Edit</Link>
                </div>

                <div className="flex flex-col gap-2">
                    {/* GitHub */}
                    {userData?.githubUrl ? (
                        <a href={userData.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group">
                            <FaGithub className="text-lg text-gray-700 group-hover:text-black flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-black truncate">GitHub</span>
                        </a>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group opacity-60">
                            <FaGithub className="text-lg text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-400">Add GitHub</span>
                        </Link>
                    )}

                    {/* LinkedIn */}
                    {userData?.linkedinUrl ? (
                        <a href={userData.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group">
                            <FaLinkedin className="text-lg text-blue-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-700 truncate">LinkedIn</span>
                        </a>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group opacity-60">
                            <FaLinkedin className="text-lg text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-400">Add LinkedIn</span>
                        </Link>
                    )}

                    {/* Twitter / X */}
                    {userData?.twitterUrl ? (
                        <a href={userData.twitterUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group">
                            <FaTwitter className="text-lg text-blue-400 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-500 truncate">Twitter</span>
                        </a>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group opacity-60">
                            <FaTwitter className="text-lg text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-400">Add Twitter</span>
                        </Link>
                    )}

                    {/* Portfolio */}
                    {userData?.portfolioUrl ? (
                        <a href={userData.portfolioUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group">
                            <BsGlobe className="text-lg text-green-600 flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-green-700 truncate">Portfolio</span>
                        </a>
                    ) : (
                        <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors group opacity-60">
                            <BsGlobe className="text-lg text-gray-400 flex-shrink-0" />
                            <span className="text-sm text-gray-400">Add Portfolio</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SocialLinksCard