import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import { Plus, X, ArrowRight, Image, Link2, Video, FileText, ChevronDown, ChevronUp, GripVertical, AlertCircle, CheckCircle } from 'lucide-react';

// Content block types: 'text' | 'image' | 'video' | 'link'

const INPUT_STYLE = {
    width: '100%',
    padding: '14px 20px',
    borderRadius: '14px',
    border: '1.5px solid #eee',
    fontSize: '14px',
    background: '#f9f9f9',
    outline: 'none',
    boxSizing: 'border-box',
    fontWeight: 600,
    color: '#1a1a1a',
};

const quillModules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'blockquote', 'clean']
    ],
};

const isValidUrl = (str) => {
    if (!str) return false;
    try { new URL(str); return true; } catch { return false; }
};

const BlockTypeBtn = ({ icon: Icon, label, onClick }) => (
    <button type="button" onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 18px', borderRadius: '12px', border: '1.5px dashed #e0e0e0',
        background: 'white', cursor: 'pointer', fontSize: '12px', fontWeight: 800,
        textTransform: 'uppercase', letterSpacing: '0.08em', color: '#555',
        fontFamily: 'Oswald, sans-serif', transition: 'all 0.2s',
    }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0002a'; e.currentTarget.style.color = '#c0002a'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#555'; }}
    >
        <Icon size={16} /> {label}
    </button>
);

