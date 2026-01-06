import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaRobot, FaStar, FaCrown } from 'react-icons/fa';
import { Base_URL } from '../../utils/helper/constant';

const PremiumList = () => {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const verifyPremiumUser = async () => {
        try {
            const res = await axios.post(Base_URL + '/payment/premium/verify', {}, {
                withCredentials: true
            });
            // Assuming res.data.isPremium is boolean
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
            <div className="flex justify-center items-center min-h-[50vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // --- Already Premium UI ---
    if (isPremium) {
        return (
            <div className="flex justify-center mt-12 px-4">
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
                                <FaCheck /> AI Assistant
                            </div>
                            <div className="badge badge-success gap-2 p-3 text-white">
                                <FaCheck /> Verified Tick
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // --- Pricing Plans UI ---
    return (
        <div className="py-12 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-extrabold text-base-content sm:text-4xl">
                    Upgrade Your Experience
                </h2>
                <p className="mt-4 text-lg text-base-content/70">
                    Choose the plan that fits your networking needs.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

                {/* --- SILVER PLAN --- */}
                <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-gray-400 transition-all duration-300">
                    <div className="card-body">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold text-base-content">Silver</h3>
                                <p className="text-sm text-base-content/60 mt-1">Essential tools for networking</p>
                            </div>
                            <span className="badge badge-ghost font-semibold">Starter</span>
                        </div>

                        <div className="my-6">
                            <span className="text-4xl font-extrabold text-base-content">₹199</span>
                            <span className="text-base-content/60">/month</span>
                        </div>

                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">Chat with non-friends</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">Connect up to <strong>100 people</strong>/day</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-base-content/80">Blue Verified Badge</span>
                            </li>
                        </ul>

                        <div className="card-actions mt-8">
                            <button
                                onClick={() => handlePayment('silver')}
                                className="btn btn-outline btn-block hover:bg-gray-900 hover:text-white"
                            >
                                Get Silver
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- GOLD PLAN --- */}
                <div className="card bg-base-100 shadow-2xl border-2 border-yellow-400 relative transform hover:-translate-y-1 transition-all duration-300">

                    {/* Floating Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg flex items-center gap-1.5">
                            <FaStar className="text-yellow-100" /> Best Value
                        </span>
                    </div>

                    <div className="card-body bg-yellow-50/10">
                        <div className="flex justify-between items-start mt-2">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Gold</h3>
                                <p className="text-sm text-gray-500 mt-1">Unlock AI superpowers</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <FaRobot size={20} />
                            </div>
                        </div>

                        <div className="my-6">
                            <span className="text-4xl font-extrabold text-gray-900">₹499</span>
                            <span className="text-gray-500">/month</span>
                        </div>

                        <ul className="space-y-4 flex-1">
                            <li className="flex items-start gap-3 font-medium text-gray-900">
                                <div className="mt-1 text-yellow-500"><FaRobot /></div>
                                <span><strong>AI Assistant</strong> Access</span>
                            </li>
                            <li className="divider my-0 py-0"></li>
                            <li className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                Everything in Silver:
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-yellow-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">Chat with non-friends</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-yellow-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">Unlimited Connections</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700">Blue Verified Badge</span>
                            </li>
                        </ul>

                        <div className="card-actions mt-8">
                            <button
                                onClick={() => handlePayment('gold')}
                                className="btn border-none btn-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-md"
                            >
                                Upgrade to Gold
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PremiumList;