import React, { useEffect, useRef } from 'react';
import {
    BsBriefcase,
    BsInfoCircle,
    BsX,
    BsPatchCheckFill,
    BsGem,
    BsLink45Deg,
    BsGeoAlt,
    BsEnvelopeAt,
    BsGenderAmbiguous,
    BsCalendarEvent,
    BsCodeSlash
} from 'react-icons/bs';
import { FaGithub, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';
import { DEFAULT_IMG } from '../../utils/helper/constant';

const ConnectionDetailModal = ({ user, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (user && modalRef.current) {
            modalRef.current.showModal();
        }
    }, [user]);

    const handleClose = () => {
        if (modalRef.current) modalRef.current.close();
        onClose();
    };

    if (!user) return null;

    const {
        firstName, lastName, age, gender, location, bio, photo,
        skills, experienceLevel, isPremium, memberShipType,
        linkedinUrl, twitterUrl, portfolioUrl, githubUrl, emailId
    } = user;

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1) || "";

    const getPlanInfo = (type) => {
        if (type === 'gold') return { badgeClass: 'badge-warning text-yellow-900', icon: <BsGem /> };
        if (type === 'silver') return { badgeClass: 'badge-ghost text-gray-600', icon: <BsGem /> };
        return null;
    };
    const planDetails = isPremium && memberShipType ? getPlanInfo(memberShipType) : null;

    return (
        <dialog ref={modalRef} id="connection-detail-modal" className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div className="modal-box w-11/12 max-w-2xl bg-base-100 p-0 overflow-hidden relative custom-scrollbar shadow-2xl">

                {/* --- HEADER (UNIFORM LAYOUT) --- */}
                <div className="bg-primary/5 p-6 relative shrink-0 border-b border-base-200">
                    <button onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-base-200 z-10">
                        <BsX className="text-2xl" />
                    </button>
                    <div className="flex flex-col sm:flex-row items-start gap-5">
                        <div className="avatar">
                            <div className={`w-24 h-24 rounded-full ring ring-offset-base-100 ring-offset-2 ${isPremium ? 'ring-warning' : 'ring-primary'}`}>
                                <img src={photo || DEFAULT_IMG} alt="Profile" className="object-cover w-full h-full" />
                            </div>
                        </div>
                        <div className="mt-1 space-y-2 w-full">
                            <div className="flex flex-wrap items-center gap-2">
                                <h3 className="font-bold text-2xl  flex items-center gap-2">
                                    {capitalize(firstName)} {capitalize(lastName)}
                                </h3>
                                {isPremium && <BsPatchCheckFill className="text-blue-500 text-xl" title="Premium Member" />}
                                {isPremium && planDetails && (
                                    <span className={`badge ${planDetails.badgeClass} badge-sm gap-1 text-xs uppercase font-bold ml-auto sm:ml-0`}>
                                        {planDetails.icon} {memberShipType}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                {experienceLevel && <span className="badge badge-outline bg-white gap-1 text-xs font-medium py-3 px-3"><BsBriefcase /> {capitalize(experienceLevel)} Dev</span>}
                                {age && <span className="badge badge-ghost gap-1 text-xs py-3"><BsCalendarEvent /> {age} yrs</span>}
                                {gender && <span className="badge badge-ghost gap-1 text-xs py-3"><BsGenderAmbiguous /> {capitalize(gender)}</span>}
                            </div>
                            <div className="text-sm text-gray-500 space-y-1 mt-1">
                                {location && (location.state || location.country) && (
                                    <div className="flex items-center gap-2"><BsGeoAlt className="text-gray-400" /><span>{capitalize(location?.state || "")}{location?.state && location?.country ? ", " : ""}{location?.country || ""}</span></div>
                                )}
                                {emailId && <div className="flex items-center gap-2"><BsEnvelopeAt className="text-gray-400" /><span>{emailId}</span></div>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- BODY (UNIFORM LAYOUT) --- */}
                <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
                    {(githubUrl || linkedinUrl || twitterUrl || portfolioUrl) && (
                        <div>
                            <h4 className="font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><BsLink45Deg className="text-xl" /> Social Presence</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline flex items-center gap-2 w-full"><FaGithub /> GitHub</a>}
                                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info flex items-center gap-2 w-full"><FaLinkedin /> LinkedIn</a>}
                                {twitterUrl && <a href={twitterUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-info flex items-center gap-2 w-full"><FaTwitter /> Twitter</a>}
                                {portfolioUrl && <a href={portfolioUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline btn-success flex items-center gap-2 w-full"><FaGlobe /> Portfolio</a>}
                            </div>
                        </div>
                    )}
                    <div>
                        <h4 className="font-bold  mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><BsInfoCircle /> About</h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap bg-base-200/50 p-4 rounded-xl border border-base-200">{bio || "No bio provided."}</p>
                    </div>
                    <div>
                        <h4 className="font-bold  mb-3 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70"><BsCodeSlash /> Skills & Tech</h4>
                        <div className="flex flex-wrap gap-2">{skills?.length > 0 ? skills.map((skill, i) => (<span key={i} className="badge badge-lg badge-outline py-4 px-4 hover:bg-primary hover:text-white cursor-default">{skill}</span>)) : <span className="text-gray-400 italic text-sm">No skills listed.</span>}</div>
                    </div>

                </div>

                {/* --- ACTIONS: CONNECTION SPECIFIC --- */}
                <div className="p-4 bg-base-100 border-t border-base-200 flex justify-end gap-3 shrink-0">
                    <button className="btn btn-ghost" onClick={handleClose}>
                        Close
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop"><button onClick={handleClose}>close</button></form>
        </dialog>
    );
};

export default ConnectionDetailModal;