import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Linkedin } from 'lucide-react';
import SectionReveal from '../../components/ui/SectionReveal';

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
        <div className="bg-cream min-h-screen pt-40 pb-32">
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-start">
                    {/* Left Side: Text & Info */}
                    <div>
                        <SectionReveal>
                            <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-6 block">Direct Line</span>
                            <h1 className="text-6xl md:text-8xl font-black text-secondary mb-8 tracking-tighter leading-none uppercase font-oswald">
                                GET IN <br />
                                <span className="text-primary italic">TOUCH.</span>
                            </h1>
                            <p className="text-xl text-secondary/50 max-w-md leading-relaxed mb-16 font-medium">
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
                                        <div className="w-16 h-16 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xl">
                                            <item.icon size={28} />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black tracking-widest uppercase text-secondary/30 mb-2">{item.title}</h4>
                                            <p className="text-xl font-black text-secondary uppercase font-oswald">{item.value}</p>
                                        </div>
                                    </div>
                                </SectionReveal>
                            ))}
                        </div>

                        <SectionReveal delay={0.4} className="mt-20">
                            <h4 className="text-[10px] font-black tracking-widest uppercase text-secondary/30 mb-8">Follow Our Trails</h4>
                            <div className="flex gap-4">
                                {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                                    <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-secondary/30 hover:text-primary hover:border-primary transition-all duration-300 shadow-sm">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </SectionReveal>
                    </div>

                    {/* Right Side: Contact Form */}
                    <SectionReveal delay={0.2}>
                        <div className="p-8 md:p-12 rounded-[3rem] bg-white shadow-2xl border border-black/5 relative overflow-hidden">
                            <h3 className="text-2xl font-black text-secondary mb-10 uppercase tracking-widest font-oswald">Enquiry Form</h3>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/40">Full Name</label>
                                        <input
                                            type="text" required
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-4 text-secondary focus:border-primary outline-none transition-all placeholder:text-secondary/10 font-medium"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/40">Email Address</label>
                                        <input
                                            type="email" required
                                            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-4 text-secondary focus:border-primary outline-none transition-all font-medium"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/40">Phone</label>
                                        <input
                                            type="tel" required
                                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-4 text-secondary focus:border-primary outline-none transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/40">Subject</label>
                                        <input
                                            type="text" required
                                            value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            className="w-full bg-cream/30 border border-black/5 rounded-2xl p-4 text-secondary focus:border-primary outline-none transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary/40">Detailed Message</label>
                                    <textarea
                                        rows="4" required
                                        value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full bg-cream/30 border border-black/5 rounded-2xl p-4 text-secondary focus:border-primary outline-none transition-all resize-none font-medium"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className="w-full bg-primary hover:bg-primary-dark text-white font-black uppercase tracking-widest py-5 rounded-2xl text-sm transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30 active:scale-95 flex items-center justify-center gap-3"
                                >
                                    <Send size={18} />
                                    {submitting ? 'Transmitting...' : 'Send Message'}
                                </button>
                            </form>
                        </div>
                    </SectionReveal>
                </div>
            </div>
        </div>
    );
};

export default Contact;