const ContentBlock = ({ block, index, total, onUpdate, onRemove, onMove }) => {
    const imageRef = useRef(null);
    const videoRef = useRef(null);

    const handleImageFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
        const reader = new FileReader();
        reader.onloadend = () => onUpdate(index, { ...block, file, preview: reader.result });
        reader.readAsDataURL(file);
    };

    const handleVideoFile = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 50 * 1024 * 1024) { toast.error('Video must be under 50MB'); return; }
        const url = URL.createObjectURL(file);
        onUpdate(index, { ...block, file, preview: url });
    };

    const urlValid = isValidUrl(block.url);

    const blockTitles = {
        text: '📝 Text Block',
        image: '🖼️ Image Block',
        video: '🎬 Video Upload',
        link: '🔗 Link Block',
    };

    return (
        <div style={{
            background: '#fff', borderRadius: '20px', border: '1px solid #f0f0f0',
            overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        }}>
            {/* Block header */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 20px', background: '#fafafa', borderBottom: '1px solid #f0f0f0',
            }}>
                <GripVertical size={16} color="#bbb" />
                <span style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#999', fontFamily: 'Oswald, sans-serif', flex: 1 }}>
                    {blockTitles[block.type] || block.type}
                </span>
                <div style={{ display: 'flex', gap: '4px' }}>
                    {index > 0 && <button type="button" onClick={() => onMove(index, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px' }}><ChevronUp size={16} color="#999" /></button>}
                    {index < total - 1 && <button type="button" onClick={() => onMove(index, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px' }}><ChevronDown size={16} color="#999" /></button>}
                    <button type="button" onClick={() => onRemove(index)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', borderRadius: '8px' }}>
                        <X size={16} color="#c0002a" />
                    </button>
                </div>
            </div>

            {/* Block content */}
            <div style={{ padding: '20px' }}>

                {/* TEXT */}
                {block.type === 'text' && (
                    <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
                        <style>{`
                            .bq-${index} .ql-toolbar.ql-snow { border: none !important; background: #f9f9f9 !important; border-bottom: 1px solid #eee !important; padding: 8px 16px !important; }
                            .bq-${index} .ql-container.ql-snow { border: none !important; min-height: 120px; }
                            .bq-${index} .ql-editor { color: #1a1a1a !important; font-size: 14px; min-height: 120px; }
                        `}</style>
                        <div className={`bq-${index}`}>
                            <ReactQuill theme="snow" value={block.content} onChange={(val) => onUpdate(index, { ...block, content: val })} modules={quillModules} placeholder="Write your content here..." />
                        </div>
                    </div>
                )}

                {/* IMAGE */}
                {block.type === 'image' && (
                    <div>
                        {block.preview ? (
                            <div>
                                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#f5f5f5' }}>
                                    <img src={block.preview} alt="Block" style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', display: 'block' }} />
                                    <button type="button" onClick={() => onUpdate(index, { ...block, file: null, preview: null })}
                                        style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.12)' }}>
                                        <X size={16} color="#c0002a" />
                                    </button>
                                </div>
                                <input type="text" placeholder="Image caption (optional)" value={block.caption || ''} onChange={e => onUpdate(index, { ...block, caption: e.target.value })}
                                    style={{ ...INPUT_STYLE, marginTop: '12px', fontStyle: 'italic' }} />
                            </div>
                        ) : (
                            <div onClick={() => imageRef.current?.click()} style={{ border: '2px dashed #e0e0e0', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#c0002a'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                            >
                                <Image size={36} color="#ddd" style={{ marginBottom: '12px' }} />
                                <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#aaa', fontFamily: 'Oswald, sans-serif', margin: 0 }}>Click to upload image</p>
                                <p style={{ fontSize: '11px', color: '#ccc', marginTop: '4px' }}>PNG, JPG • Max 5MB</p>
                            </div>
                        )}
                        <input ref={imageRef} type="file" accept="image/png,image/jpeg" style={{ display: 'none' }} onChange={handleImageFile} />
                    </div>
                )}

                {/* VIDEO – upload only */}
                {block.type === 'video' && (
                    <div>
                        {block.preview ? (
                            <div>
                                <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', background: '#000', aspectRatio: '16/9' }}>
                                    <video src={block.preview} controls style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    <button type="button" onClick={() => onUpdate(index, { ...block, file: null, preview: null })}
                                        style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                                        <X size={16} color="#c0002a" />
                                    </button>
                                </div>
                                <p style={{ fontSize: '12px', color: '#aaa', marginTop: '8px', fontWeight: 600 }}>{block.file?.name}</p>
                            </div>
                        ) : (
                            <div onClick={() => videoRef.current?.click()} style={{ border: '2px dashed #e0e0e0', borderRadius: '16px', padding: '48px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = '#c0002a'}
                                onMouseLeave={e => e.currentTarget.style.borderColor = '#e0e0e0'}
                            >
                                <Video size={36} color="#ddd" style={{ marginBottom: '12px' }} />
                                <p style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#aaa', fontFamily: 'Oswald, sans-serif', margin: 0 }}>Click to upload video</p>
                                <p style={{ fontSize: '11px', color: '#ccc', marginTop: '4px' }}>MP4, MOV, WebM • Max 50MB</p>
                            </div>
                        )}
                        <input ref={videoRef} type="file" accept="video/mp4,video/quicktime,video/webm" style={{ display: 'none' }} onChange={handleVideoFile} />
                    </div>
                )}

                {/* LINK – URL with validation */}
                {block.type === 'link' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ position: 'relative' }}>
                            <input
                                type="text"
                                placeholder="Paste URL here (https://...)"
                                value={block.url || ''}
                                onChange={e => onUpdate(index, { ...block, url: e.target.value })}
                                style={{
                                    ...INPUT_STYLE,
                                    paddingRight: '48px',
                                    borderColor: block.url ? (urlValid ? '#22c55e' : '#ef4444') : '#eee',
                                }}
                            />
                            {block.url && (
                                <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)' }}>
                                    {urlValid
                                        ? <CheckCircle size={18} color="#22c55e" />
                                        : <AlertCircle size={18} color="#ef4444" />
                                    }
                                </span>
                            )}
                        </div>
                        {block.url && !urlValid && (
                            <p style={{ margin: 0, fontSize: '12px', color: '#ef4444', fontWeight: 600 }}>⚠ Please enter a valid URL including https://</p>
                        )}
                        <input
                            type="text"
                            placeholder="Display label (e.g. Visit our website)"
                            value={block.label || ''}
                            onChange={e => onUpdate(index, { ...block, label: e.target.value })}
                            style={INPUT_STYLE}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

const SubSection = ({ section, sectionIndex, onUpdate, onRemove }) => {
    const addBlock = (type) => {
        const newBlock = { type, content: '', url: '', file: null, preview: null, caption: '', label: '' };
        onUpdate(sectionIndex, { ...section, blocks: [...section.blocks, newBlock] });
    };

    const updateBlock = (blockIndex, updated) => {
        const blocks = [...section.blocks];
        blocks[blockIndex] = updated;
        onUpdate(sectionIndex, { ...section, blocks });
    };

    const removeBlock = (blockIndex) => {
        onUpdate(sectionIndex, { ...section, blocks: section.blocks.filter((_, i) => i !== blockIndex) });
    };

    const moveBlock = (blockIndex, dir) => {
        const blocks = [...section.blocks];
        const target = blockIndex + dir;
        if (target < 0 || target >= blocks.length) return;
        [blocks[blockIndex], blocks[target]] = [blocks[target], blocks[blockIndex]];
        onUpdate(sectionIndex, { ...section, blocks });
    };

    return (
        <div style={{ background: '#f8f8f8', borderRadius: '24px', padding: '28px', border: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#aaa', fontFamily: 'Oswald, sans-serif', display: 'block', marginBottom: '6px' }}>
                        Sub-section Title
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Day 1 – Departure..."
                        value={section.title}
                        onChange={e => onUpdate(sectionIndex, { ...section, title: e.target.value })}
                        style={{
                            width: '100%', padding: '12px 18px', borderRadius: '14px', border: '1.5px solid #eee',
                            fontSize: '16px', fontWeight: 800, background: 'white', outline: 'none',
                            boxSizing: 'border-box', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.02em',
                            color: '#1a1a1a', // ← FIX: text was invisible
                        }}
                    />
                </div>
                <button type="button" onClick={() => onRemove(sectionIndex)} style={{ background: '#fff0f3', border: 'none', borderRadius: '12px', padding: '12px', cursor: 'pointer', flexShrink: 0, marginBottom: '2px' }}>
                    <X size={18} color="#c0002a" />
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {section.blocks.map((block, bIdx) => (
                    <ContentBlock key={bIdx} block={block} index={bIdx} total={section.blocks.length} onUpdate={updateBlock} onRemove={removeBlock} onMove={moveBlock} />
                ))}
            </div>

            <div style={{ marginTop: '16px', display: 'flex', flexWrap: 'wrap', gap: '10px', paddingTop: section.blocks.length > 0 ? '16px' : '0', borderTop: section.blocks.length > 0 ? '1px solid #eee' : 'none' }}>
                <BlockTypeBtn icon={FileText} label="Text" onClick={() => addBlock('text')} />
                <BlockTypeBtn icon={Image} label="Image" onClick={() => addBlock('image')} />
                <BlockTypeBtn icon={Video} label="Video" onClick={() => addBlock('video')} />
                <BlockTypeBtn icon={Link2} label="Link" onClick={() => addBlock('link')} />
            </div>
        </div>
    );
};

const CreatePost = () => {
    const { admin } = useAuth();
    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);

    const addSection = () => setSections([...sections, { title: '', blocks: [] }]);
    const updateSection = (idx, updated) => { const s = [...sections]; s[idx] = updated; setSections(s); };
    const removeSection = (idx) => setSections(sections.filter((_, i) => i !== idx));

    const uploadFile = async (file, folder) => {
        const ext = file.name.split('.').pop();
        const name = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
        const path = `${folder}/${name}`;
        const localFallback = `http://localhost:3000/posts/${name}`;
        try {
            const { error } = await supabase.storage.from('posts').upload(path, file);
            if (error) return localFallback;
            const { data } = supabase.storage.from('posts').getPublicUrl(path);
            return data.publicUrl;
        } catch {
            return localFallback;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return toast.error('Post title is required');
        if (sections.length === 0 && !intro.trim()) return toast.error('Add some content or sub-sections');

        // Validate all link blocks
        for (const sec of sections) {
            for (const block of sec.blocks) {
                if (block.type === 'link' && block.url && !isValidUrl(block.url)) {
                    return toast.error(`Invalid URL in section "${sec.title || 'unnamed'}". Please fix it before publishing.`);
                }
            }
        }

        setLoading(true);
        const now = new Date().toISOString(); // UTC ISO format
        const createdBy = admin?.username || 'admin';

        try {
            const resolvedSections = await Promise.all(sections.map(async (sec) => {
                const resolvedBlocks = await Promise.all(sec.blocks.map(async (block) => {
                    if (block.type === 'image' && block.file) {
                        const url = await uploadFile(block.file, 'images');
                        return { type: 'image', url, caption: block.caption };
                    }
                    if (block.type === 'video' && block.file) {
                        const url = await uploadFile(block.file, 'videos');
                        return { type: 'video', url };
                    }
                    if (block.type === 'text') return { type: 'text', content: block.content };
                    if (block.type === 'link') return { type: 'link', url: block.url, label: block.label };
                    return block;
                }));
                return { title: sec.title, blocks: resolvedBlocks };
            }));

            const { error } = await supabase.from('posts').insert([{
                title: title.trim(),
                intro,
                sections: resolvedSections,
                created_by: createdBy,
                created_at: now,
                updated_by: createdBy,
                updated_at: now,
            }]);

            if (error) throw error;

            toast.success('Post published successfully! 🎉');
            setTitle(''); setIntro(''); setSections([]);
        } catch (err) {
            console.error(err);
            toast.error('Error publishing: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '0 0 100px 0', width: '100%', maxWidth: '900px', margin: '0 auto', boxSizing: 'border-box' }}>
            <style>{`
                .create-post-wrap { padding: 0 20px; }
                @media (max-width: 600px) {
                    .create-post-wrap { padding: 0 12px; }
                    .post-main-card { padding: 24px 20px !important; }
                    .header-title { font-size: 36px !important; }
                }
                .ql-toolbar.ql-snow { border: none !important; background: #f9f9f9 !important; border-bottom: 1px solid #eee !important; padding: 10px 16px !important; }
                .ql-container.ql-snow { border: none !important; min-height: 140px; }
                .ql-editor { color: #1a1a1a !important; font-size: 15px; min-height: 140px; }
            `}</style>

            <div className="create-post-wrap">
                {/* Header */}
                <div style={{ marginBottom: '48px', textAlign: 'center' }}>
                    <h1 className="header-title" style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#1a1a1a', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>
                        Create <span style={{ color: '#c0002a' }}>Post</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {/* Title + Intro card */}
                    <div className="post-main-card" style={{ background: 'white', borderRadius: '28px', padding: '36px 40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)' }}>
                        <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', marginBottom: '10px', fontFamily: 'Oswald, sans-serif' }}>Post Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Give your post a compelling title..."
                            style={{ width: '100%', padding: '18px 22px', borderRadius: '16px', border: '1.5px solid #eee', fontSize: '22px', fontWeight: 900, background: '#fafafa', outline: 'none', boxSizing: 'border-box', fontFamily: 'Oswald, sans-serif', letterSpacing: '-0.01em', color: '#1a1a1a' }}
                        />
                        <div style={{ marginTop: '24px' }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#999', marginBottom: '10px', fontFamily: 'Oswald, sans-serif' }}>Introduction / Summary</label>
                            <div style={{ background: '#fafafa', borderRadius: '16px', border: '1.5px solid #eee', overflow: 'hidden' }}>
                                <ReactQuill theme="snow" value={intro} onChange={setIntro} modules={quillModules} placeholder="Write a brief introduction or overview..." />
                            </div>
                        </div>
                    </div>

                    {/* Sub-sections */}
                    {sections.map((section, idx) => (
                        <SubSection key={idx} section={section} sectionIndex={idx} onUpdate={updateSection} onRemove={removeSection} />
                    ))}

                    {/* Add sub-section */}
                    <button type="button" onClick={addSection} style={{
                        width: '100%', padding: '20px', borderRadius: '20px', border: '2px dashed #ddd',
                        background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                        fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#888',
                        fontFamily: 'Oswald, sans-serif', transition: 'all 0.2s',
                    }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#c0002a'; e.currentTarget.style.color = '#c0002a'; e.currentTarget.style.background = '#fff5f7'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#888'; e.currentTarget.style.background = 'white'; }}
                    >
                        <Plus size={20} /> Add Sub-Section
                    </button>

                    {/* Publish */}
                    <button 
                        type="submit" 
                        disabled={loading || !title.trim() || sections.length === 0 || sections.some(sec => sec.blocks.length === 0)} 
                        style={{
                            background: (loading || !title.trim() || sections.length === 0 || sections.some(sec => sec.blocks.length === 0)) ? '#e0e0e0' : '#c0002a', 
                            color: 'white', 
                            padding: '22px 32px',
                            borderRadius: '18px', 
                            border: 'none', 
                            fontSize: '15px', 
                            fontWeight: 900,
                            textTransform: 'uppercase', 
                            letterSpacing: '0.15em', 
                            cursor: (loading || !title.trim() || sections.length === 0 || sections.some(sec => sec.blocks.length === 0)) ? 'not-allowed' : 'pointer',
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            gap: '12px',
                            boxShadow: (loading || !title.trim() || sections.length === 0 || sections.some(sec => sec.blocks.length === 0)) ? 'none' : '0 12px 36px rgba(192,0,42,0.2)',
                            transition: 'all 0.25s', 
                            fontFamily: 'Oswald, sans-serif',
                        }}
                        onMouseEnter={e => { if (!loading && title.trim() && sections.length > 0 && !sections.some(sec => sec.blocks.length === 0)) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        <ArrowRight size={22} /> {loading ? 'Publishing...' : 'Publish Post'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
