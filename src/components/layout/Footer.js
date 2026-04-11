import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

const CustomXIcon = ({ size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
);

const Footer = () => {
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const footerStyle = {
        background: '#fff9f2',
        color: '#1a1a1a',
        paddingTop: '80px',
        paddingBottom: '40px',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        fontFamily: "'Oswald', sans-serif"
    };

    const containerStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px'
    };

    const gridStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '32px',
        paddingBottom: '60px',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        justifyContent: 'space-between'
    };

    const columnStyle = {
        flex: isMobile ? '1 1 100%' : '0 1 auto',
        minWidth: isMobile ? '100%': '140px'
    };

    const brandColumnStyle = {
        flex: isMobile ? '1 1 100%' : '0 1 280px',
        minWidth: isMobile ? '100%': '280px'
    };

    const headingStyle = {
        color: '#1a1a1a',
        fontWeight: 900,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginBottom: '24px'
    };

    const linkListStyle = {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '14px'
    };

    const linkStyle = {
        color: 'rgba(26,26,26,0.6)',
        fontSize: '13px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        textDecoration: 'none',
        transition: 'color 0.2s'
    };

    const SocialIcon = ({ Icon, href, isX = false }) => {
        const [isHovered, setIsHovered] = React.useState(false);
        
        const style = {
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: isHovered ? '#c0002a' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHovered ? '#fff' : 'rgba(26,26,26,0.6)',
            textDecoration: 'none',
            boxShadow: isHovered ? '0 4px 12px rgba(192,0,42,0.2)' : '0 2px 8px rgba(0,0,0,0.04)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
        };

        return (
            <a 
                href={href} 
                target="_blank" 
                rel="noreferrer" 
                style={style}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isX ? <CustomXIcon size={16} color={isHovered ? '#fff' : 'rgba(26,26,26,0.6)'} /> : <Icon size={18} />}
            </a>
        );
    };

    return (
        <footer style={footerStyle}>
            <div style={containerStyle}>
                <div style={gridStyle}>
                    {/* Brand Info */}
                    <div style={brandColumnStyle}>
                        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '24px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#c0002a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: 'white', fontWeight: 900, fontStyle: 'italic', fontSize: '20px' }}>T</span>
                            </div>
                            <span style={{ fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em', color: '#1a1a1a' }}>
                                THAR<span style={{ color: '#c0002a', fontStyle: 'italic' }}>CHENNAI</span>
                            </span>
                        </Link>
                        <p style={{ color: 'rgba(26,26,26,0.5)', fontSize: '14px', lineHeight: '1.7', maxWidth: '350px', marginBottom: '28px', fontWeight: 500 }}>
                            Southern India's premier community for Mahindra Thar owners. We curate elite off-road experiences and luxury expeditions for the bold and the adventurous.
                        </p>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <SocialIcon Icon={Instagram} href="https://www.instagram.com/thar_chennai/" />
                            <SocialIcon Icon={Youtube} href="https://www.youtube.com/@tharchennai" />
                            <SocialIcon Icon={Facebook} href="https://www.instagram.com/thar_chennai/" />
                            <SocialIcon isX href="https://www.instagram.com/thar_chennai/" />
                        </div>
                    </div>

                    {/* The Club */}
                    <div style={columnStyle}>
                        <h4 style={headingStyle}>The Club</h4>
                        <ul style={linkListStyle}>
                            <li><Link to="/team" style={linkStyle}>Our Team</Link></li>
                            <li><Link to="/meet-and-greet" style={linkStyle}>Meet and Greet</Link></li>
                            <li><Link to="/honorary-members" style={linkStyle}>Honorary Members</Link></li>
                            <li><Link to="/achievements" style={linkStyle}>Achievements</Link></li>
                        </ul>
                    </div>

                    {/* Adventures */}
                    <div style={columnStyle}>
                        <h4 style={headingStyle}>Adventures</h4>
                        <ul style={linkListStyle}>
                            <li><Link to="/adventures/day-trails" style={linkStyle}>Day Trails</Link></li>
                            <li><Link to="/adventures/overnight-camping" style={linkStyle}>Overnight Camping</Link></li>
                            <li><Link to="/adventures/monsoon-trails" style={linkStyle}>Monsoon Trails</Link></li>
                            <li><Link to="/adventures/expedition-series" style={linkStyle}>Expedition Series</Link></li>
                            <li><Link to="/adventures/run-calendar" style={linkStyle}>Run Calendar</Link></li>
                        </ul>
                    </div>

                    {/* More */}
                    <div style={columnStyle}>
                        <h4 style={headingStyle}>More</h4>
                        <ul style={linkListStyle}>
                            <li><Link to="/blog" style={linkStyle}>Blog</Link></li>
                            <li><Link to="/merchandise" style={linkStyle}>Merchandise</Link></li>
                            <li><Link to="/contact" style={linkStyle}>Contact Us</Link></li>
                            <li><Link to="/join-us" style={{...linkStyle, color: '#c0002a', fontWeight: 900}}>Join Us ➜</Link></li>
                        </ul>
                    </div>

                    {/* Office */}
                    <div style={columnStyle}>
                        <h4 style={headingStyle}>Office</h4>
                        <p style={{ color: 'rgba(26,26,26,0.6)', fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', lineHeight: '1.8', marginBottom: '20px' }}>
                            3, Patel St,<br />
                            Nandavana Mettur,<br />
                            Avadi, Tamil Nadu<br />
                            600071
                        </p>
                        <a href="mailto:support@tharclub.in" style={{ color: '#c0002a', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', borderBottom: '2px solid rgba(192,0,42,0.2)', paddingBottom: '2px' }}>
                            support@tharclub.in
                        </a>
                    </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', gap: '16px' }}>
                    <p style={{ color: 'rgba(26,26,26,0.3)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>
                        &copy; {new Date().getFullYear()} THAR CHENNAI CLUB. ALL RIGHTS RESERVED.
                    </p>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <Link to="/privacy-policy" style={{...linkStyle, fontSize: '10px'}}>Privacy Policy</Link>
                        <Link to="/terms" style={{...linkStyle, fontSize: '10px'}}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
