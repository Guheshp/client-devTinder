import React from "react";
import { Link } from "react-router-dom";
import { FaCrown, FaRobot } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

const PremiumStatusCard = ({ user }) => {
    return (
        <div className="card w-full bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group">
            {/* Decorative Blur */}
            <div className="absolute -top-8 -right-8 w-28 h-28 bg-yellow-400/20 rounded-full blur-2xl group-hover:bg-yellow-400/30 transition-all duration-500"></div>

            <div className="card-body p-5 text-center items-center relative z-10">
                <div className="p-3 bg-white rounded-full shadow-sm mb-2 ring-4 ring-orange-50 animate-bounce-slow">
                    <FaCrown className="text-2xl text-yellow-600" />
                </div>

                <h2 className="card-title text-base font-extrabold text-amber-900 uppercase tracking-wide">
                    {user?.memberShipType || "Premium"} Member
                </h2>

                <div className="badge badge-success gap-1 text-white font-bold text-[10px] uppercase py-2 px-3 my-2 shadow-sm">
                    <IoCheckmarkCircle size={14} /> Active
                </div>

                <p className="text-xs text-amber-800/80 mb-4 px-2 font-medium">
                    You have unlocked all advanced AI features.
                </p>

                {/* Direct Link to the AI Feature */}
                <Link
                    to="/ai-coach"
                    className="btn btn-sm w-full bg-white text-amber-700 hover:bg-amber-50 hover:text-amber-800 border-amber-200 shadow-sm gap-2 font-bold"
                >
                    <FaRobot className="text-amber-600" /> Launch AI Coach
                </Link>
            </div>
        </div>
    );
};

export default PremiumStatusCard;