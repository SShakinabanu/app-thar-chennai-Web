import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';
import SectionReveal from '../../components/ui/SectionReveal';
import Button from '../../components/ui/Button';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/messages`, formData);
            toast.success('Your message has been sent. We will get back to you soon!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (err) {
            toast.error('Failed to send message. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-dark min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Left Side: Text & Info */}
                    <div>
                        <SectionReveal>
                            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Direct Line</span>
                            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none uppercase">
                                GET IN <br />
                                <span className="text-white/20 italic">TOUCH.</span>
                            </h1>
                            <p className="text-xl text-white/50 max-w-md leading-relaxed mb-16">
                                Whether you have a membership enquiry or want to partner for an event, our team is ready to assist you.
                            </p>
                        </SectionReveal>

                        <div className="space-y-12">
                            {[
                                { icon: Mail, title: "Official Correspondence", value: "support@tharownersclub.xyz" },
                                { icon: Phone, title: "Concierge Service", value: "+91 89460 45205" },
                                { icon: MapPin, title: "Regional Headquarters", value: "Nungambakkam High Road, Chennai" }
                            ].map((item, i) => (
                                <SectionReveal key={i} delay={i * 0.1}>
                                    <div className="flex gap-8 group">
                                        <div className="w-16 h-16 rounded-2xl bg-secondary/50 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">{item.title}</h4>
                                            <p className="text-xl font-bold text-white">{item.value}</p>
                                        </div>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        <SectionReveal delay={0.4} className="mt-20">
                            <h4 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-8">Follow Our Trails</h4>
                            <div className="flex gap-6">
                                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-primary hover:border-primary transition-all duration-300">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Right Side: Contact Form */}
                    <SectionReveal delay={0.2}>
                        <div className="p-12 md:p-16 rounded-[40px] bg-secondary/30 backdrop-blur-3xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 blur-[100px] rounded-full" />

                            <h3 className="text-3xl font-black text-white mb-10 uppercase tracking-widest">Enquiry Form</h3>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Full Name</label>
                                        <input
                                            type="text" required
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all placeholder:text-white/10"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Email Address</label>
                                        <input
                                            type="email" required
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Phone</label>
                                        <input
                                            type="tel" required
                                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Subject</label>
                                        <input
                                            type="text" required
                                            value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 pl-2">Detailed Message</label>
                                    <textarea
                                        rows="4" required
                                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full py-6 rounded-2xl" disabled={submitting} icon={Send}>
                                    {submitting ? 'Transmitting...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
};

export default Contact;
