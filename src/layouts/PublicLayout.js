import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => (
    <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/918946045205?text=Hello%20I%20want%20to%20join%20Thar%20Club"
        target="_blank"
        rel="noreferrer"
        style={{ position: 'fixed', bottom: '32px', right: '32px', width: '60px', height: '60px', background: '#25D366', color: 'white', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, boxShadow: '0 8px 32px rgba(37,211,102,0.3)', textDecoration: 'none' }}
    >
        <MessageCircle size={28} />
    </motion.a>
);

const PublicLayout = () => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fdf6ee' }}>
            <Navbar />
            <main style={{ flexGrow: 1, paddingTop: '88px' }}>
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default PublicLayout;