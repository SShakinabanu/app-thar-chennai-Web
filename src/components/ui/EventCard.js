import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionReveal from '../ui/SectionReveal';

const EventCard = ({ event, index }) => {
    return (
        <SectionReveal delay={index * 0.1}>
            <Link to={`/events/${event.id}`} className="block group">
                <div className="relative rounded-3xl overflow-hidden bg-secondary aspect-[4/5]">
                    {/* Image */}
                    <img
                        src={event.banner_image ? `${process.env.REACT_APP_API_URL}${event.banner_image}` : 'https://images.unsplash.com/photo-1533596123456-dc09f1832049?auto=format&fit=crop&q=80&w=800'}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 w-full p-8">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-primary rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                                {new Date(event.event_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                            <span className="flex items-center gap-1 text-white/60 text-xs font-medium">
                                <MapPin size={12} className="text-primary" /> {event.location}
                            </span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-primary transition-colors duration-300">
                            {event.title}
                        </h3>

                        <div className="flex items-center justify-between text-white/40 group-hover:text-white transition-all duration-300">
                            <span className="text-xs font-bold tracking-widest uppercase">View Details</span>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </SectionReveal>
    );
};

export default EventCard;
