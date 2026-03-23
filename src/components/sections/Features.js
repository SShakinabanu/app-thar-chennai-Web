import React from 'react';
import SectionReveal from '../ui/SectionReveal';

const Features = () => {
    const topoPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cpath d='M-100 200c50-20 100-20 150 0s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0' stroke='white' fill='none' stroke-opacity='0.1' /%3E%3Cpath d='M-100 250c50-20 100-20 150 0s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0' stroke='white' fill='none' stroke-opacity='0.1' /%3E%3Cpath d='M-100 300c50-20 100-20 150 0s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0' stroke='white' fill='none' stroke-opacity='0.1' /%3E%3Cpath d='M-100 150c50-20 100-20 150 0s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0' stroke='white' fill='none' stroke-opacity='0.1' /%3E%3Cpath d='M-100 100c50-20 100-20 150 0s100 20 150 0 100-20 150 0 100 20 150 0 100-20 150 0' stroke='white' fill='none' stroke-opacity='0.1' /%3E%3C/svg%3E")`;

    return (
        <section style={{ display: 'flex', flexDirection: 'row', minHeight: '600px' }} className="border-y border-black/5">

            {/* LEFT: White Title Block — SectionReveal REMOVED to fix invisible text */}
            <div style={{ width: '45%', backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem' }}>
                <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                    fontWeight: 900,
                    color: '#1B3624',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    letterSpacing: '-0.02em'
                }}>
                    DISCOVER <br />
                    THE THRILL OF <br />
                    OFFROADING <br />
                    WITH THAR <br />
                    CHENNAI
                </h2>
            </div>

            {/* RIGHT: Gold Content Block */}
            <div style={{ width: '55%', backgroundColor: '#A4914B', position: 'relative', display: 'flex', alignItems: 'center', padding: '6rem', overflow: 'hidden' }}>
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
                    backgroundImage: topoPattern, backgroundSize: '100% 100%'
                }} />

                <SectionReveal direction="left" delay={0.2}>
                    <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px' }} className="space-y-8 text-white/90 text-lg md:text-xl font-medium leading-relaxed">
                        <p>Thar Chennai 4x4 Club is a passionate community of Mahindra Thar enthusiasts united by a love for adventure, off-roading, and camaraderie. The group brings together like-minded individuals to connect, explore, and celebrate the spirit of freedom and rugged exploration.</p>
                        <p>From challenging expeditions and adventure drives to workshops and family gatherings, the club blends thrill with responsibility, promoting safe and eco-conscious off-roading.</p>
                        <p>Inclusive and vibrant, Thar Chennai 4x4 Club offers opportunities to learn, share, and build lasting friendships. True to its vision — "Off-Roading Redefined, Adventure Unmatched" — the community welcomes every Thar owner to push boundaries, conquer challenges, and embrace the spirit of adventure.</p>
                    </div>
                </SectionReveal>
            </div>

        </section>
    );
};

export default Features;