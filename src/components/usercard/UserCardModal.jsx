import React from 'react'
import { BsChatDots, BsBriefcase, BsInfoCircle, BsX, BsPatchCheckFill, BsGem, BsLink45Deg } from 'react-icons/bs'
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa' // 1. Import Icons
import { DEFAULT_IMG } from '../../utils/helper/constant';
import { useSelector } from 'react-redux';

const UserCardModal = ({
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
            <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-0 overflow-hidden">

                <div className="bg-primary/10 p-6 flex items-start gap-4 relative">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        <BsX className="text-2xl" />
                    </button>
                    <div className="avatar">
                        <div className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${isPremium ? 'ring-blue-500' : 'ring-primary'}`}>
                            <img src={photo || DEFAULT_IMG} alt="Profile" />
                        </div>
                    </div>
                    <div className="mt-2">
                        <h3 className="font-bold text-2xl flex items-center gap-2">
                            {capitalize(firstName)} {capitalize(lastName)}
                            {isPremium && <BsPatchCheckFill className="text-blue-500 text-xl" />}
                            <span className="badge badge-secondary text-xs">{percentage}% Match</span>
                        </h3>

                        {isPremium && planDetails && (
                            <div className="flex items-center gap-2 mt-1 mb-1">
                                <span className={`badge ${planDetails.badgeClass} badge-sm gap-1 text-xs uppercase font-bold`}>
                                    <BsGem /> {memberShipType}
                                </span>
                                <span className="text-xs text-gray-500">Paid: {planDetails.price}</span>
                            </div>
                        )}

                        <div className="flex flex-wrap gap-2 mt-2 text-sm text-gray-600">
                            <span>{age ? `${age} yrs` : ''}</span>
                            {gender && <span>• {capitalize(gender)}</span>}
                            {location?.state && <span>• {capitalize(location.state)}, {capitalize(location.country)}</span>}
                        </div>
                    </div>
                </div>

                <div className="p-6 max-h-[60vh] overflow-y-auto">

                    {/* --- 3. SOCIAL LINKS SECTION (New) --- */}
                    {(githubUrl || linkedinUrl || twitterUrl || portfolioUrl) && (
                        <div className="mb-6">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><BsLink45Deg /> Socials</h4>
                            <div className="flex gap-4">
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

                    <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2"><BsInfoCircle /> About</h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
                            {bio || "This user hasn't written a bio yet."}
                        </p>
                    </div>

                    <div className="mb-6">
                        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <BsBriefcase /> Skills ({allSkillNames.length})
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {allSkillNames.length > 0 ? (
                                allSkillNames.map((skill, index) => (
                                    <span key={index} className={`badge ${commonSkillNames.includes(skill) ? 'badge-accent text-white' : 'badge-outline'} badge-lg py-3`}>
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-gray-400 text-sm">No skills added.</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="modal-action bg-base-200 p-4 m-0 flex justify-between items-center">
                    <button className="btn btn-ghost" onClick={onChat}>
                        <BsChatDots className="text-lg mr-2" /> Message
                    </button>
                    <div className="flex gap-2">
                        <button className="btn btn-outline btn-error" onClick={() => { onIgnore(); closeModal(); }}>Ignore</button>
                        <button className="btn btn-primary text-white px-8" onClick={() => { onConnect(); closeModal(); }}>Connect</button>
                    </div>
                </div>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default UserCardModal