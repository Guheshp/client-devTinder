import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUndo, FaHistory, FaUserTimes, FaTimes, FaCheck, FaUserCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Base_URL, DEFAULT_IMG } from "../../utils/helper/constant";


const RewindCardUI = ({ isPremium, onOpen }) => {
    return (
        <div className={`w-full border rounded-xl shadow-md p-4 mt-4 transition-all hover:shadow-lg ${isPremium
            ? "bg-base-100 border-base-300"
            : "bg-gradient-to-br from-yellow-50 to-orange-50 border-orange-200"
            }`}>

            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-between gap-3">
                    <div className={`p-2 rounded-lg ${isPremium ? "bg-primary/10 text-primary" : "bg-orange-100 text-orange-600"}`}>
                        <FaUndo />
                    </div>
                    <div>
                        <h3 className={`font-bold text-sm uppercase tracking-wider ${isPremium ? "text-base-content" : "text-orange-900"}`}>
                            Rewind
                        </h3>
                    </div>
                </div>
                <p className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                    ACTIVE
                </p>
            </div>

            {/* Description */}
            <p className={`text-xs mb-4 leading-relaxed font-medium ${isPremium ? "text-base-content/70" : "text-orange-800/80"
                }`}>
                {isPremium
                    ? "Review developers you previously passed on. Connect with them or confirm your choice."
                    : "Made a mistake? Unlock Premium to see your ignored history and undo accidental swipes."
                }
            </p>

            {/* Main Button */}
            {isPremium ? (
                <button
                    onClick={onOpen}
                    className="btn btn-primary btn-sm w-full gap-2 shadow-sm"
                >
                    <FaHistory />
                    View Ignored History
                </button>
            ) : (
                <Link
                    to="/premium"
                    className="btn btn-warning btn-outline btn-sm w-full gap-2 bg-white hover:bg-orange-50 border-orange-300 text-orange-700 hover:text-orange-800"
                >
                    <FaHistory />
                    Unlock History
                </Link>
            )}
        </div>
    );
};

export default RewindCardUI;