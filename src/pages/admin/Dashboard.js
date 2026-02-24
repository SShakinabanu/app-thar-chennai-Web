import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Users, MessageSquare, TrendingUp, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({ events: 0, registrations: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/stats`);
                setStats(res.data.stats);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Events', value: stats.events, icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'Registrations', value: stats.registrations, icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Support Inbound', value: stats.messages, icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    ];

    return (
        <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="p-8 rounded-[32px] bg-secondary/20 border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                            <div className="flex items-center justify-between mb-8">
                                <div className={`w-14 h-14 ${card.bg} ${card.color} rounded-2xl flex items-center justify-center`}>
                                    <Icon size={24} />
                                </div>
                                <div className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full flex items-center gap-1 uppercase tracking-widest">
                                    <TrendingUp size={12} /> Live
                                </div>
                            </div>

                            <h2 className="text-5xl font-black text-white mb-2 tracking-tighter tabular-nums">{card.value}</h2>
                            <p className="text-xs font-bold text-white/20 uppercase tracking-[0.2em]">{card.label}</p>

                            <ArrowUpRight className="absolute bottom-8 right-8 text-white/5 opacity-0 group-hover:opacity-100 transition-opacity" size={40} />
                        </div>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-1 gap-8">
                <div className="p-10 rounded-[40px] bg-secondary/20 border border-white/5">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-xl font-black text-white uppercase tracking-tighter">Expedition Activity</h2>
                        <button className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:underline transition-all">View All Logs</button>
                    </div>

                    <div className="min-h-[300px] flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center text-white/10">
                            <Calendar size={32} />
                        </div>
                        <div>
                            <p className="text-white font-bold">No active expeditions logged</p>
                            <p className="text-xs text-white/20 uppercase tracking-widest mt-1">Activity will appear once events are created</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

