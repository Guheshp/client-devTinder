import React from 'react'
import { Link } from 'react-router-dom'
import { BsGithub, BsTwitter, BsLinkedin, BsInstagram, BsHeartFill } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4">

                <div className="footer grid-cols-1 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand Section */}
                    <aside className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-black tracking-tight flex items-center gap-2">
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Dev-Tinder
                            </span>
                            <span className="text-xl">🚀</span>
                        </Link>
                        <p className="mt-4 text-gray-500 max-w-xs leading-relaxed">
                            Match, Chat, and Code. The ultimate platform for developers to connect, collaborate, and build the future together.
                        </p>
                    </aside>

                    {/* Links Column 1 */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title opacity-100 text-primary">Services</h6>
                        <Link to="/premiumList" className="link link-hover hover:text-primary transition-colors">Premium Plans</Link>
                        <Link to="/ai-coach" className="link link-hover hover:text-primary transition-colors">AI Career Coach</Link>
                        <Link to="/feed" className="link link-hover hover:text-primary transition-colors">Find Developers</Link>
                        <Link to="/connections" className="link link-hover hover:text-primary transition-colors">Success Stories</Link>
                    </nav>

                    {/* Links Column 2 */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title opacity-100 text-primary">Company</h6>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors">About us</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors">Contact</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors">Terms of Use</Link>
                    </nav>
                </div>

                {/* Divider */}
                <div className="divider my-0"></div>

                {/* Bottom Section */}
                <div className="footer items-center p-4 bg-base-200 text-base-content border-base-300">
                    <aside className="items-center grid-flow-col">
                        <p className="flex items-center gap-1 text-sm font-medium">
                            Built with <BsHeartFill className="text-error animate-pulse" /> in India © {new Date().getFullYear()} - Dev-Tinder
                        </p>
                    </aside>
                    <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                        <a href="#" rel="noreferrer" className="text-2xl hover:text-primary transition-colors cursor-pointer"><BsGithub /></a>
                        <a href="#" rel="noreferrer" className="text-2xl hover:text-blue-400 transition-colors cursor-pointer"><BsTwitter /></a>
                        <a href="#" rel="noreferrer" className="text-2xl hover:text-blue-600 transition-colors cursor-pointer"><BsLinkedin /></a>
                        <a href="#" rel="noreferrer" className="text-2xl hover:text-pink-500 transition-colors cursor-pointer"><BsInstagram /></a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer