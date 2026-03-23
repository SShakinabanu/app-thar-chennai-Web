import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionReveal from '../ui/SectionReveal';

const EventCard = ({ event, index }) => {
    return (
        <SectionReveal delay={index * 0.1}>
            <Link to={`/events/${event.id}`} className="block group">
                <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-500 aspect-[4/5] border border-black/5">
                    {/* Image */}
                    <img
                        src={event.banner_image ? `${process.env.REACT_APP_API_URL}${event.banner_image}` : 'https://images.unsplash.com/photo-1533596123456-dc09f1832049?auto=format&fit=crop&q=80&w=800'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary rounded-full text-[10px] font-black tracking-widest uppercase text-white shadow-lg">
                                {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1 text-white/60 text-[10px] font-black uppercase tracking-widest">
                                <MapPin size={12} className="text-primary" /> {event.location}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-6 group-hover:text-primary transition-colors duration-300 uppercase font-oswald tracking-tighter leading-tight">
                            {event.title}
                        </h3>

                        <div className="flex items-center justify-between text-white/40 group-hover:text-white transition-all duration-300">
                            <span className="text-[10px] font-black tracking-[0.2em] uppercase">Expedition Intel</span>
                            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-xl">
                                <ArrowRight size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </SectionReveal>
    );
};

export default EventCard;
