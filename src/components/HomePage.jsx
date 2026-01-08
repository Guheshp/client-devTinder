import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsRocketTakeoff, BsCodeSlash, BsGithub, BsHeartFill, BsLightningChargeFill } from 'react-icons/bs'

const HomePage = () => {
    // Simple Typing Effect State
    const [text, setText] = useState("React")
    const skills = ["React", "Node.js", "Python", "DevOps", "Web3"]

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

            {/* --- HERO SECTION --- */}
            <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

                {/* Background Gradients (The "Aura") */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700"></div>

                <div className="max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

                    {/* LEFT: Text Content */}
                    <div className="text-center lg:text-left space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-300 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <span className="w-2 h-2 bg-success rounded-full animate-ping"></span>
                            Live: 500+ Developers Online
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black leading-tight text-base-content">
                            Find your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                                {text}
                            </span> Duo.
                        </h1>

                        <p className="text-lg text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            Stop coding in isolation. Swipe through developers, filter by tech stack, and build your dream team today.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                            <Link to="/login" className="btn btn-primary btn-lg h-14 px-8 rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform text-white border-none">
                                Start Matching <BsLightningChargeFill />
                            </Link>
                            <a href="#how-it-works" className="btn btn-ghost btn-lg h-14 px-8 rounded-2xl border border-base-300 hover:bg-base-200">
                                How it works
                            </a>
                        </div>

                        {/* Trust Badges */}
                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Just simple text logos for clean look */}
                            <span className="font-bold text-xl flex items-center gap-2"><BsGithub /> GitHub</span>
                            <span className="font-bold text-xl">StackOverflow</span>
                            <span className="font-bold text-xl">Dev.to</span>
                        </div>
                    </div>

                    {/* RIGHT: Visual (The "Card Stack") */}
                    <div className="relative h-[500px] hidden lg:flex items-center justify-center">
                        {/* Back Card (Decoration) */}
                        <div className="absolute w-80 h-[400px] bg-base-300 rounded-3xl transform rotate-[-6deg] translate-x-[-20px] opacity-40"></div>
                        <div className="absolute w-80 h-[400px] bg-base-200 rounded-3xl transform rotate-[-3deg] translate-x-[-10px] opacity-70"></div>

                        {/* Front Card (Main Visual) */}
                        <div className="relative w-80 bg-white dark:bg-neutral rounded-3xl shadow-2xl border border-base-200 overflow-hidden transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                                <div className="absolute bottom-[-40px] left-6 border-4 border-white dark:border-neutral rounded-full w-24 h-24 bg-base-100 overflow-hidden">
                                    <img src="https://i.pravatar.cc/300?img=12" alt="Dev" />
                                </div>
                            </div>
                            <div className="pt-12 px-6 pb-6">
                                <h3 className="text-2xl font-bold">Alex Chen <span className="text-blue-500 text-lg">✔</span></h3>
                                <p className="text-sm text-gray-500">Full Stack • Google</p>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="badge badge-primary badge-outline">React</span>
                                    <span className="badge badge-secondary badge-outline">Node</span>
                                    <span className="badge badge-accent badge-outline">AWS</span>
                                </div>
                                <div className="flex gap-3 mt-6">
                                    <button className="btn btn-circle btn-outline btn-error hover:scale-110"><BsX className="text-xl" /></button>
                                    <button className="btn btn-circle btn-primary shadow-lg shadow-primary/40 hover:scale-110 flex-1 text-white"><BsHeartFill /></button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute top-20 right-10 bg-base-100 p-3 rounded-xl shadow-lg border border-base-200 animate-bounce">
                            <span className="text-2xl">🔥</span> <span className="font-bold text-sm">It's a Match!</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- STATS STRIP (Glassmorphism) --- */}
            <div className="w-full max-w-5xl mx-auto -mt-10 relative z-20 px-4">
                <div className="bg-base-100/80 backdrop-blur-md border border-base-200 shadow-2xl rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-base-300">
                    <div>
                        <div className="text-3xl font-black text-primary">10k+</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Devs Joined</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-secondary">500+</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Startups Formed</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-accent">1M</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Lines of Code</div>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-success">Free</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wide mt-1">Forever</div>
                    </div>
                </div>
            </div>

            {/* --- "GIT COMMIT" TESTIMONIALS --- */}
            <div className="py-24 bg-base-100" id="how-it-works">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-16">Developers are pushing commits 🚀</h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-base-200 rounded-xl p-6 font-mono text-sm border-l-4 border-primary hover:bg-base-300 transition-colors cursor-default">
                                <div className="flex items-center gap-3 mb-4 opacity-70">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="ml-auto text-xs">commit #{Math.floor(Math.random() * 9000) + 1000}</span>
                                </div>
                                <p className="text-gray-600 mb-4">
                                    "git commit -m 'Found my co-founder on Dev-Tinder! We built a SaaS in 2 weeks. This platform is actually insane.'"
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="w-8 rounded-full">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">Sarah Jenkins</div>
                                        <div className="text-xs text-gray-500">Frontend @ Vercel</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- CTA --- */}
            <div className="py-20 text-center">
                <h2 className="text-4xl font-black mb-6">Ready to commit?</h2>
                <Link to="/login" className="btn btn-primary btn-lg rounded-full px-12 shadow-2xl shadow-primary/50 text-white">
                    Join the Network
                </Link>
            </div>

        </div>
    )
}

// Simple Helper Icon
import { BsX } from "react-icons/bs";

export default HomePage