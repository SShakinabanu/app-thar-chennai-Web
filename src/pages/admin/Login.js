import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { Lock, User, ShieldCheck, Cpu, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ username: '', password: '' });
    const [touched, setTouched] = useState({ username: false, password: false });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const validate = (name, value) => {
        if (!value.trim()) {
            return name === 'username' ? 'Username is required.' : 'Password is required.';
        }
        if (name === 'username' && value.trim().length < 3) {
            return 'Username must be at least 3 characters.';
        }

        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        setErrors(prev => ({ ...prev, [name]: validate(name, value) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const usernameErr = validate('username', credentials.username);
        const passwordErr = validate('password', credentials.password);
        setTouched({ username: true, password: true });
        setErrors({ username: usernameErr, password: passwordErr });
        if (usernameErr || passwordErr) return;

        setLoading(true);
        const res = await login(credentials.username, credentials.password);
        if (res.success) {
            toast.success('Access granted. Welcome back!', {
                position: 'top-right',
                autoClose: 3000,
                style: { background: '#fff', color: '#1a1a1a', borderLeft: '4px solid #22c55e', fontWeight: 700 }
            });
            navigate('/home');
        } else {
            toast.error(res.message || 'Invalid credentials. Please try again.', {
                position: 'top-right',
                autoClose: 4000,
                style: { background: '#fff', color: '#1a1a1a', borderLeft: '4px solid #c0002a', fontWeight: 700 }
            });
        }
        setLoading(false);
    };

    const fieldStyle = (name) => ({
        width: '100%',
        background: errors[name] && touched[name] ? '#fff5f5' : '#f9fafb',
        border: `1.5px solid ${errors[name] && touched[name] ? '#c0002a' : '#e5e7eb'}`,
        borderRadius: '12px',
        padding: '13px 16px 13px 44px',
        fontSize: '14px',
        color: '#1a1a1a',
        outline: 'none',
        transition: 'border 0.2s, box-shadow 0.2s',
        boxSizing: 'border-box',
    });

    return (
        <>
            <style>{`
                .login-input:focus {
                    border-color: #c0002a !important;
                    box-shadow: 0 0 0 3px rgba(192,0,42,0.08) !important;
                }
                .login-input::placeholder { color: #9ca3af; }
                .submit-btn:hover:not(:disabled) {
                    transform: scale(1.02);
                    box-shadow: 0 12px 32px rgba(192,0,42,0.25) !important;
                }
                .submit-btn:active:not(:disabled) { transform: scale(0.98); }
            `}</style>

            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #f8f9fa 0%, #fff0f0 50%, #fafafa 100%)',
                padding: '24px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Subtle background blobs */}
                <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '400px', height: '400px', background: 'rgba(192,0,42,0.06)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-5%', left: '-5%', width: '300px', height: '300px', background: 'rgba(192,0,42,0.04)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

                <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                        <div style={{ position: 'relative', display: 'inline-flex', marginBottom: '20px' }}>
                            <div style={{ position: 'absolute', inset: '-8px', background: 'rgba(192,0,42,0.12)', borderRadius: '50%', filter: 'blur(16px)' }} />
                            <div style={{ position: 'relative', width: '72px', height: '72px', background: 'white', border: '1.5px solid rgba(192,0,42,0.15)', borderRadius: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 32px rgba(192,0,42,0.12)' }}>
                                <ShieldCheck color="#c0002a" size={36} />
                            </div>
                        </div>
                        <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#1a1a1a', letterSpacing: '-0.03em', margin: '0 0 6px', fontFamily: 'Oswald, sans-serif' }}>
                            THAR <span style={{ color: '#c0002a' }}>CHENNAI</span>
                        </h1>
                        <p style={{ fontSize: '12px', color: 'rgba(26,26,26,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                            Admin Portal
                        </p>
                    </div>

                    {/* Card */}
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '40px 36px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 24px 64px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.06)'
                    }}>
                        <form onSubmit={handleSubmit} noValidate>

                            {/* Username */}
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(26,26,26,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                    Username <span style={{ color: '#c0002a' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: errors.username && touched.username ? '#c0002a' : '#9ca3af', pointerEvents: 'none' }} />
                                    <input
                                        type="text"
                                        name="username"
                                        className="login-input"
                                        placeholder="Enter username"
                                        value={credentials.username}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ ...fieldStyle('username'), paddingRight: '16px' }}
                                    />
                                </div>
                                {errors.username && touched.username && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px', color: '#c0002a', fontSize: '12px', fontWeight: 600 }}>
                                        <AlertCircle size={13} />
                                        {errors.username}
                                    </div>
                                )}
                            </div>

                            {/* Password */}
                            <div style={{ marginBottom: '28px' }}>
                                <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: 'rgba(26,26,26,0.55)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                                    Password <span style={{ color: '#c0002a' }}>*</span>
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: errors.password && touched.password ? '#c0002a' : '#9ca3af', pointerEvents: 'none' }} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        className="login-input"
                                        placeholder="Enter password"
                                        value={credentials.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        style={{ ...fieldStyle('password'), paddingRight: '44px' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}
                                        style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', display: 'flex', padding: 0 }}
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && touched.password && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '6px', color: '#c0002a', fontSize: '12px', fontWeight: 600 }}>
                                        <AlertCircle size={13} />
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="submit-btn"
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(135deg, #c0002a 0%, #e8003a 100%)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    padding: '15px',
                                    fontSize: '13px',
                                    fontWeight: 900,
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.15em',
                                    cursor: loading ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '10px',
                                    transition: 'all 0.2s',
                                    boxShadow: '0 8px 24px rgba(192,0,42,0.2)',
                                    opacity: loading ? 0.7 : 1,
                                    fontFamily: 'Oswald, sans-serif'
                                }}
                            >
                                {loading ? (
                                    <>
                                        <Cpu size={18} style={{ animation: 'spin 1s linear infinite' }} />
                                        <span>Verifying...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Login</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                        </form>
                    </div>

                    {/* Back link */}
                    <div style={{ textAlign: 'center', marginTop: '28px' }}>
                        <a href="/" style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(26,26,26,0.35)', textTransform: 'uppercase', letterSpacing: '0.2em', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={e => e.currentTarget.style.color = '#c0002a'}
                            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.35)'}>
                            ← Back to Home
                        </a>
                    </div>

                </div>

                <style>{`
                    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </>
    );
};

export default Login;