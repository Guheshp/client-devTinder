import React from 'react'
import { BsChatDots, BsGeoAlt, BsBriefcase, BsInfoCircle, BsPatchCheckFill, BsGem } from 'react-icons/bs'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa'
import { DEFAULT_IMG } from '../../utils/helper/constant'
import { useUser } from '../../utils/helper/UserContext';

const FeedCardPreview = ({
    user,
    percentage,
    previewSkills,
    remainingSkillsCount,
    commonSkillNames,
    onOpenModal,
    onConnect,
    onIgnore,
    onChat
}) => {
    const userDetails = useUser()
    const loggedinUser = userDetails?._id
    const userId = user._id
    const isSameUser = loggedinUser === userId

    // Destructure user details
    const { firstName, lastName, age, experienceLevel, location, bio, photo, isPremium, memberShipType, githubUrl, linkedinUrl, twitterUrl, portfolioUrl, emailId } = user;

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    const getPlanInfo = (type) => {
        if (type === 'gold') return { price: '₹499', color: 'text-yellow-600 bg-yellow-100', iconColor: 'text-yellow-600' };
        if (type === 'silver') return { price: '₹199', color: 'text-gray-600 bg-gray-100', iconColor: 'text-gray-500' };
        return null;
    };

    const planDetails = isPremium && memberShipType ? getPlanInfo(memberShipType) : null;

    // Helper to stop modal from opening when clicking links/buttons
    const handleActionClick = (e, action) => {
        e.stopPropagation();
        if (action) action();
    };

    return (
        <div className="card bg-base-100 w-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col h-full rounded-2xl">

            <figure className="relative pt-6 px-6 cursor-pointer" onClick={onOpenModal}>
                <div className="avatar w-full flex justify-center">
                    <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full ring ring-offset-base-100 ring-offset-2 overflow-hidden ${isPremium ? 'ring-blue-500' : 'ring-primary'}`}>
                        <img
                            src={photo || DEFAULT_IMG}
                            alt="Profile"
                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </div>
                <div className="absolute top-6 right-6 badge badge-secondary shadow-md font-semibold text-xs md:text-sm p-3">
                    {percentage}% Match
                </div>
            </figure>

            <div className="card-body px-4 md:px-6 py-5 items-center text-center flex-grow">

                <div onClick={onOpenModal} className="cursor-pointer hover:text-primary transition-colors">
                    <h2 className="card-title text-xl md:text-2xl font-bold text-base-content justify-center items-center gap-1">
                        {capitalize(firstName)} {capitalize(lastName)}
                        {isPremium && (
                            <BsPatchCheckFill className="text-blue-500 text-lg flex-shrink-0" title="Verified Premium User" />
                        )}
                    </h2>
                    {emailId && <p className='text-xs md:text-sm font-normal text-gray-500 truncate max-w-[250px] mx-auto'>{emailId}</p>}
                </div>

                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500 mt-1 mb-2">
                    {experienceLevel && (
                        <span className="flex items-center gap-1 bg-base-200 px-2 py-1 rounded-md">
                            <BsBriefcase /> {capitalize(experienceLevel)}
                        </span>
                    )}
                    {location?.state && (
                        <span className="flex items-center gap-1 bg-base-200 px-2 py-1 rounded-md">
                            <BsGeoAlt /> {capitalize(location.state)}
                        </span>
                    )}
                </div>

                {/* --- SOCIAL LINKS --- */}
                {(githubUrl || linkedinUrl || twitterUrl || portfolioUrl) && (
                    <div className="flex gap-4 justify-center my-2">
                        {githubUrl && (
                            <a href={githubUrl} target="_blank" rel="noreferrer" onClick={(e) => handleActionClick(e)} className="text-gray-400 hover:text-black transition-colors text-xl">
                                <FaGithub />
                            </a>
                        )}
                        {linkedinUrl && (
                            <a href={linkedinUrl} target="_blank" rel="noreferrer" onClick={(e) => handleActionClick(e)} className="text-gray-400 hover:text-blue-600 transition-colors text-xl">
                                <FaLinkedin />
                            </a>
                        )}
                        {twitterUrl && (
                            <a href={twitterUrl} target="_blank" rel="noreferrer" onClick={(e) => handleActionClick(e)} className="text-gray-400 hover:text-blue-400 transition-colors text-xl">
                                <FaTwitter />
                            </a>
                        )}
                        {portfolioUrl && (
                            <a href={portfolioUrl} target="_blank" rel="noreferrer" onClick={(e) => handleActionClick(e)} className="text-gray-400 hover:text-green-500 transition-colors text-xl">
                                <FaGlobe />
                            </a>
                        )}
                    </div>
                )}

                <div className="w-full flex items-center justify-center cursor-pointer min-h-[3rem]" onClick={onOpenModal}>
                    {bio ? (
                        <p className="text-sm text-gray-600 line-clamp-3">"{bio}"</p>
                    ) : (
                        <p className="text-xs text-gray-400 italic">No bio available</p>
                    )}
                </div>

                <div className="w-full mt-6 mb-4">
                    <div className="flex flex-wrap justify-center gap-2 max-h-[60px] content-start overflow-hidden">
                        {previewSkills.length > 0 ? (
                            <>
                                {previewSkills.map((skill, index) => (
                                    <span key={index} className={`badge ${commonSkillNames.includes(skill) ? 'badge-accent text-white' : 'badge-ghost'} badge-sm`}>
                                        {skill}
                                    </span>
                                ))}
                                {remainingSkillsCount > 0 && (
                                    <span className="badge badge-neutral badge-sm cursor-pointer hover:bg-neutral-focus" onClick={(e) => handleActionClick(e, onOpenModal)}>
                                        +{remainingSkillsCount} more
                                    </span>
                                )}
                            </>
                        ) : (
                            <span className="text-xs text-gray-400">No skills listed</span>
                        )}
                    </div>
                </div>

                {/* --- ACTION BUTTONS --- */}
                <div className="card-actions w-full justify-between items-center mt-auto pt-3 border-t border-base-200">

                    {/* Left Side: Chat & Info */}
                    <div className="flex gap-1">
                        <button
                            className="btn btn-circle btn-sm md:btn-md btn-ghost text-gray-500 hover:text-primary hover:bg-base-200"
                            onClick={(e) => handleActionClick(e, onChat)}
                            title="Message User"
                        >
                            <BsChatDots className="text-lg md:text-xl" />
                        </button>
                        <button
                            className="btn btn-circle btn-sm md:btn-md btn-ghost text-gray-500 hover:text-info hover:bg-base-200"
                            onClick={(e) => handleActionClick(e, onOpenModal)}
                            title="View Full Profile"
                        >
                            <BsInfoCircle className="text-lg md:text-xl" />
                        </button>
                    </div>

                    {/* Right Side: Ignore/Connect */}
                    <div className="flex gap-2 md:gap-3">
                        <button className="btn btn-outline btn-error btn-sm px-3 md:px-5 rounded-full hover:scale-105 transition-transform" onClick={(e) => handleActionClick(e, onIgnore)}>
                            Ignore
                        </button>
                        <button className="btn btn-primary btn-sm px-3 md:px-5 rounded-full text-white hover:scale-105 transition-transform" onClick={(e) => handleActionClick(e, onConnect)}>
                            Connect
                        </button>
                    </div>
                </div>
            </div>

            {/* Premium Footer */}
            {isSameUser && isPremium && planDetails && (
                <div className={`px-6 py-2 rounded-b-xl flex justify-between items-center text-xs font-semibold ${planDetails.color}`}>
                    <div className="flex items-center gap-1 uppercase tracking-wide">
                        <BsGem className={planDetails.iconColor} />
                        {memberShipType} Member
                    </div>
                    <span>Paid: {planDetails.price}</span>
                </div>
            )}
        </div>
    )
}

export default FeedCardPreview