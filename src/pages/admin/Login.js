import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Lock, User, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(credentials.username, credentials.password);
        if (res.success) {
            toast.success('Access Granted. Initializing console...');
            navigate('/admin/dashboard');
        } else {
            toast.error(res.message || 'Access Denied. Unauthorized signature.');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505] relative overflow-hidden selection:bg-primary selection:text-white">
            {/* Background Effects */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

            <div className="relative w-full max-w-[480px] p-8">
                <div className="mb-12 text-center">
                    <div className="relative inline-flex mb-8">
                        <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                        <div className="relative w-20 h-20 bg-black border border-white/10 rounded-[32px] flex items-center justify-center shadow-2xl">
                            <ShieldCheck className="text-primary" size={40} />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                        Command <span className="text-primary">Center</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Administrative Gateway v2</p>
                    </div>
                </div>

                <div className="bg-secondary/20 border border-white/5 p-10 rounded-[48px] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                    <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Identity Tag</label>
                            <div className="relative group/field">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter Username"
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] ml-1">Access Key</label>
                            <div className="relative group/field">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-primary to-orange-600 py-5 rounded-2xl text-white font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:grayscale"
                        >
                            {loading ? (
                                <>
                                    <Cpu size={20} className="animate-spin" />
                                    <span>Decrypting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Initialize Access</span>
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Subtle scanline effect */}
                    <div className="absolute inset-x-0 top-0 h-[100%] bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:animate-scanline pointer-events-none" />
                </div>

                <div className="mt-10 text-center flex flex-col items-center gap-4">
                    <a href="/" className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                        ← Terminate and Return to Site
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
