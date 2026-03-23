import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Calendar, Send, Users, Shield, Zap, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';
import SectionReveal from '../../components/ui/SectionReveal';

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
        <div className="min-h-screen flex items-center justify-center bg-cream">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    if (!event) return (
        <div className="min-h-screen flex items-center justify-center bg-cream text-secondary/40 font-black uppercase tracking-widest text-xl font-oswald">
            Expedition Not Found
        </div>
    );

    return (
        <div className="bg-cream min-h-screen pb-32">
            {/* Header Section */}
            <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent z-10" />
                <img
                    src={event.banner_image ? `${process.env.REACT_APP_API_URL}${event.banner_image}` : 'https://images.unsplash.com/photo-1533596123456-dc09f1832049?auto=format&fit=crop&q=80&w=1600'}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />

                <div className="container mx-auto px-6 absolute top-40 left-0 right-0 z-20">
                    <SectionReveal>
                        <Link to="/events" className="inline-flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest mb-12 hover:gap-4 transition-all">
                            <ArrowLeft size={14} /> Back to Vault
                        </Link>
                        <div className="flex flex-wrap items-center gap-4 mb-8 text-[10px] font-black tracking-[0.3em] uppercase">
                            <span className="px-4 py-1.5 bg-primary rounded-full text-white shadow-lg">Active Expedition</span>
                            <span className="text-secondary/60 flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/50">
                                <Calendar size={14} /> {new Date(event.event_date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-black text-secondary mb-8 uppercase tracking-tighter leading-[0.9] font-oswald lg:max-w-5xl">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-10 text-secondary/60 font-black text-xs uppercase tracking-widest">
                            <div className="flex items-center gap-2"><MapPin size={18} className="text-primary" /> {event.location}</div>
                            <div className="flex items-center gap-2"><Users size={18} className="text-primary" /> Limited Slots Remaining</div>
                        </div>
                    </SectionReveal>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-24">
                <div className="grid lg:grid-cols-12 gap-20 items-start">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-7">
                        <SectionReveal>
                            <h2 className="text-3xl font-black text-secondary mb-10 border-l-8 border-primary pl-8 uppercase font-oswald tracking-tighter">THE MISSION</h2>
                            <div className="text-xl text-secondary/70 leading-relaxed space-y-8 font-medium">
                                {event.description.split('\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            <div className="mt-24 grid sm:grid-cols-2 gap-10">
                                {[
                                    { icon: Shield, title: "Expert Support", desc: "Certified recovery experts and technical crew on board for every trail." },
                                    { icon: Zap, title: "Elite Gear", desc: "Premium event stickers, merchandise, and trail kits for all participants." }
                                ].map((item, i) => (
                                    <div key={i} className="p-10 rounded-[2.5rem] bg-white border border-black/5 group shadow-xl hover:shadow-2xl transition-all duration-500">
                                        <div className="w-16 h-16 bg-cream rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-all shadow-inner">
                                            <item.icon size={28} />
                                        </div>
                                        <h4 className="text-xl font-black text-secondary mb-3 uppercase font-oswald tracking-tighter">{item.title}</h4>
                                        <p className="text-secondary/50 text-sm leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Right Column: Registration Form */}
                    <div className="lg:col-span-5 sticky top-32">
                        <SectionReveal delay={0.2}>
                            <div className="p-10 md:p-12 rounded-[3.5rem] bg-white shadow-2xl border border-black/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full" />

                                <h3 className="text-2xl font-black text-secondary mb-10 text-center uppercase tracking-[0.2em] font-oswald">Reserve Slot</h3>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/30">Enthusiast Name</label>
                                        <input
                                            type="text" required
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-5 text-secondary focus:border-primary outline-none transition-all placeholder:text-secondary/20 font-medium"
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/30">Email</label>
                                            <input
                                                type="email" required
                                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full bg-cream/30 border border-black/5 rounded-2xl p-5 text-secondary focus:border-primary outline-none transition-all font-medium"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/30">Phone</label>
                                            <input
                                                type="tel" required
                                                value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full bg-cream/30 border border-black/5 rounded-2xl p-5 text-secondary focus:border-primary outline-none transition-all font-medium"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/30">Vehicle Intel</label>
                                        <input
                                            type="text" required
                                            value={formData.thar_variant} onChange={(e) => setFormData({ ...formData, thar_variant: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-5 text-secondary focus:border-primary outline-none transition-all font-medium"
                                            placeholder="e.g. Thar ROXX 4x4 AT"
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={submitting}
                                        className="w-full bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest py-6 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-3"
                                    >
                                        <Send size={20} />
                                        {submitting ? 'Authenticating...' : 'Confirm Expedition'}
                                    </button>

                                    <p className="text-[9px] text-center text-secondary/30 uppercase tracking-[0.25em] font-black px-4 leading-relaxed">
                                        Pre-registration required. Our convoy masters will contact you within 24 hours.
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
