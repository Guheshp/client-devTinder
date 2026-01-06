import React from 'react';
import {
    BsBriefcase,
    BsInfoCircle,
    BsX,
    BsPatchCheckFill,
    BsGem,
    BsLink45Deg,
    BsGeoAlt,
    BsCheckCircleFill,
    BsXCircleFill
} from 'react-icons/bs';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { DEFAULT_IMG } from '../../utils/helper/constant';

// Added requestId prop
const UserDetailModal = ({ user, requestId, onClose, onReview }) => {
    // If no user is loaded yet, don't render anything (or render null)
    if (!user) return null;

    const {
        firstName,
        lastName,
        age,
        gender,
        location,
        bio,
        photo,
        skills,
        experienceLevel,
        isPremium,
        memberShipType,
        linkedinUrl,
        twitterUrl,
        portfolioUrl,
        githubUrl
    } = user;

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    const getPlanInfo = (type) => {
        if (type === 'gold') return { badgeClass: 'badge-warning text-yellow-900' };
        if (type === 'silver') return { badgeClass: 'badge-ghost text-gray-600' };
        return null;
    };
    const planDetails = isPremium && memberShipType ? getPlanInfo(memberShipType) : null;

    return (
        // Using standard <dialog> for easy showModal() / close() control
        <dialog id="user-detail-modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-0 overflow-hidden relative custom-scrollbar">

                {/* --- 1. HEADER SECTION --- */}
                <div className="bg-primary/10 p-6 flex items-start gap-5 relative shrink-0">
                    <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 hover:bg-base-200">
                        <BsX className="text-2xl" />
                    </button>

                    <div className="avatar">
                        <div className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${isPremium ? 'ring-warning' : 'ring-primary'}`}>
                            <img src={photo || DEFAULT_IMG} alt="Profile" className="object-cover w-full h-full" />
                        </div>
                    </div>

                    <div className="mt-1 space-y-1">
                        <h3 className="font-bold text-2xl flex items-center gap-2 text-gray-800">
                            {capitalize(firstName)} {capitalize(lastName)}
                            {isPremium && <BsPatchCheckFill className="text-blue-500 text-xl" title="Premium Member" />}
                        </h3>

                        {isPremium && planDetails && (
                            <div className="flex items-center gap-2">
                                <span className={`badge ${planDetails.badgeClass} badge-sm gap-1 text-xs uppercase font-bold`}>
                                    <BsGem /> {memberShipType}
                                </span>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 text-sm text-gray-600 items-center">
                            {age && <span>{age} yrs</span>}
                            {gender && <span>• {capitalize(gender)}</span>}
                            {location?.state && (
                                <span className="flex items-center gap-1">
                                    • <BsGeoAlt /> {capitalize(location.state)}, {capitalize(location.country)}
                                </span>
                            )}
                        </div>

                        {experienceLevel && (
                            <div className="pt-1">
                                <span className="badge badge-outline text-xs capitalize font-medium">
                                    {experienceLevel} Level
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- 2. SCROLLABLE BODY --- */}
                <div className="p-6 overflow-y-auto max-h-[50vh]">

                    {/* Social Links */}
                    {(linkedinUrl || twitterUrl || portfolioUrl || githubUrl) && (
                        <div className="mb-6">
                            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                                <BsLink45Deg className="text-xl" /> Socials
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                {githubUrl && (
                                    <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline gap-2">
                                        <FaGithub /> GitHub
                                    </a>
                                )}
                                {linkedinUrl && (
                                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info gap-2">
                                        <FaLinkedin /> LinkedIn
                                    </a>
                                )}
                                {twitterUrl && (
                                    <a href={twitterUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info gap-2">
                                        <FaTwitter /> Twitter
                                    </a>
                                )}
                                {portfolioUrl && (
                                    <a href={portfolioUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-success gap-2">
                                        <FaGlobe /> Portfolio
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Bio */}
                    <div className="mb-6">
                        <h4 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <BsInfoCircle /> About
                        </h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap bg-base-200/50 p-4 rounded-xl border border-base-200">
                            {bio || "This user hasn't written a bio yet."}
                        </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-2">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                            <BsBriefcase /> Skills ({skills?.length || 0})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {skills && skills.length > 0 ? (
                                skills.map((skill, index) => (
                                    <span key={index} className="badge badge-outline py-3 px-4 hover:bg-primary hover:text-white transition-colors cursor-default select-none">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm italic">No skills listed.</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- 3. FOOTER ACTIONS --- */}
                {/* We use requestId here to ensure we accept/reject the correct connection request */}
                {onReview && requestId && (
                    <div className="p-4 bg-base-100 border-t border-base-200 flex justify-end gap-3 shrink-0">
                        <button
                            className="btn btn-outline btn-error gap-2 px-6"
                            onClick={() => { onReview("rejected", requestId); onClose(); }}
                        >
                            <BsXCircleFill /> Reject
                        </button>
                        <button
                            className="btn btn-primary text-white gap-2 px-6"
                            onClick={() => { onReview("accepted", requestId); onClose(); }}
                        >
                            <BsCheckCircleFill /> Accept
                        </button>
                    </div>
                )}
            </div>

            {/* Backdrop click to close */}
            <form method="dialog" className="modal-backdrop">
                <button onClick={onClose}>close</button>
            </form>
        </dialog>
    );
};

export default UserDetailModal;