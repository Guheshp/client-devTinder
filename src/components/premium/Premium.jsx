import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoDiamond, IoCheckmarkCircle } from "react-icons/io5";
import { FaCrown } from "react-icons/fa";
import { useUser } from "../../utils/helper/UserContext"; // Ensure this path is correct
import { premiumFeatures } from "../../utils/helper/constant";

const Premium = () => {
    // Assuming useUser() returns the user object directly, or { user }
    // Adjust based on your actual hook implementation (e.g., const { user } = useUser())
    const user = useUser();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- 1. VIEW IF USER IS ALREADY PREMIUM ---
    if (user?.isPremium) {
        return (
            <div className="card bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 shadow-lg relative overflow-hidden">
                {/* Decorative background blur */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/30 rounded-full blur-xl"></div>

                <div className="card-body p-5 text-center items-center relative z-10">
                    <div className="p-3 bg-white rounded-full shadow-sm mb-2">
                        <FaCrown className="text-3xl text-yellow-500" />
                    </div>

                    <h2 className="card-title text-lg font-extrabold text-amber-900 uppercase tracking-wide">
                        {user.memberShipType} Member
                    </h2>

                    <div className="badge badge-success gap-1 text-white font-bold text-xs py-2 px-3 my-2">
                        <IoCheckmarkCircle size={14} /> Active
                    </div>

                    <p className="text-xs text-amber-800/70">
                        You are enjoying exclusive access to all premium features.
                    </p>
                </div>
            </div>
        );
    }

    // --- 2. VIEW IF USER IS NOT PREMIUM (UPSELL) ---
    return (
        <>
            {/* Sidebar Card */}
            <div className="card bg-gradient-to-br from-gray-900 to-black text-white shadow-xl overflow-hidden relative border border-gray-700">
                {/* Decorative background circle */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>

                <div className="card-body p-5 text-center items-center relative z-10">
                    <IoDiamond className="text-4xl text-yellow-400 mb-2 animate-pulse" />

                    <h2 className="card-title text-lg font-bold">Go Premium</h2>
                    <p className="text-xs text-gray-300 mb-4">
                        Unlock exclusive features and 10x your connections today.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs text-yellow-400 hover:text-yellow-300 underline mb-3 transition-colors"
                    >
                        View benefits
                    </button>

                    <Link
                        to="/premiumList"
                        className="btn btn-primary btn-sm w-full border-none bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>

            {/* Benefits Modal */}
            <dialog className={`modal ${isModalOpen ? 'modal-open' : ''}`}>
                <div className="modal-box w-11/12 max-w-3xl bg-base-100 p-0 overflow-hidden shadow-2xl">

                    {/* Header */}
                    <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-500/20 rounded-lg">
                                <IoDiamond className="text-2xl text-yellow-500" />
                            </div>
                            <div>
                                <h3 className="font-bold text-xl">Premium Benefits</h3>
                                <p className="text-xs text-gray-400">Take your career to the next level</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-circle btn-ghost btn-sm text-white hover:bg-gray-700"
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Content Grid */}
                    <div className="p-6 grid gap-4 md:grid-cols-2 max-h-[60vh] overflow-y-auto bg-gray-50">
                        {premiumFeatures.map((feature, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md transition-all">
                                <div className="text-3xl text-primary mt-1">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-800">{feature.title}</h4>
                                    <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 bg-white border-t border-gray-100 flex justify-end gap-3">
                        <button
                            className="btn btn-ghost hover:bg-gray-100"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Maybe Later
                        </button>
                        <Link
                            to="/premiumList"
                            className="btn btn-primary px-8 text-white bg-gradient-to-r from-yellow-500 to-orange-500 border-none hover:shadow-lg"
                        >
                            View Plans
                        </Link>
                    </div>
                </div>

                {/* Click outside to close */}
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsModalOpen(false)}>close</button>
                </form>
            </dialog>
        </>
    );
};

export default Premium;