import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import x from '../../images/x.svg'
import tiktok from '../../images/tiktok.svg'
import indeed from '../../images/indeed.svg'
import instagram from '../../images/instagram.svg'
import location from '../../images/location.svg'
import sms from '../../images/sms.svg'
import people from '../../images/people.svg'
import mypallogo from '../../images/mypallogo.svg'
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";

const FooterSection = () => {
    const [showContactModal, setShowContactModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
    const contactBtnRef = useRef(null);

    useEffect(() => {
        // initial attention-grab and periodic shake to indicate action
        const doShake = () => {
            const el = contactBtnRef.current;
            if (!el) return;
            el.classList.add('shake');
            setTimeout(() => el.classList.remove('shake'), 800);
        };

        const initTimer = setTimeout(doShake, 800);
        const interval = setInterval(doShake, 5000); // shake every 10s

        return () => { clearTimeout(initTimer); clearInterval(interval); };
    }, []);
    return (
        <div className="bg-[#12416b] text-white font-sans antialiased p-8 md:p-12 lg:p-16 rounded-t-3xl md:rounded-t-[4rem]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16">
                {/* Column 1: MyPal and Description */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">MyPal</h3>
                    <p className="text-[#fbfbfb] font-['AvenirNextRoundedStd-Bold',_sans-serif] text-base mb-6 max-w-xs">
                        Effortlessly discover and explore the best experiences your city has to offer.
                    </p>
                    <img src={mypallogo} alt="MyPal Logo" className='w-[100px] h-[100px] rounded-[20px]' />
                </div>

                {/* Column 2: Discover */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">Discover</div>
                    <ul className="space-y-2 text-[#fbfbfb] text-base font-thin">
                        <li><Link to="/accessibility-statement" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Accessibility Statement</Link></li>
                        <li><Link to="/cookie-policy" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Cookies Policy</Link></li>
                        <li><Link to="/copyright-notice" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Copyright Notice</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">GDPR and Privacy policy</Link></li>
                        <li><Link to="/terms-and-conditions" className="hover:text-[#DB3A06] transition-colors duration-200 hover:font-semibold">Terms and Conditions</Link></li>
                    </ul>
                </div>

                {/* Column 4: Connect with us */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-[#fbfbfb] text-left font-['AvenirNextRoundedStd-Bold',_sans-serif] text-xl font-bold mb-4">Connect with us</h3>
                    
                    {/* Social icons */}
                    <div className="flex items-center space-x-4 mb-4">
                        <a href="https://x.com/mypaldeals" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"><img src={x} alt="twitter X" /></a>
                        <a href="https://www.tiktok.com/@mypaldeals?_t=ZS-90fKirE87CC&_r=1" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"><img src={tiktok} alt="tiktok" className='w-6 h-6' /></a>
                        <a href="https://www.linkedin.com/company/mypal-inc/" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"> <img src={indeed} alt="linkedin" /></a>
                        <a href="https://www.instagram.com/mypaldeals/" target='_blank' className="text-white hover:text-gray-400 transition-colors duration-200"> <img src={instagram} alt="instagram" /></a>
                    </div>
                    
                    {/* Address */}
                    <div className="flex items-start space-x-2 text-sm text-gray-300 mb-3">
                        <img src={location} alt="" className='mr-[0px] md:mr-2' />
                        <p className='text-[#ffffff] text-base font-normal'>18B Zainab Street, Medina, Gbagada, Lagos</p>
                    </div>

                    {/*Phone */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-3 text-left">
                        <FaWhatsapp className="w-6 h-6 text-white" />
                        <a href="https://wa.me/2349055557535" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 text-[#ffffff] font-['Poppins-Regular',_sans-serif] text-base font-normal relative">
                        09055557535</a>
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
                        <img src={sms} alt="" />
                        <a href="mailto:hello@mypal-inc.com" className="hover:text-white transition-colors duration-200 text-[#ffffff] font-['Poppins-Regular',_sans-serif] text-base font-normal relative">hello@mypal-inc.com</a>
                    </div>

                    {/* Contact Us button with avatars */}
                    <style>{`
                        @keyframes shakeX {
                            0% { transform: translateX(0); }
                            20% { transform: translateX(-6px) rotate(-1deg); }
                            40% { transform: translateX(6px) rotate(1deg); }
                            60% { transform: translateX(-4px) rotate(-0.5deg); }
                            80% { transform: translateX(4px) rotate(0.5deg); }
                            100% { transform: translateX(0); }
                        }
                        .shake { animation: shakeX 0.8s ease-in-out; }
                    `}</style>

                    <button
                        ref={contactBtnRef}
                        onClick={() => { setShowContactModal(true); const el = contactBtnRef.current; if (el) el.classList.remove('shake'); }}
                        className="flex items-center bg-white text-gray-800 rounded-full py-2 px-2 transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                        <span className="font-semibold text-lg mr-3">Contact Us</span>
                        <div className="flex -space-x-2">
                            <img src={people} alt="" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 pt-8 border-t border-gray-700 text-center md:text-right  text-[rgba(255,255,255,0.48)] font-['Poppins-Medium',_sans-serif] text-xl font-medium relative">
                © Mi-Pal Technologies {new Date().getFullYear()} All Right Reserved
            </div>
            {/* Contact Modal (hidden by default) */}
            {showContactModal && (
                <div className="fixed inset-0 z-[999999] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black opacity-60" onClick={() => setShowContactModal(false)}></div>
                    <div className="relative bg-white rounded-xl max-w-3xl w-full mx-4 p-6 shadow-2xl transform transition-all overflow-auto h-[500px] md:h-fit lg:h-fit">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">Contact Us</h3>
                                <p className="text-sm text-gray-500">We'd love to hear from you — send us a message and we'll get back within 24 hours.</p>
                            </div>
                            <button onClick={() => setShowContactModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="col-span-1 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-700 ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Your full name"
                                />
                                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}

                                <label className="block text-sm font-medium text-gray-700 mt-4">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    // autoComplete='email'
                                    className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="you@company.com"
                                />
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}

                                {/* <label className="block text-sm font-medium text-gray-700 mt-4">Phone (optional)</label>
                                <input
                                    type="tel"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    className={`mt-1 block w-full rounded-md border py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="e.g. +2349055557535"
                                />
                                {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>} */}

                            </div>

                            <div className="col-span-1 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    rows={8}
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    className={`mt-1 block w-full rounded-md border py-0 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 text-gray-800 ${errors.message ? 'border-red-500' : 'border-gray-200'}`}
                                    placeholder="Write your message here..."
                                />
                                {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                            <div className="text-sm text-green-600">{successMsg}</div>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={async () => {
                                        // simple client-side validation
                                        const errs = {};
                                        if (!form.name || form.name.trim().length < 2) errs.name = 'Please enter your name';
                                        const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                                        if (!form.email || !emailRx.test(form.email)) errs.email = 'Please enter a valid email';
                                        // if (form.phone && form.phone.replace(/[^0-9+]/g, '').length < 7) errs.phone = 'Please enter a valid phone number';
                                        if (!form.message || form.message.trim().length < 10) errs.message = 'Please enter a longer message';
                                        setErrors(errs);
                                        if (Object.keys(errs).length) return;

                                        setSubmitting(true);
                                        setSuccessMsg('');
                                        try {
                                            const url = `${API_BASE.replace(/\/+$/g, '')}/contact`;
                                            const payload = {
                                                name: form.name,
                                                email: form.email,
                                                // ...(form.phone ? { phone: form.phone } : {}),
                                                message: form.message,
                                            };
                                            const response = await axios.post(url, payload);
                                            if (response?.status !== 201 && response?.status !== 200) {
                                                throw new Error('Unexpected response from server');
                                            }
                                            setSuccessMsg('Thanks — your message was sent successfully.');
                                            setForm({ name: '', email: '', message: '' });
                                            setTimeout(() => { setShowContactModal(false); setSuccessMsg(''); }, 3800);
                                        } catch (err) {
                                            console.error('Contact submit failed', err.response ?? err.message);
                                            setSuccessMsg('Failed to send message. Please try again later.');
                                        } finally {
                                            setSubmitting(false);
                                        }
                                    }}
                                    disabled={submitting}
                                    className={`px-6 py-2 rounded-md text-white font-semibold bg-gradient-to-r bg-[#DB3A06] hover:from-orange-800 hover:to-orange-700 disabled:opacity-60 cursor-pointer ${submitting ? 'cursor-wait' : ''}`}
                                >
                                    {submitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FooterSection;
