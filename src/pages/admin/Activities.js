import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Upload, X, ArrowRight, FileText } from 'lucide-react';

const Activities = () => {
    const { admin } = useAuth();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return toast.error('Image size must be less than 5MB');
        if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) return toast.error('Only PNG and JPEG images are allowed');

        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const uploadFile = async (file) => {
        const ext = file.name.split('.').pop();
        const name = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const path = `activities/${name}`;
        const localFallback = `http://localhost:3000/activities/${name}`;
        
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
        if (!title.trim()) return toast.error('Please provide a title');
        if (!content.trim()) return toast.error('Please provide content');
        
        // Character limit check (stripping HTML tags for accurate count)
        const plainText = content.replace(/<[^>]*>/g, '');
        if (plainText.length > 500) {
            return toast.error('Content is too long. Max 500 characters allowed.');
        }

        if (!image) return toast.error('Please upload an image');

        setLoading(true);
        const now = new Date().toISOString();
        const userEmail = admin?.username || 'admin';

        try {
            const finalImageUrl = await uploadFile(image);

            const { error } = await supabase.from('activities').insert([{
                title: title.trim(),
                content: content,
                image_url: finalImageUrl,
                created_by: userEmail,
                created_at: now,
                updated_by: userEmail,
                updated_at: now
            }]);

            if (error) throw error;

            toast.success('Activity Published Successfully! 🎉');
            setTitle('');
            setContent('');
            setImage(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            toast.error('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const quillModules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    const charCount = content.replace(/<[^>]*>/g, '').length;

    return (
        <div style={{ padding: '0 0 100px 0', width: '100%', maxWidth: '1440px', margin: '0 auto', boxSizing: 'border-box' }}>
            <style>{`
                .ql-editor { color: #1a1a1a !important; font-size: 15px !important; line-height: 1.6 !important; min-height: 200px; }
                .ql-container.ql-snow { border: none !important; }
                .ql-toolbar.ql-snow { border: none !important; background: #f9f9f9 !important; border-bottom: 1px solid #eee !important; padding: 12px 20px !important; }
                
                @media (max-width: 992px) {
                    .activities-grid { grid-template-columns: 1fr !important; }
                    .header-title { font-size: 32px !important; }
                }
            `}</style>

            <div style={{ marginBottom: '60px', textAlign: 'center', padding: '0 20px' }}>
                <h1 className="header-title" style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#1a1a1a', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>
                    Create <span style={{ color: '#c0002a' }}>Activity</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="activities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', padding: '0 20px', alignItems: 'stretch' }}>
                {/* Image Upload Column */}
                <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', fontFamily: 'Oswald, sans-serif' }}>Activity Image</h3>
                    
                    <div style={{ flexGrow: 1, minHeight: '350px', background: '#f9f9f9', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '2px dashed #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
                                <button type="button" onClick={handleRemoveImage} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                                    <X size={18} color="#c0002a" />
                                </button>
                            </>
                        ) : (
                            <div onClick={() => fileInputRef.current.click()} style={{ textAlign: 'center', cursor: 'pointer', padding: '20px' }}>
                                <div style={{ width: '56px', height: '56px', background: '#fff', borderRadius: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <Upload size={24} color="#c0002a" />
                                </div>
                                <p style={{ fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#1a1a1a', fontFamily: 'Oswald, sans-serif' }}>Select Image</p>
                                <p style={{ fontSize: '11px', color: 'rgba(0,0,0,0.3)', fontWeight: 700 }}>PNG, JPG • MAX 5MB</p>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                    </div>
                </div>

                {/* Content Column */}
                <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', fontFamily: 'Oswald, sans-serif' }}>Activity Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Weekend Offroading Expedition"
                            style={{ width: '100%', padding: '16px 20px', borderRadius: '16px', border: '1.5px solid #eee', fontSize: '18px', fontWeight: 800, background: '#fafafa', outline: 'none', color: '#1a1a1a', fontFamily: 'Oswald, sans-serif', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', fontFamily: 'Oswald, sans-serif' }}>Content / Description</label>
                            <span style={{ fontSize: '10px', fontWeight: 800, color: charCount > 500 ? '#c0002a' : '#999', fontFamily: 'Oswald, sans-serif' }}>
                                {charCount} / 500
                            </span>
                        </div>
                        <div style={{ background: '#fafafa', borderRadius: '16px', border: '1.5px solid #eee', overflow: 'hidden', position: 'relative' }}>
                            <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} placeholder="Describe the activity here..." />
                        </div>
                        {charCount > 500 && <p style={{ margin: 0, fontSize: '11px', color: '#c0002a', fontWeight: 700 }}>⚠️ Content exceeds the 500 character limit</p>}
                    </div>

                    <button
                        disabled={loading || charCount > 500 || !image || !title.trim() || !content.trim()}
                        type="submit"
                        style={{
                            marginTop: 'auto', background: (loading || charCount > 500 || !image || !title.trim() || !content.trim()) ? '#e0e0e0' : '#c0002a', color: 'white', padding: '24px', borderRadius: '16px', border: 'none',
                            fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: (loading || charCount > 500 || !image || !title.trim() || !content.trim()) ? 'not-allowed' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                            boxShadow: (loading || charCount > 500 || !image || !title.trim() || !content.trim()) ? 'none' : '0 10px 30px rgba(192,0,42,0.15)', transition: 'all 0.2s', fontFamily: 'Oswald, sans-serif'
                        }}
                        onMouseEnter={e => { if (!loading && charCount <= 500 && image && title.trim() && content.trim()) e.currentTarget.style.transform = 'translateY(-2px)' }}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {loading ? 'Publishing...' : <><ArrowRight size={20} /> Submit Activity</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Activities;
