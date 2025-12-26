import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="px-6 mt-30 md:px-16 lg:px-36 w-full text-gray-300">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-800 pb-14">
                <div className="md:max-w-96">
                    <img alt="CineVibe Logo" className="h-24 w-auto mb-6" src={assets.logo} />
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Experience movies like never before with CineVibe. Your premium destination for booking tickets, finding showtimes, and discovering the latest blockbusters.
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                        <img src={assets.googlePlay} alt="Get it on Google Play" className="h-10 w-auto opacity-80 hover:opacity-100 transition duration-300 cursor-pointer" />
                        <img src={assets.appStore} alt="Download on the App Store" className="h-10 w-auto opacity-80 hover:opacity-100 transition duration-300 cursor-pointer" />
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20 md:gap-40">
                    <div>
                        <h2 className="font-semibold text-white mb-5 uppercase tracking-wider text-sm">Company</h2>
                        <ul className="text-sm space-y-3 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact us</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white mb-5 uppercase tracking-wider text-sm">Support</h2>
                        <div className="text-sm space-y-3 text-gray-400">
                            <p>0112 322 422</p>
                            <p>support@cinevibe.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-8 text-center text-sm text-gray-500 pb-5">
                Copyright {new Date().getFullYear()} © CineVibe. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer