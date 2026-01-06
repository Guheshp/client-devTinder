import React, { useState } from 'react';
import axios from 'axios';
import {
    BsStars, BsRocketTakeoff, BsLightningFill, BsGraphUpArrow,
    BsYoutube, BsPatchCheckFill, BsArrowRight
} from 'react-icons/bs';
import { SiUdemy } from "react-icons/si";
import { CgSpinner } from 'react-icons/cg';
import { FaRobot } from 'react-icons/fa6';
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
            )
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

    // --- Helpers ---
    // --- Helper: Robust YouTube Thumbnail Extractor ---
    const getThumbnail = (url) => {
        if (!url) return "https://via.placeholder.com/320x180?text=No+Thumbnail";

        // Regex to extract video ID from various YouTube URL formats (v=, embed, youtu.be)
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
            // Use 'hqdefault' (High Quality) instead of 'mqdefault' (Medium)
            return `https://img.youtube.com/vi/${match[2]}/hqdefault.jpg`;
        }

        return "https://via.placeholder.com/320x180?text=Invalid+Link";
    };

    const openUdemy = (title) => {
        window.open(`https://www.udemy.com/courses/search/?q=${encodeURIComponent(title)}`, '_blank');
    };

    // ---------------- RENDER: LOADING STATE ----------------
    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-6 bg-base-100">
                <div className="relative">
                    <div className="w-24 h-24 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <FaRobot className="text-4xl text-primary animate-pulse" />
                    </div>
                </div>
                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">Analyzing your profile...</h2>
                    <p className="text-gray-500 max-w-md">Our AI is scanning your skills and comparing them with top-tier industry standards.</p>
                </div>
            </div>
        );
    }

    // ---------------- RENDER: FRESH / LANDING STATE ----------------
    if (!roadmap) {
        return (
            <div className="min-h-screen bg-base-200 py-10 px-4 flex items-center justify-center">
                <div className="max-w-4xl w-full text-center space-y-8">

                    {/* Hero Icon */}
                    <div className="inline-flex p-6 bg-white rounded-full shadow-xl mb-4 relative">
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full animate-bounce">NEW</div>
                        <BsStars className="text-6xl text-yellow-500" />
                    </div>

                    {/* Headlines */}
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
                            Accelerate Your Career with <span className="text-primary">AI</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Stop guessing what to learn next. Our AI analyzes your current stack and builds a
                            <span className="font-semibold text-gray-800"> personalized curriculum </span>
                            to help you become a top-tier developer.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-left mt-8">
                        <div className="card bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                            <BsRocketTakeoff className="text-3xl text-blue-500 mb-3" />
                            <h3 className="font-bold text-gray-800">Skill Gap Analysis</h3>
                            <p className="text-sm text-gray-500">Identify exactly what you are missing to reach the next level.</p>
                        </div>
                        <div className="card bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                            <BsYoutube className="text-3xl text-red-500 mb-3" />
                            <h3 className="font-bold text-gray-800">Curated Resources</h3>
                            <p className="text-sm text-gray-500">Get specific, high-quality video tutorials and courses.</p>
                        </div>
                        <div className="card bg-white shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                            <BsGraphUpArrow className="text-3xl text-green-500 mb-3" />
                            <h3 className="font-bold text-gray-800">Career Growth</h3>
                            <p className="text-sm text-gray-500">Focus on skills that actually increase your market value.</p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                        <button
                            onClick={generateRoadmap}
                            className="btn btn-primary btn-lg px-10 text-lg shadow-xl shadow-primary/30 hover:scale-105 transition-transform"
                        >
                            <BsStars /> Generate My Roadmap
                        </button>
                        <p className="text-xs text-gray-400 mt-3">Powered by Google Gemini 2.5</p>
                    </div>
                </div>
            </div>
        );
    }

    // ---------------- RENDER: RESULTS / DASHBOARD STATE ----------------
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto space-y-10 animate-fade-in-up">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                            Your Personalized Roadmap
                            <span className="badge badge-warning text-xs font-bold gap-1"><FaRobot /> AI Generated</span>
                        </h1>
                        <p className="text-gray-500 mt-2">Based on your unique profile, prioritize these skills to level up.</p>
                    </div>
                    <button onClick={generateRoadmap} className="btn btn-outline btn-sm gap-2">
                        Refresh Analysis
                    </button>
                </div>

                {/* 1. MUST HAVE Section (Grid of Cards) */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="p-2 bg-red-100 text-red-600 rounded-lg"><BsLightningFill /></span>
                        Critical Focus Areas
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                        {roadmap.mustHave?.map((item, index) => (
                            <div key={index} className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                                {/* Thumbnail */}
                                <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                                    <img
                                        src={getThumbnail(item.youtube?.url)}
                                        alt={item.skill}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                    />
                                    <div className="absolute top-3 right-3 badge badge-error text-white font-bold shadow-sm">Must Have</div>
                                </div>

                                <div className="card-body p-6">
                                    <h3 className="card-title text-xl font-bold text-gray-800 mb-2">{item.skill}</h3>
                                    <p className="text-gray-600 text-sm mb-6 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        "{item.reason}"
                                    </p>

                                    <div className="grid grid-cols-2 gap-3 mt-auto">
                                        <a href={item.youtube?.url} target="_blank" rel="noreferrer"
                                            className="btn btn-error btn-outline btn-sm gap-2 hover:text-white">
                                            <BsYoutube className="text-lg" /> Watch Tutorial
                                        </a>
                                        <button onClick={() => openUdemy(item.udemy?.title)}
                                            className="btn btn-primary btn-sm gap-2 text-white bg-purple-600 hover:bg-purple-700 border-none">
                                            <SiUdemy className="text-lg" /> Udemy Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* 2. RECOMMENDED Section (Vertical List) */}
                    <section className="md:col-span-2">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><BsGraphUpArrow /></span>
                            Recommended Next Steps
                        </h2>
                        <div className="flex flex-col gap-3">
                            {roadmap.recommended?.map((item, index) => (
                                <div key={index} className="card bg-white border border-gray-100 p-4 shadow-sm hover:border-blue-200 transition-colors flex flex-row items-start gap-4">
                                    <div className="mt-1">
                                        <BsPatchCheckFill className="text-blue-500 text-xl" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 text-lg">{item.skill}</h4>
                                        <p className="text-sm text-gray-500 mt-1">{item.reason}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. GOOD TO KNOW Section (Compact) */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="p-2 bg-green-100 text-green-600 rounded-lg"><BsStars /></span>
                            Bonus Skills
                        </h2>
                        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full">
                            <div className="flex flex-col gap-4">
                                {roadmap.goodToKnow?.map((item, index) => (
                                    <div key={index} className="group">
                                        <div className="flex items-center justify-between mb-1 cursor-help">
                                            <span className="font-semibold text-gray-700 group-hover:text-green-600 transition-colors">
                                                {item.skill}
                                            </span>
                                            <BsArrowRight className="text-gray-300 group-hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all" />
                                        </div>
                                        <p className="text-xs text-gray-400 leading-snug">{item.reason}</p>
                                        {index !== roadmap.goodToKnow.length - 1 && <div className="divider my-2"></div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};
// Exporting cleanly if needed elsewhere
export default AiCoach;