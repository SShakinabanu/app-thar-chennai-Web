import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Edit, X, Save, Calendar, MapPin, Image as ImageIcon, Search } from 'lucide-react';
import Button from '../../components/ui/Button';

const ManageEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        event_date: '',
        banner_image: null
    });

    const fetchEvents = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/events`);
            setEvents(res.data.data);
        } catch (err) {
            toast.error('Failed to fetch events');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('location', formData.location);
        data.append('event_date', formData.event_date);
        if (formData.banner_image) {
            data.append('banner_image', formData.banner_image);
        }

        try {
            if (editingEvent) {
                await axios.put(`${process.env.REACT_APP_API_URL}/api/events/${editingEvent.id}`, data);
                toast.success('Event updated successfully');
            } else {
                await axios.post(`${process.env.REACT_APP_API_URL}/api/events`, data);
                toast.success('Event created successfully');
            }
            setShowModal(false);
            setEditingEvent(null);
            setFormData({ title: '', description: '', location: '', event_date: '', banner_image: null });
            fetchEvents();
        } catch (err) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/events/${id}`);
                toast.success('Event deleted');
                fetchEvents();
            } catch (err) {
                toast.error('Delete failed');
            }
        }
    };

    const openEdit = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            location: event.location,
            event_date: event.event_date.split('T')[0],
            banner_image: null
        });
        setShowModal(true);
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Expedition Management</h1>
                    <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Manage your club drives and events</p>
                </div>
                <Button
                    onClick={() => { setEditingEvent(null); setFormData({ title: '', description: '', location: '', event_date: '', banner_image: null }); setShowModal(true); }}
                    icon={Plus}
                >
                    Create New Event
                </Button>
            </div>

            <div className="bg-secondary/20 border border-white/5 rounded-[40px] overflow-hidden">
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 w-full max-w-md">
                        <Search size={18} className="text-white/20" />
                        <input className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-white/20" placeholder="Filter expeditions..." />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-white/[0.02] border-b border-white/5">
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Banner</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Title & Location</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Execution Date</th>
                                <th className="px-8 py-6 text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] text-right">Settings</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {events.map((event) => (
                                <tr key={event.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="w-20 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                            <img
                                                src={`${process.env.REACT_APP_API_URL}${event.banner_image}`}
                                                alt=""
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="font-bold text-white">{event.title}</div>
                                        <div className="text-xs text-white/30 flex items-center gap-1 mt-1 uppercase tracking-wider">
                                            <MapPin size={10} /> {event.location}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-medium text-white/60 flex items-center gap-2">
                                            <Calendar size={14} className="text-primary" />
                                            {new Date(event.event_date).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => openEdit(event)}
                                                className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className="p-3 rounded-xl bg-white/5 text-white/40 hover:text-primary hover:bg-primary/10 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {events.length === 0 && !loading && (
                        <div className="p-24 text-center">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 text-white/10">
                                <Calendar size={40} />
                            </div>
                            <p className="text-white font-bold">No expeditions scheduled</p>
                            <p className="text-xs text-white/20 uppercase tracking-widest mt-1">Start by creating your first club event</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowModal(false)} />

                    <div className="relative w-full max-w-2xl bg-secondary/90 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-slide-up">
                        <div className="p-10 border-b border-white/5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                                    {editingEvent ? 'Edit Expedition' : 'New Expedition'}
                                </h2>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Configure event parameters</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-10 space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Event Title</label>
                                    <input
                                        type="text" required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                        placeholder="e.g. Coastal Drive 2024"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Location</label>
                                    <input
                                        type="text" required
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                        placeholder="e.g. Mahabalipuram"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Event Date</label>
                                    <input
                                        type="date" required
                                        value={formData.event_date}
                                        onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2 text-white/20">
                                    <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Banner Asset</label>
                                    <label className="flex items-center gap-4 w-full bg-white/5 border border-white/10 border-dashed rounded-2xl p-4 cursor-pointer hover:bg-white/[0.07] transition-all">
                                        <ImageIcon size={20} className="text-primary" />
                                        <span className="text-sm">Upload Image</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            onChange={(e) => setFormData({ ...formData, banner_image: e.target.files[0] })}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Brief Description</label>
                                <textarea
                                    rows="4" required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all resize-none"
                                    placeholder="Outline the expedition plan and highlights..."
                                />
                            </div>

                            <button type="submit" className="w-full bg-primary py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                                <Save size={20} /> {editingEvent ? 'Update Expedition' : 'Initialize Event'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageEvents;
