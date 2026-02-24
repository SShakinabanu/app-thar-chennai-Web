import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { ArrowRight, Play } from 'lucide-react';

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
                        <span className="text-xs font-bold tracking-widest uppercase text-white/80">Premium Owner's Community</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-6xl md:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter"
                    >
                        CONQUER THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-500">
                            UNEXPLORED.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-xl text-white/60 mb-12 max-w-2xl leading-relaxed"
                    >
                        Experience the ultimate off-road lifestyle. Join Southern India's most exclusive community of Mahindra Thar enthusiasts.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-wrap gap-6"
                    >
                        <Button size="lg" icon={ArrowRight}>
                            Book Your Slot
                        </Button>
                        <button className="flex items-center gap-4 text-white group outline-none">
                            <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <Play size={20} fill="currentColor" />
                            </div>
                            <span className="font-bold tracking-widest uppercase text-sm">Watch Story</span>
                        </button>
                    </motion.div>
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
