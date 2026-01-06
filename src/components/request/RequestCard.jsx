import React from 'react';
// 1. Import the verification icon (BsPatchCheckFill)
import { BsCheckCircleFill, BsXCircleFill, BsPatchCheckFill } from 'react-icons/bs';
import { DEFAULT_IMG } from '../../utils/helper/constant';

const RequestCard = ({ request, onReview, onClick }) => {
    const { fromUserId } = request;
    if (!fromUserId) return null;

    // 2. Destructure isPremium
    const {
        firstName,
        lastName,
        photo,
        skills,
        age,
        gender,
        isPremium
    } = fromUserId;

    const capitalize = (str) => str?.charAt(0).toUpperCase() + str?.slice(1);

    return (
        <div
            className="card md:card-side bg-base-100 shadow-xl transition-all hover:shadow-2xl border border-gray-100 p-4 items-center cursor-pointer group"
            onClick={() => onClick(fromUserId)}
        >
            {/* Image */}
            <figure className="md:w-16 flex-none m-0 flex items-center justify-center">
                <div className="avatar">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring ml-1 mt-3 ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden shrink-0 group-hover:ring-accent transition-all">
                        <img
                            src={photo || DEFAULT_IMG}
                            alt={`${firstName} ${lastName}`}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </figure>

            {/* Content */}
            <div className="card-body py-2 px-4 md:px-6 flex-1 text-center md:text-left">
                <h2 className="card-title text-xl font-bold justify-center md:justify-start group-hover:text-primary transition-colors flex items-center gap-1">
                    {firstName ? capitalize(firstName) : 'Unknown'} {lastName ? capitalize(lastName) : ''}

                    {/* 3. SHOW VERIFIED BADGE IF PREMIUM */}
                    {isPremium && (
                        <BsPatchCheckFill className="text-blue-500 text-lg ml-1" title="Verified User" />
                    )}

                    {age && <span className="text-sm font-normal text-gray-500 ml-1">({age})</span>}
                </h2>

                <p className="text-gray-600 text-sm">
                    {gender ? capitalize(gender) : 'Developer'}
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2">
                    {skills?.slice(0, 4).map((skill, index) => (
                        <span key={index} className="badge badge-ghost badge-xs text-gray-600">
                            {skill}
                        </span>
                    ))}
                    {skills?.length > 4 && (
                        <span className="text-xs text-gray-400">+{skills.length - 4} more</span>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-row md:flex-col justify-center items-center gap-2 mt-4 md:mt-0 md:border-l md:pl-6 border-gray-100">
                <button
                    className="btn btn-primary btn-xs md:btn-sm w-28 text-white gap-2 hover:scale-105 transition-transform"
                    onClick={(e) => { e.stopPropagation(); onReview("accepeted", request._id); }}
                >
                    <BsCheckCircleFill /> Accept
                </button>
                <button
                    className="btn btn-outline btn-error btn-xs md:btn-sm w-28 gap-2 hover:scale-105 transition-transform"
                    onClick={(e) => { e.stopPropagation(); onReview("rejected", request._id); }}
                >
                    <BsXCircleFill /> Reject
                </button>
            </div>
        </div>
    );
};

export default RequestCard;