import React from "react";
import { Link } from "react-router-dom";
import { FaCrown, FaRobot } from "react-icons/fa";

const PremiumStatusCard = ({ user }) => {
    return (
        <div className="w-full bg-gradient-to-r from-amber-50 to-orange-100 border border-amber-200 rounded-lg shadow-sm p-3">
            {/* Header: Status & Icon */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <FaCrown className="text-yellow-600" />
                    <span className="font-bold text-amber-900 text-sm uppercase tracking-wide">
                        {user?.memberShipType || "Premium"}
                    </span>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                    ACTIVE
                </span>
            </div>

            {/* Action Button */}
            <Link
                to="/ai-coach"
                className="btn btn-xs sm:btn-sm w-full bg-white text-amber-800 hover:bg-amber-50 border-amber-200 shadow-sm h-8 min-h-0 flex items-center gap-2"
            >
                <FaRobot className="text-amber-600" />
                <span>Launch AI Coach</span>
            </Link>
        </div>
    );
};

export default PremiumStatusCard;