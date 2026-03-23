import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative h-screen min-h-[800px] flex items-center overflow-hidden bg-black">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: y1 }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black z-10" />
                <img
                    src="/pexels-imadclicks-34759938.jpg"
                    alt="Mahindra Thar"
                    className="w-full h-full object-cover scale-110"
                />
            </motion.div>

            {/* Content */}
            <div className="container mx-auto px-6 relative z-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-8"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-bold tracking-widest uppercase text-white/80">Thar Chennai — Est. 2021</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-4 tracking-tighter"
                    >
                        OFF-ROADING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-500">
                            REDEFINED.
                        </span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-4xl md:text-6xl font-black text-white/20 leading-tight tracking-tighter"
                    >
                        ADVENTURE UNMATCHED.
                    </motion.h2>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                style={{ opacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/30 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
