import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../../components/sections/Hero';
import Features from '../../components/sections/Features';
import EventCard from '../../components/ui/EventCard';
import SectionReveal from '../../components/ui/SectionReveal';
import Button from '../../components/ui/Button';
import { ArrowRight } from 'lucide-react';

const Home = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events?limit=3`);
                setEvents(res.data.data.slice(0, 3));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="bg-dark overflow-hidden">
            <Hero />

            <Features />

            {/* Stats Section with Counter Logic (Simplified for CSS) */}
            <section className="py-24 border-y border-white/5 bg-secondary/20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { label: 'Club Members', value: '500+' },
                            { label: 'Events Driven', value: '120+' },
                            { label: 'Terrains Conquered', value: '15+' },
                            { label: 'Years Legacy', value: '04' }
                        ].map((stat, i) => (
                            <SectionReveal key={i} delay={i * 0.1}>
                                <div className="text-4xl md:text-5xl font-black text-white mb-2 gradient-text">{stat.value}</div>
                                <div className="text-xs font-bold tracking-[0.2em] uppercase text-white/40">{stat.label}</div>
                            </SectionReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Events Showcase */}
            <section className="py-32 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 z-0 pointer-events-none opacity-[0.03]">
                    <img src="/pexels-imadclicks-35071363.jpg" alt="" className="w-full h-full object-cover grayscale" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                        <SectionReveal direction="right">
                            <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Adventure Awaits</span>
                            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight uppercase tracking-tighter">
                                Upcoming <br />
                                <span className="text-white/20">Expeditions.</span>
                            </h2>
                        </SectionReveal>
                        <SectionReveal direction="left">
                            <Button variant="ghost" icon={ArrowRight}>View All Events</Button>
                        </SectionReveal>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {!loading ? (
                            events.map((event, i) => (
                                <EventCard key={event.id} event={event} index={i} />
                            ))
                        ) : (
                            [1, 2, 3].map((i) => (
                                <div key={i} className="aspect-[4/5] rounded-3xl bg-white/5 animate-pulse" />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32">
                <div className="container mx-auto px-6">
                    <SectionReveal className="relative rounded-[40px] overflow-hidden p-12 md:p-24 text-center group">
                        {/* Background Overlay */}
                        <img
                            src="/pexels-rubaitulazad-20707192.jpg"
                            alt="Thar night drive"
                            className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-black/90 z-[1]" />
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-[1]" />

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase tracking-tighter">
                                Are you ready to <br />join the league?
                            </h2>
                            <p className="text-white/80 text-lg mb-12 font-medium">
                                Download our mobile app or click below to start your journey with Thar Club Chennai. Experience the thrill of the unexplored.
                            </p>
                            <div className="flex flex-wrap justify-center gap-6">
                                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl">
                                    Become a Member
                                </Button>
                                <Button size="lg" variant="secondary" className="border-white/20 hover:bg-white/10">
                                    Contact Support
                                </Button>
                            </div>
                        </div>
                    </SectionReveal>
                </div>
            </section>
        </div>
    );
};

export default Home;
