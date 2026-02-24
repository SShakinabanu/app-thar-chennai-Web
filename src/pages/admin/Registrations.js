import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Filter, Calendar, Mail, Phone, MapPin, Search, ChevronRight } from 'lucide-react';

const Registrations = () => {
    const [registrations, setRegistrations] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [eventRes, regRes] = await Promise.all([
                    axios.get(`${process.env.REACT_APP_API_URL}/api/events`),
                    axios.get(`${process.env.REACT_APP_API_URL}/api/events/admin/registrations`)
                ]);
                setEvents(eventRes.data.data);
                setRegistrations(regRes.data.data);
            } catch (err) {
                toast.error('Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleFilter = async (eventId) => {
        setSelectedEvent(eventId);
        setLoading(true);
        try {
            const url = eventId
                ? `${process.env.REACT_APP_API_URL}/api/events/admin/registrations?event_id=${eventId}`
                : `${process.env.REACT_APP_API_URL}/api/events/admin/registrations`;
            const res = await axios.get(url);
            setRegistrations(res.data.data);
        } catch (err) {
            toast.error('Filtering failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Manifest of Registrants</h1>
                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Review and filter expedition attendees</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-secondary/50 border border-white/10 rounded-2xl px-5 py-3">
                        <Filter size={16} className="text-primary" />
                        <select
                            className="bg-transparent border-none outline-none text-white text-xs font-bold uppercase tracking-widest cursor-pointer"
                            value={selectedEvent}
                            onChange={(e) => handleFilter(e.target.value)}
                        >
                            <option value="" className="bg-secondary text-white">All Expeditions</option>
                            {events.map(e => (
                                <option key={e.id} value={e.id} className="bg-secondary text-white">
                                    {e.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-secondary/20 border border-white/5 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 w-full max-w-md">
                        <Search size={18} className="text-white/20" />
                        <input className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/20" placeholder="Search manifest..." />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Contact Identity</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Expedition</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Asset Configuration</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Location</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-right">Registration Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {registrations.map((reg) => (
                                <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                {reg.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white">{reg.name}</div>
                                                <div className="text-[10px] text-white/30 flex items-center gap-1 mt-0.5 lowercase">
                                                    <Mail size={10} /> {reg.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                            <span className="text-sm font-bold text-white/80">{reg.event_title}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 uppercase tracking-widest">
                                            {reg.thar_variant}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs text-white/40 flex items-center gap-1 uppercase tracking-wider">
                                            <MapPin size={12} className="text-primary" /> {reg.city}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="text-xs font-medium text-white/60">
                                            {new Date(reg.created_at).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                        </div>
                                        <div className="text-[10px] text-white/20 mt-1 uppercase">
                                            {new Date(reg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {registrations.length === 0 && !loading && (
                        <div className="p-24 text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                                <Search size={40} />
                            </div>
                            <p className="text-white font-bold">No registrants found</p>
                            <p className="text-xs text-white/20 uppercase tracking-widest mt-1">Try adjusting your filters or search query</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Registrations;
