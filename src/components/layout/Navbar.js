import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(null);
    const { admin } = useAuth();
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
                ...(admin?.is_admin ? [
                    { label: 'Upcoming Events', to: '/admin/panel/upcoming-events' },
                    { label: 'Posts', to: '/admin/panel/posts' },
                    { label: 'Activities', to: '/admin/panel/activities' },
                    { label: 'Adventures', to: '/admin/panel/adventures' },
                ] : []),
            ]
        },
    ];

    return (
        <>
            <style>{`
                .nav-group { position: relative; }
                .nav-group .nav-dropdown {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    padding-top: 8px;
                    min-width: 240px;
                    z-index: 9999;
                }
                .nav-group:hover .nav-dropdown { display: block; }
                .nav-dropdown-inner {
                    background: white;
                    border: 1px solid rgba(0,0,0,0.05);
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
                    padding: 12px 8px;
                }
                .nav-dropdown-link {
                    display: block;
                    padding: 10px 24px;
                    font-size: 13px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #1a1a1a;
                    text-decoration: none;
                    border-radius: 10px;
                    transition: background 0.15s, color 0.15s;
                    font-family: 'Oswald', sans-serif;
                }
                .nav-dropdown-link:hover {
                    background: #f3f4f6;
                    color: #c0002a;
                }
                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 14px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #1a1a1a;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: 'Oswald', sans-serif;
                    transition: color 0.2s;
                    padding: 0;
                    white-space: nowrap;
                }
                .nav-btn:hover { color: #c0002a; }
                .nav-btn svg { transition: transform 0.25s; }
                .nav-group:hover .nav-btn svg { transform: rotate(180deg); }
                .nav-link {
                    font-size: 14px;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    color: #1a1a1a;
                    text-decoration: none;
                    font-family: 'Oswald', sans-serif;
                    transition: color 0.2s;
                    white-space: nowrap;
                }
                .nav-link:hover { color: #c0002a; }
                .nav-link.active { color: #c0002a; }
            `}</style>

            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, background: 'white', boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none', transition: 'all 0.3s', height: scrolled ? '72px' : '88px', display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '100%', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '32px' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', flexShrink: 0 }}>
                        <div style={{ width: '48px', height: '48px', background: '#c0002a', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(192,0,42,0.25)' }}>
                            <span style={{ color: 'white', fontWeight: 900, fontSize: '22px', fontStyle: 'italic' }}>T</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, color: '#1a1a1a' }}>
                                THAR<span style={{ color: '#c0002a', fontStyle: 'italic' }}>CHENNAI</span>
                            </span>
                            <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'rgba(26,26,26,0.3)' }}>4x4 Motor Club</span>
                        </div>
                    </Link>

                    <div className="hidden md:flex" style={{ alignItems: 'center', gap: '36px', flex: 1, justifyContent: 'flex-end' }}>
                        {navItems.map((item) =>
                            item.dropdown ? (
                                <div key={item.label} className="nav-group">
                                    <button className="nav-btn">
                                        {item.label}
                                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div className="nav-dropdown">
                                        <div className="nav-dropdown-inner">
                                            {item.dropdown.map((sub) => (
                                                <Link key={sub.label} to={sub.to} className="nav-dropdown-link">
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link key={item.label} to={item.to} className={`nav-link${location.pathname === item.to ? ' active' : ''}`}>
                                    {item.label}
                                </Link>
                            )
                        )}
                        {admin?.is_admin && (
                           <Link to="/admin" onClick={(e) => { e.preventDefault(); window.location.href='/admin/panel/dashboard' }} className="nav-link" style={{ borderLeft: '1px solid #eee', paddingLeft: '24px', color: '#c0002a' }}>
                              Dashboard
                           </Link>
                        )}
                    </div>

                    <div className="md:hidden" style={{ cursor: 'pointer', color: '#1a1a1a' }} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={30} strokeWidth={3} /> : <Menu size={30} strokeWidth={3} />}
                    </div>
                </div>

                {isOpen && (
                    <div style={{ position: 'absolute', top: '100%', left: 0, width: '100%', background: 'white', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '24px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} className="md:hidden">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {navItems.map((item) => (
                                <div key={item.label}>
                                    {item.dropdown ? (
                                        <div style={{ marginBottom: '4px' }}>
                                            <button
                                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '17px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: mobileOpen === item.label ? '#c0002a' : '#1a1a1a', fontFamily: 'Oswald, sans-serif' }}
                                                onClick={() => setMobileOpen(mobileOpen === item.label ? null : item.label)}
                                            >
                                                {item.label}
                                                <svg width="16" height="16" viewBox="0 0 12 12" fill="none" style={{ transform: mobileOpen === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}>
                                                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </button>
                                            {mobileOpen === item.label && (
                                                <div style={{ background: '#f9fafb', borderRadius: '12px', padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
                                                    {item.dropdown.map((sub) => (
                                                        <Link key={sub.label} to={sub.to} style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(26,26,26,0.6)', padding: '10px 0', textDecoration: 'none', fontFamily: 'Oswald, sans-serif' }} onClick={() => { setIsOpen(false); setMobileOpen(null); }}>
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to={item.to} style={{ display: 'block', fontSize: '17px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.05)', color: location.pathname === item.to ? '#c0002a' : '#1a1a1a', textDecoration: 'none', fontFamily: 'Oswald, sans-serif' }} onClick={() => setIsOpen(false)}>
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
