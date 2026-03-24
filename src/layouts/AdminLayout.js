import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    Calendar,
    Users,
    MessageSquare,
    Image as ImageIcon,
    LogOut,
    ChevronRight,
    Settings,
    Shield,
    Bell,
    Cpu,
    Activity
} from 'lucide-react';

const AdminLayout = () => {
    const { admin, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    const menuItems = [
        { path: '/admin/panel/dashboard', icon: LayoutDashboard, label: 'Dashboard', subtext: 'System Overview' },
        { path: '/admin/panel/events', icon: Calendar, label: 'Expeditions', subtext: 'Event Management' },
        { path: '/admin/panel/registrations', icon: Users, label: 'Manifest', subtext: 'Member Influx' },
        { path: '/admin/panel/messages', icon: MessageSquare, label: 'Inbound', subtext: 'Support Terminal' },
        { path: '/admin/panel/banners', icon: ImageIcon, label: 'Assets', subtext: 'Visual Control' },
    ];

    return (
        <div className="flex min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white">
            {/* Sidebar - Command Tower */}
            <aside className="fixed inset-y-0 left-0 w-80 bg-[#0a0a0a] border-r border-white/5 z-50 flex flex-col overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-[-10%] left-[-10%] w-60 h-60 bg-primary/10 blur-[100px] pointer-events-none" />

                {/* Branding Section */}
                <div className="p-10 relative">
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-primary to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                            <div className="relative w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center">
                                <Shield className="text-primary" size={24} />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
                                Club <span className="text-primary">Ops</span>
                            </h2>
                            <div className="flex items-center gap-2 mt-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">System Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Terminal */}
                <nav className="flex-1 px-6 space-y-1.5 mt-4">
                    <div className="px-4 mb-4">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">Core Modules</p>
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`group flex items-center gap-4 px-4 py-4 rounded-2xl transition-all relative ${isActive
                                    ? 'bg-white/5 text-white border border-white/10'
                                    : 'text-white/40 hover:text-white hover:bg-white/[0.02]'
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black uppercase tracking-widest">{item.label}</p>
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-wider group-hover:text-white/40 transition-colors uppercase">{item.subtext}</p>
                                </div>
                                {isActive && (
                                    <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_rgba(255,102,0,0.8)]" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Status Card */}
                <div className="p-8 border-t border-white/5 bg-white/[0.01]">
                    <div className="flex items-center gap-4 p-4 rounded-3xl bg-white/5 border border-white/5 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center font-black text-sm">
                            {admin?.username?.[0] || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black truncate uppercase tracking-tighter">{admin?.username || 'Administrator'}</p>
                            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Root Access</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 text-white/40 hover:bg-primary/10 hover:text-primary transition-all font-black text-[10px] uppercase tracking-[0.2em] border border-white/5"
                    >
                        <LogOut size={14} />
                        <span>Terminate Session</span>
                    </button>
                </div>
            </aside>

            {/* Content Stage */}
            <main className="flex-1 ml-80 min-h-screen flex flex-col">
                {/* Tactical Topbar */}
                <header className="h-24 px-12 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#050505]/80 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                            <Cpu size={20} />
                        </div>
                        <div className="h-5 w-[1px] bg-white/10" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">Control Interface V2.0</span>
                    </div>

                    <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-3 bg-white/5 rounded-full pl-2 pr-5 py-2 border border-white/5">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Activity size={14} />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Latency: <span className="text-emerald-500">12ms</span></span>
                        </div>

                        <button className="relative p-3 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-[#050505]" />
                        </button>

                        <button className="p-3 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Viewport content */}
                <div className="p-12 animate-fade-in flex-1">
                    <Outlet />
                </div>

                {/* System Footer */}
                <footer className="p-12 pt-0 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
                    <div>© 2024 THAR OWNERS CLUB • CHENNAI CHAPTER</div>
                    <div className="flex items-center gap-4">
                        <span>System Load: 12%</span>
                        <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="w-1/4 h-full bg-primary" />
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default AdminLayout;
