import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DropdownMenu = ({ items }) => (
    <>
        <style>{`
            .dropdown-item:hover { color: #D14023 !important; background-color: #f9fafb !important; }
        `}</style>
        <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
            <div className="bg-white border border-black/5 rounded-2xl shadow-2xl overflow-hidden py-4 px-2">
                {items.map((item) => (
                    <Link
                        key={item.label}
                        to={item.to}
                        className="block px-6 py-3 text-sm rounded-xl transition-all font-black uppercase tracking-widest font-oswald dropdown-item"
                        style={{ color: '#1a1a1a' }}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </div>
    </>
);

const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(null);
    const location = useLocation();

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { label: 'Home', to: '/home' },
        { label: 'About', to: '/about' },
        {
            label: 'The Club',
            dropdown: [
                { label: 'Our Team', to: '/team' },
                { label: 'Meet and Greet', to: '/meet-and-greet' },
                { label: 'Honorary Members', to: '/honorary-members' },
                { label: 'Achievements', to: '/achievements' },
            ]
        },
        {
            label: 'Adventures',
            dropdown: [
                { label: 'Day Trails', to: '/adventures/day-trails' },
                { label: 'Overnight Camping', to: '/adventures/overnight-camping' },
                { label: 'Monsoon Trails', to: '/adventures/monsoon-trails' },
                { label: 'Expedition Series', to: '/adventures/expedition-series' },
                { label: 'Run Calendar', to: '/adventures/run-calendar' },
            ]
        },
        {
            label: 'More',
            dropdown: [
                { label: 'Blog', to: '/blog' },
                { label: 'Merchandise', to: '/merchandise' },
                { label: 'Contact Us', to: '/contact' },
                { label: 'Join Us', to: '/join-us' },
            ]
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'py-0 h-20 shadow-2xl shadow-black/5' : 'py-0 h-24'}`}>
            <div className="bg-white h-full flex items-center transition-all duration-500">
                <div className="w-full px-4 md:px-6 lg:px-10">
                    <div className="flex items-center justify-between gap-12">

                        {/* Logo */}
                        <Link to="/" className="group flex items-center gap-3 shrink-0">
                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center transform group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-primary/20">
                                <span className="text-white font-black text-2xl italic">T</span>
                            </div>
                            <div className="flex flex-col -gap-1">
                                <span className="text-2xl font-black tracking-tighter leading-none" style={{ color: '#1a1a1a' }}>
                                    THAR<span className="text-primary italic">CHENNAI</span>
                                </span>
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase" style={{ color: 'rgba(26,26,26,0.3)' }}>4x4 Motor Club</span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center justify-end flex-1 gap-10 h-full">
                            <style>{`
                                .nav-item-btn:hover { color: #D14023 !important; }
                                .nav-item-link:hover { color: #D14023 !important; }
                            `}</style>
                            {navItems.map((item) =>
                                item.dropdown ? (
                                    <div key={item.label} className="relative group h-full flex items-center">
                                        <button
                                            className="flex items-center gap-2 text-sm font-black uppercase tracking-widest transition-all font-oswald group-hover:scale-110 nav-item-btn"
                                            style={{ color: '#1a1a1a' }}
                                        >
                                            {item.label}
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-50 group-hover:rotate-180 group-hover:opacity-100 transition-all duration-300">
                                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        {/* Dropdown is always in DOM, shown via CSS group-hover */}
                                        <div className="absolute top-full left-0 pt-0 min-w-[240px] z-50 opacity-0 invisible pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto transition-all duration-200">
                                            <div className="bg-white border border-black/5 rounded-2xl shadow-2xl overflow-hidden py-4 px-2 mt-2">
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.to}
                                                        className="block px-6 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all font-black uppercase tracking-widest font-oswald dropdown-item"
                                                        style={{ color: '#1a1a1a' }}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={item.label}
                                        to={item.to}
                                        className={`text-sm font-black uppercase tracking-widest transition-all font-oswald hover:scale-110 nav-item-link ${location.pathname === item.to ? 'text-primary' : ''}`}
                                        style={{ color: location.pathname === item.to ? undefined : '#1a1a1a' }}
                                    >
                                        {item.label}
                                    </Link>
                                )
                            )}
                        </div>

                        {/* Hamburger */}
                        <div
                            className="md:hidden cursor-pointer hover:text-primary transition-colors"
                            style={{ color: '#1a1a1a' }}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={32} strokeWidth={3} /> : <Menu size={32} strokeWidth={3} />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-t border-black/5 p-8 md:hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-y-auto max-h-[85vh] animate-fade-in">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <div className="mb-2">
                                        <button
                                            className={`flex items-center justify-between w-full text-lg font-black uppercase tracking-widest py-4 border-b border-black/5 font-oswald ${mobileOpen === item.label ? 'text-primary' : ''}`}
                                            style={{ color: mobileOpen === item.label ? undefined : '#1a1a1a' }}
                                            onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                                        >
                                            {item.label}
                                            <svg width="16" height="16" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-300 ${mobileOpen === item.label ? 'rotate-180' : ''}`}>
                                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                        {mobileOpen === item.label && (
                                            <div className="bg-gray-50 rounded-2xl px-6 py-4 flex flex-col gap-2 mt-4 animate-slide-up">
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.to}
                                                        className="text-sm font-bold uppercase tracking-widest py-3 transition-colors font-oswald hover:text-primary"
                                                        style={{ color: 'rgba(26,26,26,0.6)' }}
                                                        onClick={() => { setIsOpen(false); setMobileOpen(null); }}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.to}
                                        className={`block text-lg font-black uppercase tracking-widest py-4 border-b border-black/5 font-oswald ${location.pathname === item.to ? 'text-primary' : ''}`}
                                        style={{ color: location.pathname === item.to ? undefined : '#1a1a1a' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            to="/membership"
                            className="mt-10 block text-center bg-primary text-white text-sm font-black uppercase tracking-widest py-5 rounded-2xl shadow-2xl shadow-primary/30"
                            onClick={() => setIsOpen(false)}
                        >
                            Become a Member
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="bg-white pt-24 pb-12 border-t border-black/5">
            <div className="w-full px-4 md:px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="text-white font-black italic">T</span>
                            </div>
                            <span className="text-xl font-black tracking-tighter" style={{ color: '#1a1a1a' }}>
                                THAR<span className="text-primary italic">CHENNAI</span>
                            </span>
                        </Link>
                        <p className="text-secondary/60 max-w-sm mb-10 text-sm leading-relaxed font-medium">
                            Southern India's premier community for Mahindra Thar owners. We curate elite off-road experiences and luxury expeditions for the bold and the adventurous.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-11 h-11 rounded-xl bg-cream flex items-center justify-center text-secondary/40 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-secondary font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Quick Access</h4>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Join Club', path: '/membership' },
                                { name: 'Events', path: '/events' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="text-secondary/50 hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest">{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-secondary font-black mb-8 uppercase tracking-[0.2em] text-[10px]">Office</h4>
                        <p className="text-secondary/50 text-xs font-bold uppercase tracking-widest leading-loose mb-6">
                            Suite 405, Prestige Towers,<br />
                            Nungambakkam High Road,<br />
                            Chennai, TN 600034
                        </p>
                        <a href="mailto:support@tharclub.in" className="text-primary text-[11px] font-black uppercase tracking-widest border-b-2 border-primary/20 pb-1">support@tharclub.in</a>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-black/5 gap-8">
                    <p className="text-secondary/30 text-[9px] font-bold tracking-[0.25em] uppercase">
                        &copy; {new Date().getFullYear()} THAR CHENNAI CLUB. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy', 'Terms', 'Cookies'].map((item) => (
                            <a key={item} href="#" className="text-secondary/30 hover:text-primary transition-colors text-[9px] font-bold tracking-[0.25em] uppercase" style={{ textDecoration: 'none' }}>{item}</a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

const WhatsAppButton = () => (
    <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/918946045205?text=Hello%20I%20want%20to%20join%20Thar%20Club"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-2xl flex items-center justify-center z-[2000] shadow-2xl shadow-green-500/20 transition-all group"
    >
        <div className="absolute inset-0 rounded-2xl bg-[#25D366] animate-ping opacity-20 group-hover:hidden" />
        <MessageCircle size={32} />
    </motion.a>
);

const PublicLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-cream selection:bg-primary selection:text-white transition-colors duration-500">
            <Navbar />
            <main className="flex-grow pt-0">
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default PublicLayout;