import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, CheckCircle, Send, Users, Shield, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import SectionReveal from '../../components/ui/SectionReveal';
import Button from '../../components/ui/Button';

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        thar_variant: '',
        city: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
                setEvent(res.data.data);
            } catch (err) {
                toast.error('Failed to load event details');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/events/register`, {
                event_id: id,
                ...formData
            });
            toast.success('Registration successful! We will contact you soon.');
            setFormData({ name: '', email: '', phone: '', thar_variant: '', city: '', message: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-dark">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center bg-dark text-white/40 font-bold uppercase tracking-widest text-xl">
            Expedition Not Found
        </div>
    );

    return (
        <div className="bg-dark min-h-screen pb-32">
            {/* Premium Header/Banner */}
            <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent z-10" />
                <img
                    src={event.banner_image ? `${process.env.REACT_APP_API_URL}${event.banner_image}` : 'https://images.unsplash.com/photo-1533596123456-dc09f1832049?auto=format&fit=crop&q=80&w=1600'}
                    alt={event.title}
                    className="w-full h-full object-cover scale-105"
                />

                <div className="container mx-auto px-6 absolute bottom-12 left-0 right-0 z-20">
                    <SectionReveal>
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-xs font-bold tracking-[0.3em] uppercase">
                            <span className="px-3 py-1 bg-primary rounded-full text-white">Active Expedition</span>
                            <span className="text-white/40 flex items-center gap-2"><Calendar size={14} /> {new Date(event.event_date).toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none">
                            {event.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/60">
                            <div className="flex items-center gap-2 font-bold"><MapPin size={18} className="text-primary" /> {event.location}</div>
                            <div className="flex items-center gap-2 font-bold"><Users size={18} className="text-primary" /> 40+ Slots Remaining</div>
                        </div>
                    </SectionReveal>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-24">
                <div className="grid lg:grid-cols-12 gap-16">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-7">
                        <SectionReveal>
                            <h2 className="text-3xl font-black text-white mb-8 border-l-4 border-primary pl-6">THE EXPEDITION</h2>
                            <div className="text-lg text-white/60 leading-relaxed space-y-6">
                                {event.description.split('\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div className="mt-20 grid sm:grid-cols-2 gap-8">
                                {[
                                    { icon: Shield, title: "Expert Support", desc: "Certified recovery experts on board." },
                                    { icon: Zap, title: "Elite Gear", desc: "Premium stickers and event kit." }
                                ].map((item, i) => (
                                    <div key={i} className="p-8 rounded-3xl bg-secondary/20 border border-white/5 group hover:border-primary/20 transition-all">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                                            <item.icon size={24} />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Right Column: Registration Form */}
                    <div className="lg:col-span-5">
                        <SectionReveal delay={0.2} className="sticky top-32">
                            <div className="p-10 rounded-[40px] bg-secondary/30 backdrop-blur-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full" />

                                <h3 className="text-2xl font-black text-white mb-10 text-center uppercase tracking-widest">Reserve Your Seat</h3>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Full Name</label>
                                        <input
                                            type="text" required
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all placeholder:text-white/10"
                                            placeholder="Thar Enthusiast"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Email</label>
                                            <input
                                                type="email" required
                                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Phone</label>
                                            <input
                                                type="tel" required
                                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Thar Variant</label>
                                        <input
                                            type="text" required
                                            value={formData.thar_variant} onChange={(e) => setFormData({ ...formData, thar_variant: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                            placeholder="e.g. 4x4 Diesel AT"
                                        />
                                    </div>

                                    <Button type="submit" size="lg" className="w-full py-6 rounded-2xl" disabled={submitting} icon={Send}>
                                        {submitting ? 'Authenticating...' : 'Confirm Expedition'}
                                    </Button>

                                    <p className="text-[10px] text-center text-white/20 uppercase tracking-widest font-bold px-4">
                                        Pre-registration required. We will confirm your slot within 24 hours.
                                    </p>
                                </form>
                            </div>
                        </SectionReveal>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
