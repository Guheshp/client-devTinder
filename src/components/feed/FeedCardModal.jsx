import React from 'react'
import { BsChatDots, BsBriefcase, BsInfoCircle, BsX, BsPatchCheckFill, BsGem, BsLink45Deg } from 'react-icons/bs'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa' // 1. Import Icons
import { DEFAULT_IMG } from '../../utils/helper/constant';
import { useSelector } from 'react-redux';

const FeedCardModal = ({
    user,
    modalId,
    percentage,
    allSkillNames,
    commonSkillNames,
    onConnect,
    onIgnore,
    onChat
}) => {

    const loggedInUser = useSelector((state) => state.user.user);
    // 2. Destructure social links
    const { firstName, lastName, age, gender, location, bio, photo, isPremium, memberShipType, githubUrl, linkedinUrl, twitterUrl, portfolioUrl } = user;

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    const closeModal = () => document.getElementById(modalId).close();

    const getPlanInfo = (type) => {
        if (type === 'gold') return { price: '₹499', badgeClass: 'badge-warning' };
        if (type === 'silver') return { price: '₹199', badgeClass: 'badge-ghost' };
        return null;
    };
    const planDetails = isPremium && memberShipType ? getPlanInfo(memberShipType) : null;

    return (
        <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
            {/* Changed: w-full on mobile, max-w-3xl on desktop. Added max-height constraint */}
            <div className="modal-box w-full sm:w-11/12 max-w-3xl bg-base-100 p-0 overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="bg-primary/10 p-4 md:p-6 flex items-start gap-4 relative flex-shrink-0">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-10" onClick={closeModal}>
                        <BsX className="text-2xl" />
                    </button>
                    <div className="avatar">
                        <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${isPremium ? 'ring-blue-500' : 'ring-primary'}`}>
                            <img src={photo || DEFAULT_IMG} alt="Profile" className="object-cover" />
                        </div>
                    </div>
                    <div className="mt-1 md:mt-2 flex-1">
                        <h3 className="font-bold text-xl md:text-2xl flex flex-wrap items-center gap-2">
                            {capitalize(firstName)} {capitalize(lastName)}
                            {isPremium && <BsPatchCheckFill className="text-blue-500 text-lg md:text-xl" />}
                            <span className="badge badge-secondary text-xs">{percentage}% Match</span>
                        </h3>

                        {isPremium && planDetails && (
                            <div className="flex items-center gap-2 mt-1 mb-1">
                                <span className={`badge ${planDetails.badgeClass} badge-sm gap-1 text-xs uppercase font-bold`}>
                                    <BsGem /> {memberShipType}
                                </span>
                                <span className="text-xs text-gray-500 hidden sm:inline">Paid: {planDetails.price}</span>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2 text-xs md:text-sm text-gray-600">
                            <span>{age ? `${age} yrs` : ''}</span>
                            {gender && <span>• {capitalize(gender)}</span>}
                            {location?.state && <span>• {capitalize(location.state)}, {capitalize(location.country)}</span>}
                        </div>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-grow">

                    {/* --- SOCIAL LINKS SECTION --- */}
                    {(githubUrl || linkedinUrl || twitterUrl || portfolioUrl) && (
                        <div className="mb-6">
                            <h4 className="font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide text-gray-500"><BsLink45Deg className="text-lg" /> Social Presence</h4>
                            <div className="flex flex-wrap gap-3">
                                {githubUrl && (
                                    <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline gap-2">
                                        <FaGithub /> <span className="hidden sm:inline">GitHub</span>
                                    </a>
                                )}
                                {linkedinUrl && (
                                    <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info gap-2">
                                        <FaLinkedin /> <span className="hidden sm:inline">LinkedIn</span>
                                    </a>
                                )}
                                {twitterUrl && (
                                    <a href={twitterUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info gap-2">
                                        <FaTwitter /> <span className="hidden sm:inline">Twitter</span>
                                    </a>
                                )}
                                {portfolioUrl && (
                                    <a href={portfolioUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-success gap-2">
                                        <FaGlobe /> <span className="hidden sm:inline">Portfolio</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mb-6">
                        <h4 className="font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-wide text-gray-500"><BsInfoCircle /> About</h4>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {bio || "This user hasn't written a bio yet."}
                        </p>
                    </div>

                    <div className="mb-2">
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide text-gray-500">
                            <BsBriefcase /> Skills ({allSkillNames.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {allSkillNames.length > 0 ? (
                                allSkillNames.map((skill, index) => (
                                    <span key={index} className={`badge ${commonSkillNames.includes(skill) ? 'badge-accent text-white' : 'badge-outline'} badge-md md:badge-lg py-3`}>
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm">No skills added.</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="modal-action bg-base-200 p-4 m-0 flex flex-col-reverse sm:flex-row justify-between items-center gap-3 flex-shrink-0">
                    <button className="btn btn-ghost btn-sm sm:btn-md w-full sm:w-auto" onClick={onChat}>
                        <BsChatDots className="text-lg mr-2" /> Message
                    </button>
                    <div className="flex gap-3 w-full sm:w-auto">
                        <button className="btn btn-outline btn-error btn-sm sm:btn-md flex-1 sm:flex-none" onClick={() => { onIgnore(); closeModal(); }}>Ignore</button>
                        <button
                            className="btn btn-primary text-white btn-sm sm:btn-md flex-1 sm:flex-none px-8" onClick={() => { onConnect(); closeModal(); }}>Connect</button>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default FeedCardModal