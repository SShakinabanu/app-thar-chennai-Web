import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { supabase } from '../../supabaseClient';
import { toast } from 'react-toastify';
import { Image as ImageIcon, MapPin, Calendar, Clock, Upload, X, ArrowRight } from 'lucide-react';

const CreateUpcomingEvent = () => {
    const [formData, setFormData] = useState({
        location: '',
        event_date: null,
        start_time: null,
        end_time: null,
    });
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const formatTime = (date) => {
        if (!date) return '';
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    };

    const formatDate = (date) => {
        if (!date) return '';
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 3 * 1024 * 1024) return toast.error('Image size must be less than 3MB');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) return toast.error('Please upload an image');
        if (!content) return toast.error('Please provide content');
        if (!formData.location) return toast.error('Please provide a location');
        if (!formData.event_date) return toast.error('Please select a date');
        if (!formData.start_time || !formData.end_time) return toast.error('Please set the timings');

        setLoading(true);
        try {
            const displayTiming = `${formatDate(formData.event_date)}, ${formatTime(formData.start_time)} – ${formatTime(formData.end_time)}`;
            const fileExt = image.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `upcoming-events/${fileName}`;

            let finalImageUrl = `http://localhost:3000/upcoming-events/${image.name}`;
            
            try {
                const { error: uploadError } = await supabase.storage.from('events').upload(filePath, image);
                if (!uploadError) {
                    const { data: { publicUrl } } = supabase.storage.from('events').getPublicUrl(filePath);
                    finalImageUrl = publicUrl;
                }
            } catch (e) {
                console.warn('Storage upload fallback');
            }

            const { error: insertError } = await supabase.from('upcoming_events').insert([{
                image_url: finalImageUrl,
                content: content,
                location: formData.location,
                event_timing: displayTiming
            }]);

            if (insertError) throw insertError;
            toast.success('Event Published Successfully!');
            setFormData({ location: '', event_date: null, start_time: null, end_time: null });
            setContent('');
            setImage(null);
            setImagePreview(null);
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

    return (
        <div style={{ padding: '0 0 100px 0', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
            <style>{`
                .react-datepicker-wrapper { width: 100%; }
                .custom-date-input {
                    width: 100%;
                    padding: 16px 20px;
                    border-radius: 16px;
                    border: 1px solid #eee;
                    background: #f9f9f9;
                    font-size: 14px;
                    font-weight: 700;
                    outline: none;
                    color: #1a1a1a !important;
                }
                .custom-date-input::placeholder { color: rgba(0,0,0,0.2); }
                .ql-editor { color: #1a1a1a !important; font-size: 15px !important; line-height: 1.6 !important; }
                .ql-editor.ql-blank::before { color: rgba(0,0,0,0.2) !important; font-style: normal !important; text-transform: uppercase; font-weight: 700; font-size: 12px; letter-spacing: 0.1em; }
                
                @media (max-width: 992px) {
                    .create-event-grid { grid-template-columns: 1fr !important; }
                    .header-title { font-size: 32px !important; }
                }
            `}</style>

            <div style={{ marginBottom: '60px', textAlign: 'center', padding: '0 20px' }}>
                <h1 className="header-title" style={{ fontSize: '48px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#1a1a1a', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>
                    Add <span style={{ color: '#c0002a' }}>Upcoming Event</span>
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="create-event-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', padding: '0 20px', alignItems: 'stretch' }}>
                {/* Left Section - Visual Asset */}
                <div style={{ background: 'white', borderRadius: '32px', padding: '40px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '24px', border: '1px solid rgba(0,0,0,0.03)', height: '100%' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>Upload Image</h3>
                    
                    <div style={{ flexGrow: 1, minHeight: '300px', background: '#f9f9f9', borderRadius: '24px', position: 'relative', overflow: 'hidden', border: '2px dashed #eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {imagePreview ? (
                            <>
                                <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
                                <button type="button" onClick={handleRemoveImage} style={{ position: 'absolute', top: '20px', right: '20px', background: 'white', border: 'none', borderRadius: '12px', padding: '10px', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                                    <X size={20} color="#c0002a" />
                                </button>
                            </>
                        ) : (
                            <div onClick={() => fileInputRef.current.click()} style={{ textAlign: 'center', cursor: 'pointer', padding: '40px' }}>
                                <div style={{ width: '64px', height: '64px', background: '#fff', borderRadius: '20px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                                    <Upload size={28} color="#c0002a" />
                                </div>
                                <p style={{ fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a1a', marginBottom: '4px', fontFamily: 'Oswald, sans-serif' }}>Upload Image</p>
                                <p style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(26,26,26,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>PNG, JPG • MAX 3MB</p>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                        <p style={{ fontSize: '10px', color: 'rgba(0,0,0,0.2)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em' }}>Visual Asset Preview Block</p>
                    </div>
                </div>

                {/* Right Section - Content + Logistics */}
                <div style={{ background: 'white', borderRadius: '32px', padding: '40px', border: '1px solid rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', height: '100%' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#1a1a1a', borderBottom: '2px solid #f3f4f6', paddingBottom: '16px', marginBottom: '8px', fontFamily: 'Oswald, sans-serif' }}>Event Details</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a1a', opacity: 0.6, fontFamily: 'Oswald, sans-serif' }}>Briefing Content (HTML)</label>
                        <div className="light-editor" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', overflow: 'hidden' }}>
                            <style>{`
                                .ql-toolbar.ql-snow { border: none !important; background: #f9f9f9 !important; border-bottom: 1px solid #eee !important; padding: 12px 20px !important; }
                                .ql-container.ql-snow { border: none !important; height: 180px !important; } /* Adjusted height to keep both columns balanced */
                            `}</style>
                            <ReactQuill theme="snow" value={content} onChange={setContent} modules={quillModules} placeholder="Describe the upcoming event details here..." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a1a', opacity: 0.6, fontFamily: 'Oswald, sans-serif' }}>Location</label>
                        <div style={{ position: 'relative' }}>
                            <MapPin size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#c0002a', zIndex: 1 }} />
                            <input type="text" placeholder="e.g. Yelagiri Hills" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="custom-date-input" style={{ paddingLeft: '54px' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a1a', opacity: 0.6, fontFamily: 'Oswald, sans-serif' }}>Target Date</label>
                            <div style={{ position: 'relative' }}>
                                <Calendar size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#c0002a', zIndex: 1 }} />
                                <DatePicker
                                    selected={formData.event_date}
                                    onChange={(date) => setFormData({...formData, event_date: date})}
                                    dateFormat="dd MMM yyyy"
                                    className="custom-date-input"
                                    customInput={<input style={{ paddingLeft: '54px' }} className="custom-date-input" />}
                                    placeholderText="Select Date"
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a1a1a', opacity: 0.6, fontFamily: 'Oswald, sans-serif' }}>Operational Timings</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <DatePicker
                                    selected={formData.start_time}
                                    onChange={(time) => setFormData({...formData, start_time: time})}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    customInput={<input style={{ padding: '16px 12px', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', fontSize: '11px', fontWeight: 700, width: '100%', outline: 'none', color: '#1a1a1a' }} />}
                                    placeholderText="From"
                                />
                                <DatePicker
                                    selected={formData.end_time}
                                    onChange={(time) => setFormData({...formData, end_time: time})}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    dateFormat="h:mm aa"
                                    customInput={<input style={{ padding: '16px 12px', borderRadius: '12px', border: '1px solid #eee', background: '#f9f9f9', fontSize: '11px', fontWeight: 700, width: '100%', outline: 'none', color: '#1a1a1a' }} />}
                                    placeholderText="To"
                                />
                            </div>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" style={{ marginTop: 'auto', background: '#c0002a', color: 'white', padding: '24px', borderRadius: '16px', border: 'none', fontSize: '14px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(192,0,42,0.15)', transition: 'all 0.2s', fontFamily: 'Oswald, sans-serif' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                        {loading ? 'Publishing...' : <><ArrowRight size={20} /> Broadcast Event</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUpcomingEvent;
