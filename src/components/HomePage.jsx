import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    BsLightningChargeFill, BsX, BsHeartFill, BsCodeSlash, BsFilter, BsChatDotsFill, BsGithub
} from 'react-icons/bs'
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiSocketdotio } from "react-icons/si";

const HomePage = () => {
    const [text, setText] = useState("React")
    const skills = ["React", "Node.js", "DevOps", "MERN", "Java"]

    // Typing Effect
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            i = (i + 1) % skills.length;
            setText(skills[i]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-base-100 min-h-screen font-sans selection:bg-primary selection:text-white">

            {/* =====================================================================================
                1. HERO SECTION (The "Hook")
               ===================================================================================== */}
            <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

                {/* Animated Background Aura */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

                <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                    {/* LEFT: Text Content */}
                    <div className="text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <span className="w-2 h-2 bg-success rounded-full animate-ping"></span>
                            Live Production Build
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-tight text-base-content">
                            Find your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                {text}
                            </span> Duo.
                        </h1>

                        <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            A <span className="font-bold text-primary">Tinder-style</span> platform for developers.
                            Swipe, match, and chat with coders based on tech stack compatibility.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/login" className="btn btn-primary btn-lg h-14 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform text-white border-none">
                                Start Matching <BsLightningChargeFill />
                            </Link>
                            <a href="https://github.com/guheshp" target="_blank" className="btn btn-ghost btn-lg h-14 px-8 rounded-2xl border border-base-300">
                                <BsGithub className="text-xl" /> View Source
                            </a>
                        </div>
                    </div>

                    {/* RIGHT: Visual (The Interactive Card) */}
                    <div className="relative h-[500px] hidden lg:flex items-center justify-center">
                        {/* Background Depth Cards */}
                        <div className="absolute w-80 h-[420px] bg-base-300 rounded-3xl transform rotate-[-6deg] translate-x-[-20px] opacity-40 scale-95"></div>
                        <div className="absolute w-80 h-[420px] bg-base-200 rounded-3xl transform rotate-[-3deg] translate-x-[-10px] opacity-70 scale-95"></div>

                        {/* Front Active Card */}
                        <div className="relative w-80 bg-white dark:bg-neutral rounded-3xl shadow-2xl border border-base-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="h-52 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                                <div className="absolute bottom-[-40px] left-6 border-4 border-white dark:border-neutral rounded-full w-24 h-24 bg-base-100 overflow-hidden">
                                    <img src="https://i.pravatar.cc/300?img=12" alt="Dev" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="pt-12 px-6 pb-8">
                                <h3 className="text-2xl font-bold">Alex Chen <span className="text-blue-500 text-lg">✔</span></h3>
                                <p className="text-sm text-gray-500 font-medium">Full Stack • Google</p>

                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="badge badge-primary badge-outline text-xs">React</span>
                                    <span className="badge badge-secondary badge-outline text-xs">Node</span>
                                    <span className="badge badge-accent badge-outline text-xs">AWS</span>
                                </div>

                                {/* Fake Actions */}
                                <div className="flex gap-4 mt-8 justify-center">
                                    <button className="btn btn-circle btn-lg btn-outline btn-error hover:scale-110 hover:bg-error hover:text-white transition-all">
                                        <BsX className="text-3xl" />
                                    </button>
                                    <button className="btn btn-circle btn-lg btn-primary shadow-lg shadow-primary/40 hover:scale-110 hover:shadow-primary/60 transition-all text-white">
                                        <BsHeartFill className="text-2xl" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Match Badge */}
                        <div className="absolute top-10 right-0 bg-base-100 p-3 rounded-2xl shadow-xl border border-base-200 animate-bounce">
                            <span className="text-2xl">🔥</span> <span className="font-bold text-sm">It's a Match!</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================================================
                2. TECH STACK STRIP (Shows Technical Depth)
               ===================================================================================== */}
            <div className="bg-base-200/50 border-y border-base-200 py-6">
                <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="font-bold text-sm uppercase tracking-widest text-gray-400">Powered By:</span>
                    <div className="flex items-center gap-2 text-green-600"><SiMongodb size={24} /> <span className="font-bold">MongoDB</span></div>
                    <div className="flex items-center gap-2 text-gray-600"><SiExpress size={24} /> <span className="font-bold">Express</span></div>
                    <div className="flex items-center gap-2 text-blue-400"><SiReact size={24} /> <span className="font-bold">React</span></div>
                    <div className="flex items-center gap-2 text-green-500"><SiNodedotjs size={24} /> <span className="font-bold">Node.js</span></div>
                    <div className="flex items-center gap-2 text-gray-800"><SiSocketdotio size={24} /> <span className="font-bold">Socket.io</span></div>
                </div>
            </div>

            {/* =====================================================================================
                3. FEATURES (The "Product" Pitch)
               ===================================================================================== */}
            <div className="py-24 bg-base-100">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Under the hood</span>
                        <h2 className="text-3xl md:text-4xl font-black mt-2 text-base-content">
                            More than just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clone</span>.
                        </h2>
                        <p className="text-gray-500 mt-4">A fully functional social network built for the modern developer.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-primary transition-colors">
                            <div className="card-body items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl mb-4">
                                    <BsCodeSlash />
                                </div>
                                <h3 className="text-xl font-bold">Tech-Stack Matching</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Our algorithm filters profiles based on skills. Java devs meet Java devs. React meets Node.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-secondary transition-colors">
                            <div className="card-body items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-2xl mb-4">
                                    <BsChatDotsFill />
                                </div>
                                <h3 className="text-xl font-bold">Real-time Chat</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Instant messaging powered by <b>Socket.io</b>. Low latency connections to share code snippets.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="card bg-base-100 shadow-xl border border-base-200 hover:border-accent transition-colors">
                            <div className="card-body items-center text-center">
                                <div className="w-14 h-14 rounded-full bg-accent/10 text-accent flex items-center justify-center text-2xl mb-4">
                                    <BsFilter />
                                </div>
                                <h3 className="text-xl font-bold">Premium Features</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    Integrated <b>Razorpay</b> for Gold Membership. Unlock 'Rewind', Unlimited Swipes, and more.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* =====================================================================================
                4. FINAL CTA
               ===================================================================================== */}
            <div className="py-20 text-center bg-base-200/30">
                <h2 className="text-3xl font-black mb-6">Experience the Code.</h2>
                <Link to="/login" className="btn btn-primary btn-lg rounded-full px-12 shadow-2xl shadow-primary/50 text-white hover:scale-105 transition-transform">
                    Create Developer Profile
                </Link>
                <p className="mt-6 text-xs text-gray-400">
                    Live Demo Project by Guhesh Panjagall
                </p>
            </div>

        </div>
    )
}

export default HomePage