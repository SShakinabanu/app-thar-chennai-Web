import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Plus, Trash2, Image as ImageIcon, Upload, X, Shield, Layout } from 'lucide-react';

const BannerManagement = () => {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');

    const fetchBanners = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/banners`);
            setBanners(res.data.data);
        } catch (err) {
            toast.error('Asset retrieval failure');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return toast.error('Selection required');

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('subtitle', subtitle);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/banners`, formData);
            toast.success('Asset deployed to production');
            setFile(null);
            setTitle('');
            setSubtitle('');
            fetchBanners();
        } catch (err) {
            toast.error('Deployment failure');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this asset from global headers?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/banners/${id}`);
                toast.success('Asset decommissioned');
                fetchBanners();
            } catch (err) {
                toast.error('Decommissioning failed');
            }
        }
    };

    return (
        <div className="space-y-12">
            <div>
                <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Visual Asset Controls</h1>
                <p className="text-white/40 text-sm mt-1 uppercase tracking-widest font-bold">Manage global homepage hero sequence</p>
            </div>

            {/* Advanced Upload Interface */}
            <div className="p-10 rounded-[40px] bg-secondary/20 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 text-white/5">
                    <Layout size={120} />
                </div>

                <h3 className="text-lg font-black text-white uppercase tracking-widest mb-10 flex items-center gap-3">
                    <Plus className="text-primary" size={24} /> New Asset Deployment
                </h3>

                <form onSubmit={handleUpload} className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-end relative z-10">
                    <div className="space-y-2 lg:col-span-1">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Hero Asset (JPG/PNG)</label>
                        <label className="flex items-center gap-4 w-full bg-white/5 border border-white/10 border-dashed rounded-2xl p-4 cursor-pointer hover:bg-white/[0.07] transition-all overflow-hidden whitespace-nowrap">
                            <Upload size={18} className="text-primary shrink-0" />
                            <span className="text-sm truncate">{file ? file.name : 'Choose File'}</span>
                            <input type="file" required className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        </label>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Overlay Header</label>
                        <input
                            type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                            placeholder="Primary Title"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest ml-1">Sub-context</label>
                        <input
                            type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-primary outline-none transition-all"
                            placeholder="Supporting Text"
                        />
                    </div>

                    <button type="submit" className="bg-primary py-4 px-8 rounded-2xl text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-primary-dark transition-all shadow-xl shadow-primary/10">
                        <Plus size={20} /> Deploy
                    </button>
                </form>
            </div>

            {/* Content Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {banners.map((banner) => (
                    <div key={banner.id} className="group relative rounded-[40px] bg-secondary/20 border border-white/5 overflow-hidden transition-all hover:border-white/10 shadow-2xl">
                        <div className="aspect-video relative overflow-hidden">
                            <img
                                src={`${process.env.REACT_APP_API_URL}${banner.image_path}`}
                                alt=""
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-6 left-8 right-8">
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter leading-tight">{banner.title || 'Untitled Asset'}</h4>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mt-1 line-clamp-1">{banner.subtitle}</p>
                            </div>

                            <button
                                onClick={() => handleDelete(banner.id)}
                                className="absolute top-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-md text-white/40 hover:text-primary hover:bg-black/60 transition-all border border-white/10"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest font-black">Live Production</span>
                            </div>
                            <div className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
                                ID: {banner.id.toString().padStart(4, '0')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {banners.length === 0 && !loading && (
                <div className="p-32 text-center rounded-[40px] bg-secondary/10 border border-white/5 border-dashed">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 text-white/10">
                        <ImageIcon size={48} />
                    </div>
                    <p className="text-xl font-black text-white uppercase tracking-tighter">No Active Assets</p>
                    <p className="text-sm text-white/20 uppercase tracking-[0.2em] font-bold mt-2">Initialize the hero sequence above</p>
                </div>
            )}
        </div>
    );
};

export default BannerManagement;