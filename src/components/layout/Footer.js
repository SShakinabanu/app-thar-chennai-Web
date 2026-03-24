import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{ background: 'white', paddingTop: '80px', paddingBottom: '40px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', paddingBottom: '60px' }}>
                    <div style={{ gridColumn: 'span 2' }}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '24px' }}>
                            <div style={{ width: '32px', height: '32px', background: '#c0002a', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: 'white', fontWeight: 900, fontStyle: 'italic', fontSize: '16px' }}>T</span>
                            </div>
                            <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
                                THAR<span style={{ color: '#c0002a', fontStyle: 'italic' }}>CHENNAI</span>
                            </span>
                        </Link>
                        <p style={{ color: 'rgba(26,26,26,0.5)', fontSize: '13px', lineHeight: '1.7', maxWidth: '300px', marginBottom: '28px' }}>
                            Southern India's premier community for Mahindra Thar owners. We curate elite off-road experiences and luxury expeditions for the bold and the adventurous.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a key={i} href="#" style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(26,26,26,0.4)', textDecoration: 'none', transition: 'background 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#c0002a'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = 'rgba(26,26,26,0.4)'; }}>
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ color: '#1a1a1a', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>Quick Access</h4>
                        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {[
                                { name: 'Home', path: '/' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Join Club', path: '/membership' },
                                { name: 'Events', path: '/events' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} style={{ color: 'rgba(26,26,26,0.45)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', transition: 'color 0.2s' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#c0002a'}
                                        onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.45)'}>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 style={{ color: '#1a1a1a', fontWeight: 900, fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '24px' }}>Office</h4>
                        <p style={{ color: 'rgba(26,26,26,0.45)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: '2', marginBottom: '20px' }}>
                            Suite 405, Prestige Towers,<br />
                            Nungambakkam High Road,<br />
                            Chennai, TN 600034
                        </p>
                        <a href="mailto:support@tharclub.in" style={{ color: '#c0002a', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', borderBottom: '2px solid rgba(192,0,42,0.2)', paddingBottom: '2px' }}>
                            support@tharclub.in
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid rgba(0,0,0,0.05)', gap: '16px' }}>
                    <p style={{ color: 'rgba(26,26,26,0.25)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0 }}>
                        &copy; {new Date().getFullYear()} THAR CHENNAI CLUB. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
