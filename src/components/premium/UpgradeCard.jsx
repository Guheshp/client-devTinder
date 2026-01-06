import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoDiamond, IoClose } from "react-icons/io5";
import { premiumFeatures } from "../../utils/helper/constant"; // Adjust path

const UpgradeCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Sidebar Card */}
            <div className="card bg-gradient-to-br from-gray-900 to-black text-white shadow-xl overflow-hidden relative border border-gray-700 group hover:border-yellow-600/50 transition-colors">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all"></div>

                <div className="card-body p-5 text-center items-center relative z-10">
                    <IoDiamond className="text-4xl text-yellow-400 mb-2 animate-pulse" />

                    <h2 className="card-title text-lg font-bold">Unlock AI Coach</h2>
                    <p className="text-xs text-gray-300 mb-4">
                        Get personalized career roadmaps & 10x connections.
                    </p>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-xs text-yellow-400 hover:text-yellow-300 underline mb-3 transition-colors"
                    >
                        View benefits
                    </button>

                    <Link
                        to="/premiumList"
                        className="btn btn-primary btn-sm w-full border-none bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow-lg hover:shadow-yellow-500/20"
                    >
                        Upgrade Now
                    </Link>
                </div>
            </div>

            {/* Reusable Modal Component */}
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
                        <button onClick={() => setIsModalOpen(false)} className="btn btn-circle btn-ghost btn-sm text-white hover:bg-gray-700">
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
                        <button className="btn btn-ghost hover:bg-gray-100" onClick={() => setIsModalOpen(false)}>
                            Maybe Later
                        </button>
                        <Link to="/premiumList" className="btn btn-primary px-8 text-white bg-gradient-to-r from-yellow-500 to-orange-500 border-none hover:shadow-lg">
                            View Plans
                        </Link>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsModalOpen(false)}>close</button>
                </form>
            </dialog>
        </>
    );
};

export default UpgradeCard;