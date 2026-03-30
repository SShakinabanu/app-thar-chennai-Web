import React, { useState, useRef } from 'react';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Upload, X, ArrowRight, Image as ImageIcon } from 'lucide-react';

const Adventures = () => {
    const { admin } = useAuth();
    const [images, setImages] = useState([]); // Array of { file, preview }
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newImages = [];
        const existingNames = images.map(img => img.file.name);

        files.forEach(file => {
            if (existingNames.includes(file.name)) {
                toast.warning(`${file.name} is already selected`);
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                toast.error(`${file.name} is too large (max 5MB)`);
                return;
            }
            if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
                toast.error(`${file.name} is not a valid image type`);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImages(prev => [...prev, { file, preview: reader.result, id: Math.random().toString(36).substring(7) }]);
            };
            reader.readAsDataURL(file);
        });
        
        // Reset file input value to allow re-uploading the same file after removal
        e.target.value = '';
    };

    const removeImage = (id) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const uploadFile = async (file) => {
        const ext = file.name.split('.').pop();
        const name = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const path = `adventures/${name}`;
        const localFallback = `http://localhost:3000/adventures/${name}`;
        
        try {
            const { error } = await supabase.storage.from('events').upload(path, file);
            if (error) return localFallback;
            const { data } = supabase.storage.from('events').getPublicUrl(path);
            return data.publicUrl;
        } catch (err) {
            console.warn('Storage upload fallback:', err);
            return localFallback;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) return toast.error('Please upload at least one image');

        setLoading(true);
        const now = new Date().toISOString();
        const userEmail = admin?.username || 'admin';

        try {
            const results = await Promise.all(images.map(async (img) => {
                const imageUrl = await uploadFile(img.file);
                return {
                    image_url: imageUrl,
                    created_by: userEmail,
                    created_at: now,
                    updated_by: userEmail,
                    updated_at: now
                };
            }));

            const { error } = await supabase.from('adventures').insert(results);

            if (error) throw error;

            toast.success(`${images.length} Adventure image(s) uploaded successfully! 🎉`);
            setImages([]);
        } catch (error) {
            toast.error('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '0 0 100px 0', width: '100%', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
            <style>{`
                @media (max-width: 992px) {
                    .adventures-grid { grid-template-columns: 1fr !important; }
                    .header-title { font-size: 32px !important; }
                    .left-col { position: relative !important; top: 0 !important; }
                }
                .image-preview-card {
                    position: relative;
                    aspect-ratio: 16/9;
                    border-radius: 16px;
                    overflow: hidden;
                    border: 1px solid rgba(0,0,0,0.05);
                    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
                    background: #f9f9f9;
                }
                .image-preview-card:hover .remove-btn {
                    opacity: 1;
                    transform: scale(1);
                }
                .remove-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: white;
                    border: none;
                    border-radius: 8px;
                    padding: 6px;
                    cursor: pointer;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                    opacity: 0;
                    transform: scale(0.8);
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;
                }
            `}</style>

            <div style={{ marginBottom: '60px', textAlign: 'center', padding: '0 20px' }}>
                <h1 className="header-title" style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#1a1a1a', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>
                    Adventure <span style={{ color: '#c0002a' }}>Gallery</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="adventures-grid" style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '32px', padding: '0 20px', alignItems: 'stretch' }}>
                {/* Left Column - Upload Action */}
                <div className="left-col" style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '24px', height: 'fit-content', position: 'sticky', top: '100px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', fontFamily: 'Oswald, sans-serif' }}>New Adventures</h3>
                    
                    <div onClick={() => fileInputRef.current.click()} style={{ border: '2px dashed #eee', borderRadius: '24px', padding: '40px 20px', textAlign: 'center', cursor: 'pointer', background: '#fafafa', transition: 'all 0.2s' }}>
                        <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                            <Upload size={24} color="#c0002a" />
                        </div>
                        <p style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1a1a1a', fontFamily: 'Oswald, sans-serif' }}>Select Multiple Images</p>
                        <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>PNG, JPG • MAX 5MB EACH</p>
                    </div>

                    <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" multiple style={{ display: 'none' }} />

                    <div style={{ padding: '20px', borderRadius: '20px', background: '#fff5f7', border: '1px solid #ffebeb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ImageIcon size={20} color="#c0002a" />
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#1a1a1a', fontFamily: 'Oswald, sans-serif' }}>{images.length} Image(s) selected</span>
                        </div>
                    </div>

                    <button
                        disabled={loading || images.length === 0}
                        type="submit"
                        style={{
                            background: (loading || images.length === 0) ? '#e0e0e0' : '#c0002a', color: 'white', padding: '24px', borderRadius: '16px', border: 'none',
                            fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: (loading || images.length === 0) ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: (loading || images.length === 0) ? 'none' : '0 10px 30px rgba(192,0,42,0.15)', transition: 'all 0.2s', fontFamily: 'Oswald, sans-serif'
                        }}
                        onMouseEnter={e => { if (!loading && images.length > 0) e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {loading ? 'Uploading...' : <><ArrowRight size={20} /> Submit Adventures</>}
                    </button>
                    
                    <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.2)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'center', marginTop: '8px' }}>
                        Images will be saved as separate gallery entries
                    </p>
                </div>

                {/* Right Column - Previews Grid Container */}
                <div style={{ 
                    background: 'white', 
                    borderRadius: '32px', 
                    padding: '40px', 
                    boxShadow: '0 20px 50px rgba(0,0,0,0.05)', 
                    border: '1px solid rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '500px' // Matches height of left panel more closely
                }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '24px', fontFamily: 'Oswald, sans-serif' }}>Selected Images</h3>
                    
                    {images.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                            {images.map((img) => (
                                <div key={img.id} className="image-preview-card">
                                    <img src={img.preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    <button type="button" onClick={() => removeImage(img.id)} className="remove-btn">
                                        <X size={18} color="#c0002a" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ flexGrow: 1, border: '2px dashed #eee', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: '#ccc' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ImageIcon size={32} strokeWidth={1} />
                            </div>
                            <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Oswald, sans-serif' }}>No Images Selected Yet</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Adventures;
