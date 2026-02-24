import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, Instagram, Facebook, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
            <div className="container mx-auto px-6">
                <div className={`flex items-center justify-between px-8 py-4 rounded-2xl transition-all duration-500 ${scrolled
                    ? 'bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl'
                    : 'bg-transparent'
                    }`}>
                    <Link to="/" className="group flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                            <span className="text-white font-black text-xl italic">T</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-white">
                            THAR<span className="text-primary">CLUB</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-10">
                        {['Home', 'Events', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-sm font-medium text-white/70 hover:text-white transition-colors relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                        <Link to="/events">
                            <button className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-full text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                                JOIN CLUB
                            </button>
                        </Link>
                    </div>

                    <div className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 p-8 md:hidden fade-in">
                    <div className="flex flex-col gap-6">
                        {['Home', 'Events', 'Contact'].map((item) => (
                            <Link
                                key={item}
                                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                className="text-xl font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const Footer = () => (
    <footer className="bg-dark pt-32 pb-12 border-t border-white/5">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="flex items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                            <span className="text-white font-black italic">T</span>
                        </div>
                        <span className="text-xl font-black tracking-tighter text-white">
                            THAR<span className="text-primary">CLUB</span>
                        </span>
                    </Link>
                    <p className="text-white/40 max-w-sm mb-8 leading-relaxed">
                        Southern India's premier community for Mahindra Thar owners. We curate elite off-road experiences and luxury expeditions for the bold and the adventurous.
                    </p>
                    <div className="flex gap-4">
                        {[Instagram, Facebook, Twitter].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary hover:text-white transition-all duration-300">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">Quick Access</h4>
                    <ul className="flex flex-col gap-4">
                        {['Home', 'Events', 'About Club', 'Membership', 'Contact Us'].map((item) => (
                            <li key={item}>
                                <Link to="/" className="text-white/40 hover:text-primary transition-colors text-sm">{item}</Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-xs">HQ Location</h4>
                    <p className="text-white/40 text-sm leading-relaxed mb-4">
                        Suite 405, Prestige Towers,<br />
                        Nungambakkam High Road,<br />
                        Chennai, TN 600034
                    </p>
                    <a href="mailto:support@tharclub.in" className="text-primary text-sm font-bold">support@tharclub.in</a>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-8">
                <p className="text-white/20 text-[10px] font-bold tracking-widest uppercase">
                    &copy; {new Date().getFullYear()} THAR OWNERS CLUB. ALL RIGHTS RESERVED.
                </p>
                <div className="flex gap-8">
                    {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                        <a key={item} href="#" className="text-white/20 hover:text-white transition-colors text-[10px] font-bold tracking-widest uppercase">{item}</a>
                    ))}
                </div>
            </div>
        </div>
    </footer>
);

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
    return (
        <div className="min-h-screen flex flex-col bg-dark selection:bg-primary selection:text-white">
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
