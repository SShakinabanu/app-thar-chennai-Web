import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('thar_admin_token');
        const storedAdmin = localStorage.getItem('thar_admin_data');
        if (token && storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/admin/login`, { username, password });
            if (res.data.success) {
                const { token, admin } = res.data;
                localStorage.setItem('thar_admin_token', token);
                localStorage.setItem('thar_admin_data', JSON.stringify(admin));
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAdmin(admin);
                return { success: true };
            }
        } catch (err) {
            return { success: false, message: err.response?.data?.message || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('thar_admin_token');
        localStorage.removeItem('thar_admin_data');
        delete axios.defaults.headers.common['Authorization'];
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
