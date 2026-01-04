import React, { useState } from "react";
import { premiumFeatures } from "../../utils/helper/constant";
import { IoClose } from "react-icons/io5"; // Importing Close icon from react-icons
import { Link } from "react-router-dom";

const Premium = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="bg-base-300 flex items-center justify-center px-4 py-5 rounded-lg">
            <div className="w-full max-w-md bg-base-300 rounded-2xl text-center">

                {/* Header */}
                <h1 className="text-xl font-bold text-gray-900 mb-4">
                    Upgrade to Premium
                </h1>

                {/* Two Simple Sentences */}
                <div className="space-y-2 text-gray-600 mb-4">
                    <p>Unlock powerful networking features to expand your reach instantly.</p>
                    <p>Get priority access and grow your career faster than ever before.</p>
                </div>

                {/* "Still More" / View All Link */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium underline mb-8 block w-full"
                >
                    View all premium benefits
                </button>

                {/* Upgrade Button */}
                <Link to="/premiumList" className="w-full block bg-primary text-white py-2 rounded-lg font-medium transition">
                    Upgrade to Premium
                </Link>
            </div>

            {/* POPUP / MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-200">

                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center z-10">
                            <h2 className="text-xl font-bold text-gray-900">All Premium Features</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition"
                            >
                                {/* Using react-icons here */}
                                <IoClose size={24} />
                            </button>
                        </div>

                        {/* Modal Content (The original Cards) */}
                        <div className="p-6 grid gap-4 sm:grid-cols-2">
                            {premiumFeatures.map((feature, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl border bg-gray-50 p-4 text-left hover:bg-gray-100 transition"
                                >
                                    <div className="mb-2 text-2xl text-blue-600">{feature.icon}</div>
                                    <h3 className="text-md font-bold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t bg-gray-50">
                            <Link to="/premiumList" className="w-full block text-center bg-primary text-white py-2 rounded-lg font-medium transition">
                                Explore Premium Plans
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Premium;