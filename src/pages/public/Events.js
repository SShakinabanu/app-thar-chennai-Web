import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import SectionReveal from '../../components/ui/SectionReveal';
import EventCard from '../../components/ui/EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
                setEvents(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    const filteredEvents = events.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-dark min-h-screen">
            {/* Header Section */}
            <div className="relative pt-40 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <SectionReveal>
                        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                            THE <span className="text-primary italic">VAULT.</span>
                        </h1>
                        <p className="text-xl text-white/40 max-w-2xl">
                            Explore our history of legendary drives and join our upcoming expeditions across the most challenging terrains.
                        </p>
                    </SectionReveal>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-32">
                {/* Search Bar */}
                <SectionReveal delay={0.2} className="mb-20">
                    <div className="relative group max-w-2xl">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl group-focus-within:bg-primary/40 transition-all duration-500 opacity-0 group-focus-within:opacity-100" />
                        <div className="relative flex items-center bg-secondary/30 border border-white/10 rounded-2xl px-6 py-4 backdrop-blur-xl group-focus-within:border-primary/50 transition-all">
                            <Search className="text-white/40 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Search expeditions by region or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none text-white w-full px-4 text-lg outline-none placeholder:text-white/20"
                            />
                        </div>
                    </div>
                </SectionReveal>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[4/5] rounded-3xl bg-secondary/20 animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                )}

                {!loading && filteredEvents.length === 0 && (
                    <div className="text-center py-40">
                        <p className="text-white/20 text-xl font-bold uppercase tracking-widest">No expeditions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
