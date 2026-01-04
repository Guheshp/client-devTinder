import axios from 'axios';
import React from 'react';
import { FaCheck, FaRobot, FaStar } from 'react-icons/fa'; // Importing icons
import { Base_URL } from '../../utils/helper/constant';

const PremiumList = () => {



    const handlePayment = async (plan) => {
        try {

            const order = await axios.post(Base_URL + '/payment/create', {
                memberShipType: plan
            }, {
                withCredentials: true
            });

            console.log('Order created:', order.data);
            const { keyId, amount, notes, orderId, currency } = order.data;

            const options = {
                key: keyId, // Enter the Key ID generated from the Dashboard
                amount: amount, // Amount is in currency subunits.
                currency: currency,
                name: 'DEV-TINDER',
                description: 'Conntect to the world',
                order_id: orderId,
                prefill: {
                    name: notes.firstName + ' ' + notes.lastName,
                    email: notes.emailId,
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };


            const rzp = new window.Razorpay(options);
            rzp.open();


        } catch (error) {

        }
    }


    return (
        <div className="bg-white mt-12 rounded-xl  ">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Choose Your Plan</h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                {/* SILVER PLAN */}
                <div className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition duration-300 flex flex-col">
                    <div className="mb-4">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                            Starter
                        </span>
                        <h3 className="text-3xl font-bold text-gray-900 mt-4">Silver</h3>
                        <p className="text-gray-500 mt-2">Essential tools to grow your network.</p>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                            <span>Chat with people who are <strong>not friends</strong></span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                            <span>Connect up to <strong>100 friends</strong> a day</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                            <span>Get the <strong>Blue Verified Tick</strong></span>
                        </li>
                    </ul>

                    <button onClick={() => handlePayment('silver')} className="w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-lg transition">
                        Choose Silver
                    </button>
                </div>

                {/* GOLD PLAN */}
                <div className="border-2 border-yellow-400 relative rounded-2xl p-6 shadow-xl flex flex-col bg-yellow-50/30">
                    {/* Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-2">
                            <FaStar /> Most Popular
                        </span>
                    </div>

                    <div className="mb-4 mt-2">
                        <h3 className="text-3xl font-bold text-gray-900 mt-4 flex items-center gap-2">
                            Gold
                        </h3>
                        <p className="text-gray-500 mt-2">Unlock the full power of AI.</p>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                        {/* The AI Feature (Highlighted) */}
                        <li className="flex items-start gap-3 text-gray-900 font-medium bg-yellow-100 p-2 rounded-lg -mx-2">
                            <FaRobot className="text-yellow-600 mt-1 flex-shrink-0 text-xl" />
                            <span>Full Access to <strong>AI Assistant</strong></span>
                        </li>

                        <li className="flex items-center gap-3 text-gray-600 text-sm">
                            <span className="font-semibold text-gray-400 uppercase tracking-wider">Includes all Silver features:</span>
                        </li>

                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-yellow-500 mt-1 flex-shrink-0" />
                            <span>Chat with non-friends</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-yellow-500 mt-1 flex-shrink-0" />
                            <span>100 Connections / day</span>
                        </li>
                        <li className="flex items-start gap-3 text-gray-700">
                            <FaCheck className="text-blue-500 mt-1 flex-shrink-0" />
                            <span>Blue Verified Tick</span>
                        </li>
                    </ul>

                    <button onClick={() => handlePayment('gold')} className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-lg transition shadow-md">
                        Upgrade to Gold
                    </button>
                </div>

            </div>
        </div>
    );
}

export default PremiumList;