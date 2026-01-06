import React from "react";
import { Link } from "react-router-dom";
import { FaCrown, FaRobot } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";

const PremiumStatusCard = ({ user }) => {
    return (
        <div className="card bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200 shadow-lg relative overflow-hidden">
            {/* Decorative Blur */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl"></div>

            <div className="card-body p-5 text-center items-center relative z-10">
                <div className="p-3 bg-white rounded-full shadow-sm mb-2 ring-4 ring-orange-50">
                    <FaCrown className="text-3xl text-yellow-600" />
                </div>

                <h2 className="card-title text-lg font-extrabold text-amber-900 uppercase tracking-wide">
                    {user?.memberShipType || "Premium"} Member
                </h2>

                <div className="badge badge-success gap-1 text-white font-bold text-xs py-2 px-3 my-2">
                    <IoCheckmarkCircle size={14} /> Active
                </div>

                <p className="text-xs text-amber-800/80 mb-4 px-2">
                    You have unlocked all advanced AI features.
                </p>

                {/* Direct Link to the AI Feature */}
                <Link
                    to="/ai-coach"
                    className="btn btn-sm w-full bg-white text-amber-700 hover:bg-amber-50 border-amber-200 shadow-sm gap-2"
                >
                    <FaRobot /> Launch AI Coach
                </Link>
            </div>
        </div>
    );
};

export default PremiumStatusCard;