import React, { useState } from 'react';
import axios from 'axios';
import {
    BsStars, BsRocketTakeoff, BsLightningFill, BsGraphUpArrow,
    BsYoutube, BsCheckCircleFill, BsMortarboard, BsCpuFill,
    BsTerminal, BsFire
} from 'react-icons/bs';
import { SiUdemy } from "react-icons/si";
import { FaRobot, FaBrain } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { Base_URL } from '../../utils/helper/constant';

const AiCoach = () => {
    const [roadmap, setRoadmap] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- API Call ---
    const generateRoadmap = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post(
                Base_URL + "/gemini/suggest-courses",
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                setRoadmap(res.data.data);
                toast.success("Roadmap generated successfully!");
            } else {
                toast.error(res.data.message || "Could not generate roadmap.");
            }
        } catch (error) {
            console.error(error);
            toast.error("AI Service is currently busy. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const openUdemy = (title) => {
        window.open(`https://www.udemy.com/courses/search/?q=${encodeURIComponent(title)}`, '_blank');
    };

    // ---------------- RENDER: LOADING STATE (Cyberpunk Spinner) ----------------
    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-8 bg-gray-50">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-t-4 border-blue-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-4 border-purple-500 rounded-full animate-spin animation-delay-200"></div>
                    <div className="absolute inset-4 border-l-4 border-pink-500 rounded-full animate-spin animation-delay-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaBrain className="text-4xl text-gray-700 animate-pulse" />
                    </div>
                </div>
                <div className="text-center">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                        Neural Network Processing...
                    </h2>
                    <p className="text-gray-500 mt-2">Analyzing your skills against 10,000+ job descriptions.</p>
                </div>
            </div>
        );
    }

    // ---------------- RENDER: LANDING STATE (Modern Hero) ----------------
    if (!roadmap) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 ">
                <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left Side: Content */}
                    <div className="p-10 md:w-1/2 flex flex-col justify-center space-y-6">
                        <div className="badge badge-primary badge-outline gap-2 p-3">
                            <BsStars className="text-yellow-500" /> AI-Powered Career Coach
                        </div>
                        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                            Level Up Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                Tech Stack
                            </span>
                        </h1>
                        <p className="text-gray-600 text-lg">
                            Don't guess what to learn. Let our AI analyze your profile and build a custom curriculum to get you hired.
                        </p>
                        <button
                            onClick={generateRoadmap}
                            className="btn btn-primary btn-lg shadow-lg shadow-blue-500/30 border-none bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition-transform"
                        >
                            <BsRocketTakeoff /> Generate My Roadmap
                        </button>
                    </div>

                    {/* Right Side: Visuals */}
                    <div className="md:w-1/2 bg-gray-900 p-10 flex flex-col justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-200"></div>

                        <div className="space-y-4 relative z-10">
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 flex items-center gap-4 text-white">
                                <div className="p-3 bg-red-500/20 rounded-lg text-red-400"><BsFire size={24} /></div>
                                <div>
                                    <h3 className="font-bold">Hot Skills</h3>
                                    <p className="text-xs text-gray-400">Target what's in demand</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 flex items-center gap-4 text-white ml-8">
                                <div className="p-3 bg-green-500/20 rounded-lg text-green-400"><BsGraphUpArrow size={24} /></div>
                                <div>
                                    <h3 className="font-bold">Career Growth</h3>
                                    <p className="text-xs text-gray-400">Salary optimization</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 flex items-center gap-4 text-white">
                                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400"><BsTerminal size={24} /></div>
                                <div>
                                    <h3 className="font-bold">Resource Finder</h3>
                                    <p className="text-xs text-gray-400">Curated tutorials</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- RENDER: DASHBOARD STATE ----------------
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10  pt-28 ">
            <div className="max-w-7xl mx-auto space-y-12 animate-fade-in-up">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            Your Personal <span className="text-blue-600">Action Plan</span>
                        </h1>
                        <p className="text-gray-500 mt-1">
                            We identified <span className="font-bold text-gray-800">{roadmap.mustHave?.length || 0} critical skills</span> missing from your arsenal.
                        </p>
                    </div>
                    <button onClick={generateRoadmap} className="btn btn-ghost hover:bg-gray-100 gap-2 mt-4 md:mt-0">
                        <BsStars className="text-purple-500" /> Regenerate
                    </button>
                </div>

                {/* 1. MUST HAVE (The "Action" Grid) */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
                            <BsLightningFill size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Immediate Priority</h2>
                            <p className="text-sm text-gray-500">Learn these to unlock 80% more opportunities.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roadmap.mustHave?.map((item, index) => (
                            <div key={index}
                                className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                            >
                                {/* Decorative Gradient Top Bar */}
                                <div className={`h-2 w-full bg-gradient-to-r ${index % 2 === 0 ? 'from-rose-500 to-orange-500' : 'from-purple-500 to-indigo-500'}`}></div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                                            {item.skill}
                                        </h3>
                                        <span className="badge badge-error badge-sm text-white whitespace-nowrap font-bold">HIGH IMPACT</span>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Why this matters</h4>
                                        <p className="text-gray-700 italic">"{item.reason}"</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <a href={item.youtube?.url} target="_blank" rel="noreferrer"
                                            className="btn btn-outline hover:bg-red-50 hover:text-red-600 hover:border-red-200 border-gray-200 gap-2 normal-case font-medium">
                                            <BsYoutube className="text-red-600 text-xl" /> Free Tutorial
                                        </a>
                                        <button onClick={() => openUdemy(item.udemy?.title)}
                                            className="btn bg-gray-900 hover:bg-black text-white gap-2 border-none normal-case font-medium shadow-lg shadow-gray-400/20">
                                            <SiUdemy className="text-purple-400 text-xl" /> Full Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-12 gap-8">
                    {/* 2. RECOMMENDED (Growth Track) */}
                    <div className="md:col-span-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                                <BsGraphUpArrow size={24} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Career Growth</h2>
                                <p className="text-sm text-gray-500">Skills that differentiate you from juniors.</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {roadmap.recommended?.map((item, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4 hover:border-blue-300 transition-all cursor-default">
                                    <div className="mt-1">
                                        <BsCheckCircleFill className="text-blue-500 text-xl opacity-20" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{item.skill}</h4>
                                        <p className="text-gray-500 mt-1 text-sm leading-relaxed">{item.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. GOOD TO KNOW (Side Quest) */}
                    <div className="md:col-span-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full">
                            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                                    <BsMortarboard size={20} />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900">Bonus Skills</h2>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {roadmap.goodToKnow?.map((item, index) => (
                                    <div key={index} className="badge badge-lg  bg-gray-50 border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-colors cursor-help tooltip" data-tip={item.reason}>
                                        {item.skill}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <div className="flex gap-2">
                                    <FaRobot className="text-blue-500 text-xl" />
                                    <p className="text-xs text-blue-800 font-medium">
                                        Pro Tip: Focus on the "Immediate Priority" section first. Don't get overwhelmed!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AiCoach;