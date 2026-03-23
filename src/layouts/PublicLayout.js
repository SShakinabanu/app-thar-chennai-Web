import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const DropdownMenu = ({ items, isMembership, scrolled }) => (
    <div className="absolute top-full left-0 mt-2 min-w-[200px] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
        {items.map((item) => (
            <Link
                key={item.label}
                to={item.to}
                className="block px-5 py-3 text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all font-medium border-b border-white/5 last:border-0"
            >
                {item.label}
            </Link>
        ))}
    </div>
);

const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(null);
    const location = useLocation();
    const isMembership = location.pathname === '/membership';

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const textColor = isMembership && !scrolled ? 'text-secondary' : 'text-white';
    const textMuted = isMembership && !scrolled ? 'text-secondary/60' : 'text-white/70';
    const textHover = isMembership && !scrolled ? 'hover:text-secondary' : 'hover:text-white';

    const navItems = [
        { label: 'Home', to: '/' },
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
                { label: 'Join Us', to: '/membership' },
            ]
        },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-6">
                <div className={`flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500 ${scrolled
                    ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl'
                    : 'bg-transparent'
                    }`}>
                    {/* Logo */}
                    <Link to="/" className="group flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-black text-xl italic">T</span>
                        </div>
                        <span className={`text-2xl font-black tracking-tighter ${textColor}`}>
                            THAR<span className="text-primary">CLUB</span>
                        </span>
                    </Link>

                    {/* Desktop Menu — pushed all the way right */}
                    <div className="hidden md:flex items-center gap-6 ml-auto">
                        {navItems.map((item) =>
                            item.dropdown ? (
                                <div key={item.label} className="relative group">
                                    <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${textMuted} ${textHover} py-1`}>
                                        {item.label}
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60 group-hover:rotate-180 transition-transform duration-200"><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </button>
                                    <DropdownMenu items={item.dropdown} isMembership={isMembership} scrolled={scrolled} />
                                </div>
                            ) : (
                                <Link
                                    key={item.label}
                                    to={item.to}
                                    className={`text-sm font-medium transition-colors relative group/link ${textMuted} ${textHover}`}
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover/link:w-full" />
                                </Link>
                            )
                        )}

                        <Link to="/membership">
                            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                                JOIN CLUB
                            </button>
                        </Link>
                    </div>

                    {/* Hamburger */}
                    <div className={`md:hidden ${textColor} cursor-pointer ml-4`} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 md:hidden fade-in max-h-[80vh] overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {navItems.map((item) => (
                            <div key={item.label}>
                                {item.dropdown ? (
                                    <div>
                                        <button
                                            className="flex items-center justify-between w-full text-lg font-bold text-white py-3 border-b border-white/10"
                                            onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                                        >
                                            {item.label}
                                            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`transition-transform duration-200 ${mobileOpen === item.label ? 'rotate-180' : ''}`}><path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </button>
                                        {mobileOpen === item.label && (
                                            <div className="pl-4 flex flex-col gap-2 mt-2 mb-2">
                                                {item.dropdown.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        to={sub.to}
                                                        className="text-sm text-white/60 hover:text-primary py-2"
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
                                        className="block text-lg font-bold text-white py-3 border-b border-white/10"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </div>
                        ))}
                        <Link
                            to="/membership"
                            className="mt-4 block text-center bg-primary text-white font-bold py-3 rounded-full"
                            onClick={() => setIsOpen(false)}
                        >
                            JOIN CLUB
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => {
    const location = useLocation();
    const isMembership = location.pathname === '/membership';
    const bgClass = isMembership ? 'bg-white' : 'bg-dark';
    const borderClass = isMembership ? 'border-secondary/10' : 'border-white/5';
    const textColor = isMembership ? 'text-secondary/40' : 'text-white/40';
    const titleColor = isMembership ? 'text-secondary' : 'text-white';

    return (
        <footer className={`${bgClass} pt-32 pb-12 border-t ${borderClass}`}>
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-8">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                                <span className="text-white font-black italic">T</span>
                            </div>
                            <span className={`text-xl font-black tracking-tighter ${titleColor}`}>
                                THAR<span className="text-primary">CLUB</span>
                            </span>
                        </Link>
                        <p className={`${textColor} max-w-sm mb-8 leading-relaxed`}>
                            Southern India's premier community for Mahindra Thar owners. We curate elite off-road experiences and luxury expeditions for the bold and the adventurous.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isMembership ? 'bg-secondary/5 text-secondary/40 hover:bg-primary hover:text-white' : 'bg-white/5 text-white/40 hover:bg-primary hover:text-white'}`}>
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className={`${titleColor} font-bold mb-8 uppercase tracking-widest text-xs`}>Quick Access</h4>
                        <ul className="flex flex-col gap-4">
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'Events', path: '/events' },
                                { name: 'About Club', path: '/' },
                                { name: 'Membership', path: '/membership' },
                                { name: 'Contact Us', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className={`${textColor} hover:text-primary transition-colors text-sm`}>{item.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={`${titleColor} font-bold mb-8 uppercase tracking-widest text-xs`}>HQ Location</h4>
                        <p className={`${textColor} text-sm leading-relaxed mb-4`}>
                            Suite 405, Prestige Towers,<br />
                            Nungambakkam High Road,<br />
                            Chennai, TN 600034
                        </p>
                        <a href="mailto:support@tharclub.in" className="text-primary text-sm font-bold">support@tharclub.in</a>
                    </div>
                </div>

                <div className={`flex flex-col md:flex-row justify-between items-center pt-8 border-t ${borderClass} gap-8`}>
                    <p className={`${textColor.replace('/40', '/20')} text-[10px] font-bold tracking-widest uppercase`}>
                        &copy; {new Date().getFullYear()} THAR OWNERS CLUB. ALL RIGHTS RESERVED.
                    </p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                            <a key={item} href="#" className={`${textColor.replace('/40', '/20')} hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase`}>{item}</a>
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
        className="fixed bottom-10 right-10 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center z-[2000] shadow-[0_10px_40px_rgba(37,211,102,0.4)] transition-shadow hover:shadow-[0_15px_50px_rgba(37,211,102,0.6)] group"
    >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:hidden" />
        <MessageCircle size={32} />
    </motion.a>
);

const PublicLayout = () => {
    const location = useLocation();
    const isMembership = location.pathname === '/membership';

    return (
        <div className={`min-h-screen flex flex-col ${isMembership ? 'bg-[#fff9f2]' : 'bg-dark'} selection:bg-primary selection:text-white transition-colors duration-500`}>
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
