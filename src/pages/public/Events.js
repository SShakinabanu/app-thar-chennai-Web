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
        <div className="bg-cream min-h-screen pt-32">
            {/* Header Section */}
            <div className="relative py-20 overflow-hidden bg-white border-b border-black/5">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <SectionReveal>
                        <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Expeditions</span>
                        <h1 className="text-6xl md:text-8xl font-black text-secondary mb-6 tracking-tighter uppercase font-oswald">
                            THE <span className="italic text-primary">VAULT.</span>
                        </h1>
                        <p className="text-xl text-secondary/40 max-w-2xl mx-auto font-medium leading-relaxed">
                            Explore our history of legendary drives and join our upcoming expeditions across the most challenging terrains.
                        </p>
                    </SectionReveal>
                </div>
            </div>

            <div className="container mx-auto px-6 py-20">
                {/* Search Bar */}
                <SectionReveal delay={0.2} className="mb-16">
                    <div className="relative group max-w-2xl mx-auto">
                        <div className="relative flex items-center bg-white border border-black/5 rounded-[2rem] px-8 py-5 shadow-2xl transition-all group-focus-within:border-primary/30">
                            <Search className="text-secondary/20 group-focus-within:text-primary transition-colors" size={24} />
                            <input
                                type="text"
                                placeholder="Search expeditions by region or name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none text-secondary w-full px-6 text-lg outline-none placeholder:text-secondary/20 font-medium"
                            />
                        </div>
                    </div>
                </SectionReveal>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="aspect-[4/5] rounded-[2.5rem] bg-white animate-pulse shadow-xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {filteredEvents.map((event, i) => (
                            <EventCard key={event.id} event={event} index={i} />
                        ))}
                    </div>
                )}

                {!loading && filteredEvents.length === 0 && (
                    <div className="text-center py-40">
                        <p className="text-secondary/20 text-xl font-black uppercase tracking-widest font-oswald">No expeditions found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;
