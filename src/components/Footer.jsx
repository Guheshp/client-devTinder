import React from 'react'
import { Link } from 'react-router-dom'
import { BsGithub, BsTwitter, BsLinkedin, BsInstagram, BsHeartFill } from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4">

                {/* Responsive Grid: 
                   - Mobile: 1 Column
                   - Small Tablet (sm): 2 Columns
                   - Laptop (md): 4 Columns
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">

                    {/* Brand Section - Spans 2 columns on tablet/desktop, 1 on mobile */}
                    <aside className="col-span-1 sm:col-span-2">
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
                        <h6 className="footer-title opacity-100 text-primary uppercase tracking-wider">Services</h6>
                        <Link to="/premiumList" className="link link-hover hover:text-primary transition-colors text-sm">Premium Plans</Link>
                        <Link to="/ai-coach" className="link link-hover hover:text-primary transition-colors text-sm">AI Career Coach</Link>
                        <Link to="/feed" className="link link-hover hover:text-primary transition-colors text-sm">Find Developers</Link>
                        <Link to="/connections" className="link link-hover hover:text-primary transition-colors text-sm">Success Stories</Link>
                    </nav>

                    {/* Links Column 2 */}
                    <nav className="flex flex-col gap-2">
                        <h6 className="footer-title opacity-100 text-primary uppercase tracking-wider">Company</h6>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors text-sm">About us</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors text-sm">Contact</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors text-sm">Privacy Policy</Link>
                        <Link to="/#" className="link link-hover hover:text-primary transition-colors text-sm">Terms of Use</Link>
                    </nav>
                </div>

                {/* Divider */}
                <div className="divider my-0"></div>

                {/* Bottom Section - Stack on Mobile, Row on Desktop */}
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 py-6">
                    <aside className="text-center md:text-left">
                        <p className="flex items-center gap-1 text-sm font-medium text-gray-500">
                            Built with <BsHeartFill className="text-error animate-pulse" /> in India © {new Date().getFullYear()} - Dev-Tinder
                        </p>
                    </aside>

                    <nav className="flex gap-6">
                        <a href="#" rel="noreferrer" className="text-2xl text-gray-500 hover:text-black hover:-translate-y-1 transition-all duration-300 cursor-pointer"><BsGithub /></a>
                        <a href="#" rel="noreferrer" className="text-2xl text-gray-500 hover:text-blue-400 hover:-translate-y-1 transition-all duration-300 cursor-pointer"><BsTwitter /></a>
                        <a href="#" rel="noreferrer" className="text-2xl text-gray-500 hover:text-blue-600 hover:-translate-y-1 transition-all duration-300 cursor-pointer"><BsLinkedin /></a>
                        <a href="#" rel="noreferrer" className="text-2xl text-gray-500 hover:text-pink-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"><BsInstagram /></a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer