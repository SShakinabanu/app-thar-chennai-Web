import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Do NOT restore admin session from localStorage on load.
        // is_admin is only set after a successful live login verification.
        localStorage.removeItem('thar_admin_data');
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const { data, error } = await supabase
                .from('admin_access')
                .select('*')
                .eq('username', username.trim())
                .eq('password', password.trim())
                .limit(1);

            if (error) {
                console.error('Supabase error:', error);
                return { success: false, message: 'Database error: ' + (error.message || 'Please try again.') };
            }

            if (!data || data.length === 0) {
                return { success: false, message: 'Invalid username or password.' };
            }

            const row = data[0];
            const adminData = {
                id: row.id,
                username: row.username,
                is_admin: true,
            };
            localStorage.setItem('thar_admin_data', JSON.stringify(adminData));
            setAdmin(adminData);
            return { success: true };

        } catch (err) {
            console.error('Login exception:', err);
            if (err.message?.includes('fetch') || err.message?.includes('NetworkError') || err.message?.includes('Failed to fetch')) {
                return { success: false, message: 'Cannot reach database. Your Supabase project may be paused — please restore it at supabase.com/dashboard.' };
            }
            return { success: false, message: 'Login failed: ' + err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('thar_admin_data');
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
