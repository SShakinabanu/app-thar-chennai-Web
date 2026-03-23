import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-[90vh] min-h-[700px] flex items-center overflow-hidden bg-black">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-black/50 z-10" />
                <img
                    src="https://static.wixstatic.com/media/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg/v1/fill/w_1349,h_772,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/5164b1_7691b890b941480d929ed11f6bb0da9b~mv2.jpg"
                    alt="Mahindra Thar"
                    className="w-full h-full object-cover scale-105"
                />
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase font-oswald"
                    >
                        DISCOVER THE THRILL <br />
                        OF OFFROADING WITH <br />
                        THAR <span className="text-primary italic">CHENNAI</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed font-medium mb-10"
                    >
                        Thar Chennai 4x4 Club is a passionate community of Mahindra Thar enthusiasts united by a love for adventure, off-roading, and camaraderie. The group brings together like-minded individuals to connect, explore, and celebrate the spirit of freedom and rugged exploration.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link to="/membership">
                            <button className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all hover:scale-105 shadow-2xl shadow-primary/30">
                                Join the Adventure
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
