import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaRobot, FaStar, FaCrown, FaLock, FaUndo } from 'react-icons/fa';
import { Base_URL } from '../../utils/helper/constant';
import PremiumSkeleton from '../skeleton/PremiumSkeleton';

const PremiumList = () => {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // --- FUNCTIONALITY (UNCHANGED) ---
    const verifyPremiumUser = async () => {
        try {
            const res = await axios.post(Base_URL + '/payment/premium/verify', {}, {
                withCredentials: true
            });
            setIsPremium(!!res?.data?.isPremium);
        } catch (error) {
            console.error('Payment verification failed:', error);
            setIsPremium(false);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        verifyPremiumUser();
    }, []);

    const handlePayment = async (plan) => {
        try {
            const order = await axios.post(Base_URL + '/payment/create', {
                memberShipType: plan
            }, {
                withCredentials: true
            });

            const { keyId, amount, notes, orderId, currency } = order.data;

            const options = {
                key: keyId,
                amount: amount,
                currency: currency,
                name: 'DEV-TINDER',
                description: `Upgrade to ${plan} Plan`,
                order_id: orderId,
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.emailId,
                    contact: '9999999999'
                },
                theme: {
                    color: plan === 'gold' ? '#F59E0B' : '#374151'
                },
                handler: verifyPremiumUser
            };

            const rzp = new window.Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error("Payment initiation failed", error);
            alert("Unable to initiate payment. Please try again.");
        }
    }

    // --- Loading UI ---
    if (isLoading) {
        return (
            <PremiumSkeleton />
        );
    }

    // --- Already Premium UI ---
    if (isPremium) {
        return (
            <div className="flex justify-center mt-14 px-4">
                <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-success/20">
                    <div className="card-body text-center items-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                            <FaCrown className="text-3xl text-green-600" />
                        </div>
                        <h2 className="card-title text-2xl text-green-700">Premium Active</h2>
                        <p className="text-gray-500">
                            You are currently enjoying full access to all premium features.
                        </p>
                        <div className="mt-4 flex gap-2">
                            <div className="badge badge-success gap-2 p-3 text-white">
                                <FaCheck /> Verified
                            </div>
                            <div className="badge badge-success gap-2 p-3 text-white">
                                <FaRobot /> AI Coach
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Pricing Plans UI ---
    return (
        <div className="py-12 px-4 mt-14">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-base-content sm:text-4xl">
                    Upgrade Your Experience
                </h2>
                <p className="mt-4 text-lg text-base-content/70">
                    Select a plan to unlock the full potential of Dev Tinder.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* --- SILVER PLAN (ACTIVE & INCLUDES AI) --- */}
                <div className="card bg-base-100 shadow-xl border-2 border-primary/20 hover:border-primary transition-all duration-300 transform hover:-translate-y-1">
                    <div className="card-body">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-base-content">Silver Membership</h3>
                                <p className="text-sm text-base-content/60 mt-1">Unlock AI & Networking</p>
                            </div>
                            <span className="badge badge-primary font-semibold text-white">Best Seller</span>
                        </div>

                        <div className="my-6">
                            <span className="text-4xl font-extrabold text-base-content">₹199</span>
                            <span className="text-base-content/60">/month</span>
                        </div>

                        <ul className="space-y-4 flex-1">
                            {/* AI Feature */}
                            <li className="flex items-start gap-3 bg-base-200 p-2 rounded-lg">
                                <div className="mt-1 text-yellow-500"><FaRobot /></div>
                                <span className="text-base-content font-bold">AI Career Coach</span>
                            </li>

                            {/* Existing Features */}
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80 font-medium">Blue Verified Badge</span>
                            </li>

                            {/* 🔥 NEW FEATURE ADDED HERE */}
                            <li className="flex items-start gap-3">
                                <FaUndo className="text-orange-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80 font-medium">View & Restore Ignored Profiles</span>
                            </li>

                            <li className="flex items-start gap-3">
                                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">100 Connection Requests Per Day</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">Chat with anyone (No match needed)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">Search for specific users & skills</span>
                            </li>
                        </ul>

                        <div className="card-actions mt-8">
                            <button
                                onClick={() => handlePayment('silver')}
                                className="btn btn-primary btn-block text-white shadow-lg"
                            >
                                Get Silver Premium
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- GOLD PLAN (DISABLED / COMING SOON) --- */}
                <div className="card bg-base-200/50 shadow-inner border border-base-300 opacity-90 relative grayscale-[30%]">

                    {/* Coming Soon Overlay */}
                    <div className="absolute top-4 right-4">
                        <span className="badge badge-warning gap-1 p-3 font-bold uppercase tracking-wide">
                            <FaLock className="text-xs" /> Coming Soon
                        </span>
                    </div>

                    <div className="card-body">
                        <div className="flex justify-between items-start mt-2">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-500">Gold Pro Edition</h3>
                                <p className="text-sm text-gray-400 mt-1">Ultimate career acceleration</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                <FaStar size={20} />
                            </div>
                        </div>

                        <div className="my-6">
                            <span className="text-4xl font-extrabold text-gray-400">₹499</span>
                            <span className="text-gray-400">/month</span>
                        </div>

                        <ul className="space-y-4 flex-1 text-gray-500">
                            {/* Extended AI Features */}
                            <li className="flex items-start gap-3">
                                <div className="mt-1 text-yellow-600/50"><FaRobot /></div>
                                <span><strong>AI Resume Reviewer</strong> (Upload & Scan)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 text-yellow-600/50"><FaRobot /></div>
                                <span><strong>AI Mock Interview Bot</strong> (Voice enabled)</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="mt-1 text-yellow-600/50"><FaStar /></div>
                                <span>1-on-1 Mentorship Credits</span>
                            </li>
                            <li className="divider my-0 py-0"></li>
                            <li className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                Includes all Silver features
                            </li>
                        </ul>

                        <div className="card-actions mt-8">
                            <button
                                disabled
                                className="btn btn-disabled btn-block bg-base-300 text-gray-400"
                            >
                                Join Waitlist
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PremiumList;