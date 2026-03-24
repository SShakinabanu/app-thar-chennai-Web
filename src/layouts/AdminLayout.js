import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const AdminLayout = () => {
    const { admin, loading } = useAuth();

    if (loading) return null;
    if (!admin?.is_admin) return <Navigate to="/admin" />;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fdf6ee' }}>
            <Navbar />
            <main style={{ flexGrow: 1, paddingTop: '120px', paddingBottom: '80px' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default AdminLayout;
