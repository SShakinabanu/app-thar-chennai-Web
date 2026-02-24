import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CheckCircle, Trash2, Clock, Mail, Phone, MessageSquare, ShieldCheck, Timer } from 'lucide-react';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages`);
            setMessages(res.data.data);
        } catch (err) {
            toast.error('Failed to load messages');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleResolve = async (id) => {
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/api/messages/${id}`, { status: 'resolved' });
            toast.success('Inquiry successfully neutralized');
            fetchMessages();
        } catch (err) {
            toast.error('Protocol failure');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Purge this inquiry from archives?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/messages/${id}`);
                toast.success('Record purged');
                fetchMessages();
            } catch (err) {
                toast.error('Purge failed');
            }
        }
    };

    return (
        <div className="space-y-10">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Support Inbound</h1>
                <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Monitor and manage club inquiries</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                {messages.map((msg) => (
                    <div key={msg.id} className="group relative p-8 rounded-[40px] bg-secondary/20 border border-white/5 hover:border-white/10 transition-all overflow-hidden">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                {msg.status === 'resolved' ? (
                                    <div className="px-3 py-1 bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <ShieldCheck size={12} /> Resolved
                                    </div>
                                ) : (
                                    <div className="px-3 py-1 bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <Timer size={12} className="animate-spin-slow" /> Pending
                                    </div>
                                )}
                                <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold flex items-center gap-1">
                                    <Clock size={12} /> {new Date(msg.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {msg.status !== 'resolved' && (
                                    <button
                                        onClick={() => handleResolve(msg.id)}
                                        className="p-2 rounded-lg bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20 transition-all"
                                    >
                                        <CheckCircle size={18} />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(msg.id)}
                                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">{msg.subject}</h3>
                            <div className="bg-white/5 rounded-2xl p-6 text-white/50 text-sm leading-relaxed border border-white/5 italic">
                                "{msg.message}"
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary font-black uppercase">
                                    {msg.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-sm">{msg.name}</div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] text-white/20 uppercase tracking-widest flex items-center gap-1 font-bold">
                                            <Mail size={10} /> {msg.email}
                                        </span>
                                        <span className="text-[10px] text-white/20 uppercase tracking-widest flex items-center gap-1 font-bold">
                                            <Phone size={10} /> {msg.phone}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href={`mailto:${msg.email}`}
                                className="px-6 py-3 bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl border border-white/5 hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
                            >
                                <Mail size={14} /> Send Reply
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {messages.length === 0 && !loading && (
                <div className="p-24 text-center">
                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                        <MessageSquare size={40} />
                    </div>
                    <p className="text-white font-bold">No incoming transmissions</p>
                    <p className="text-xs text-white/20 uppercase tracking-widest mt-1">Inbox is currently optimized</p>
                </div>
            )}
        </div>
    );
};

export default Messages;
