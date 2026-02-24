import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, onClick, className = '', variant = 'primary', size = 'md', icon: Icon, ...props }) => {
    const variants = {
        primary: 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/20',
        secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10',
        outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
        ghost: 'bg-transparent hover:bg-white/5 text-white',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg font-bold uppercase tracking-wider',
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50 ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
            {Icon && <Icon className="w-5 h-5" />}
        </motion.button>
    );
};

export default Button;
