
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUndo, FaHistory, FaUserTimes, FaTimes, FaCheck, FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_URL, DEFAULT_IMG } from "../../utils/helper/constant";
import { UserRowSkeleton } from "../skeleton/UserRowSkeleton";


// ==========================================
// 1. SUB-COMPONENT: Individual User Row
// ==========================================
const UserRow = ({ profile, onAction }) => {
    return (
        <div className="card card-side bg-base-100 shadow-sm border border-base-200 p-3 items-center hover:shadow-md transition-all group">
            {/* Avatar */}
            <div className="avatar">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full ring-2 ring-base-200 ring-offset-2">
                    <img src={profile.photo || DEFAULT_IMG} alt="Profile" />
                </div>
            </div>

            {/* Info */}
            <div className="flex-1 px-4 min-w-0">
                <h4 className="font-bold text-base text-base-content truncate">
                    {profile.firstName} {profile.lastName}
                </h4>
                <p className="text-xs text-base-content/60 truncate flex items-center gap-1">
                    {profile.experienceLevel || "Developer"}
                    <span className="opacity-50">•</span>
                    {profile.skills?.[0] || "Tech"}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                {/* Reject/Ignore Button */}
                {/* <button
                    onClick={() => onAction('rejected', profile._id)}
                    className="btn btn-ghost btn-sm text-base-content/60 hover:text-error hover:bg-error/10 gap-1 font-normal"
                >
                    <FaTimes /> <span className="hidden sm:inline">Ignore</span>
                </button> */}

                {/* Accept/Connect Button */}
                <button
                    onClick={() => onAction('intrested', profile._id)}
                    className="btn btn-primary btn-sm gap-2 shadow-sm text-white px-4"
                >
                    <FaUserCheck /> Connect
                </button>
            </div>
        </div>
    );
};

const HistoryModal = ({ onClose, loading, users, onAction }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-base-100 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-base-200 flex justify-between items-center bg-base-100">
                    <div>
                        <h3 className="font-bold text-xl text-base-content flex items-center gap-2">
                            <FaUserTimes className="text-error" /> Ignored Developers
                        </h3>
                        <p className="text-xs text-base-content/60 mt-1">
                            Decide to connect with them or keep them ignored.
                        </p>
                    </div>
                    <button onClick={onClose} className="btn btn-ghost btn-circle btn-sm">
                        <FaTimes className="text-lg" />
                    </button>
                </div>

                {/* List Body */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 bg-base-200/50">
                    {loading ? (
                        <UserRowSkeleton />
                    ) : users.length === 0 ? (
                        <div className="text-center py-12 flex flex-col items-center gap-3">
                            <div className="p-4 bg-base-200 rounded-full">
                                <FaHistory className="text-base-content/30 text-3xl" />
                            </div>
                            <p className="text-base-content/60 font-medium">No ignored users found.</p>
                        </div>
                    ) : (
                        users.map((profile) => (
                            <UserRow
                                key={profile._id}
                                profile={profile}
                                onAction={onAction}
                            />
                        ))
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-base-200 bg-base-100 flex justify-end">
                    <button onClick={onClose} className="btn btn-ghost">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistoryModal