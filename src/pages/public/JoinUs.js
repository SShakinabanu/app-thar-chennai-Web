import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Trash2, CheckCircle2 } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import '../../App.css';
import '../Home.css';
import { toast } from 'react-toastify';
import { supabase } from '../../supabaseClient';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    registeredOwner: '',
    email: '',
    phone: '',
    registrationNumber: '',
    vehicleType: { Thar: false, 'Thar ROXX': false },
    variant: '',
    bloodGroup: '',
    agreed: false
  });

  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({
    relationshipProof: null,
    ownershipProof: null
  });

  const relationshipInputRef = useRef(null);
  const ownershipInputRef = useRef(null);

  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName' && !value) error = 'Enter a first name.';
    if (name === 'email') {
      if (!value) error = 'Enter an email address.';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Enter a valid email address.';
    }
    if (name === 'phone' && !value) error = 'Enter a phone number.';
    if (name === 'registrationNumber' && !value) error = 'Enter registration number.';
    if (name === 'variant' && !value) error = 'Please select a variant.';
    if (name === 'bloodGroup' && !value) error = 'Enter blood group.';
    if (name === 'agreed' && !value) error = 'You must agree to the terms.';
    if (name === 'vehicleType') {
      const anySelected = Object.values(value).some(Boolean);
      if (!anySelected) error = 'Please select at least one vehicle type.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
    validateField(name, val);
  };

  const handleVehicleTypeChange = (type) => {
    const updated = { ...formData.vehicleType, [type]: !formData.vehicleType[type] };
    setFormData(prev => ({ ...prev, vehicleType: updated }));
    validateField('vehicleType', updated);
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [fieldName]: file }));
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const deleteFile = (fieldName, inputRef) => {
    setFiles(prev => ({ ...prev, [fieldName]: null }));
    if (inputRef.current) inputRef.current.value = '';
  };

  const generateApplicationPDF = async (data, fileUrls) => {
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // 1. Draw "Logo"
      doc.setFillColor(192, 0, 42); // #c0002a
      doc.roundedRect(20, 15, 20, 20, 4, 4, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bolditalic');
      doc.setFontSize(22);
      doc.text('T', 26, 29);

      // 2. Header Text
      doc.setTextColor(26, 26, 26);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('THAR CHENNAI', 45, 25);
      doc.setFontSize(9);
      doc.setTextColor(150, 150, 150);
      doc.text('4x4 MOTOR CLUB - MEMBERSHIP APPLICATION', 45, 30);
      
      doc.setDrawColor(230, 230, 230);
      doc.line(20, 40, 190, 40);

      // 3. Application Summary Title
      doc.setFontSize(14);
      doc.setTextColor(192, 0, 42);
      doc.text('APPLICATION SUMMARY', 20, 52);

      // 4. Data Layout (Manual Alignment)
      const startY = 65;
      const lineHeight = 10;
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.setFont('helvetica', 'bold');

      const fields = [
        { label: 'Full Name:', value: data.fullName },
        { label: 'Registered Owner:', value: data.registeredOwner || 'Same as applicant' },
        { label: 'Email Address:', value: data.email },
        { label: 'Phone Number:', value: `+${data.phone}` },
        { label: 'Blood Group:', value: data.bloodGroup },
        { label: 'Vehicle Types:', value: Object.entries(data.vehicleType).filter(([_, v]) => v).map(([k]) => k).join(', ') },
        { label: 'Variant:', value: data.variant },
        { label: 'Registration No:', value: data.registrationNumber },
        { label: 'Submission Date:', value: new Date().toLocaleString() }
      ];

      fields.forEach((field, index) => {
        const y = startY + (index * lineHeight);
        doc.setFont('helvetica', 'bold');
        doc.text(field.label, 20, y);
        doc.setFont('helvetica', 'normal');
        doc.text(String(field.value), 65, y);
      });

      // 5. Document Links Section
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(192, 0, 42);
      doc.text('ATTACHED DOCUMENTS', 20, startY + (fields.length * lineHeight) + 10);
      
      doc.setFontSize(9);
      doc.setTextColor(0, 0, 255);
      let docY = startY + (fields.length * lineHeight) + 20;
      
      if (fileUrls.ownership) {
        doc.text('View Ownership Proof (RC/Insurance)', 20, docY);
        doc.textWithLink(fileUrls.ownership, 20, docY + 4, { url: fileUrls.ownership });
        docY += 12;
      }
      
      if (fileUrls.relationship) {
        doc.text('View Relationship Proof', 20, docY);
        doc.textWithLink(fileUrls.relationship, 20, docY + 4, { url: fileUrls.relationship });
      }

      // Footer
      doc.setTextColor(180, 180, 180);
      doc.setFontSize(8);
      doc.text('© Thar Chennai 4x4 Motor Club. All Rights Reserved.', 20, 280);

      return doc.output('blob');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw error;
    }
  };

  const uploadFileToSupabase = async (file, path) => {
    const localFallback = `http://localhost:3000/${path}`;
    try {
      const { data, error } = await supabase.storage
        .from('events')
        .upload(path, file, { upsert: true });

      if (error) {
        console.warn('Storage upload error, using fallback:', error);
        return localFallback;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('events')
        .getPublicUrl(data.path);
        
      return publicUrl;
    } catch (err) {
      console.warn('Storage upload fallback:', err);
      return localFallback;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const newErrors = {};
      const fieldsToValidate = ['fullName', 'email', 'phone', 'registrationNumber', 'variant', 'bloodGroup', 'agreed', 'vehicleType'];
      
      fieldsToValidate.forEach(key => {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      });

      if (!files.ownershipProof) {
        newErrors.ownershipProof = 'Vehicle ownership proof is required.';
        setErrors(prev => ({ ...prev, ownershipProof: 'Vehicle ownership proof is required.' }));
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(prev => ({ ...prev, ...newErrors }));
        setLoading(false);
        
        // Scroll to the first error
        setTimeout(() => {
          const firstErrorField = document.querySelector('.error-input, .error-message, .upload-btn-error');
          if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
        return;
      }

      // 1. Upload Proof Documents
      const timestamp = Date.now();
      const fileUrls = { ownership: '', relationship: '' };
      
      fileUrls.ownership = await uploadFileToSupabase(
        files.ownershipProof, 
        `membership-applications/owner_${timestamp}_${files.ownershipProof.name}`
      );

      if (files.relationshipProof) {
        fileUrls.relationship = await uploadFileToSupabase(
          files.relationshipProof, 
          `membership-applications/rel_${timestamp}_${files.relationshipProof.name}`
        );
      }

      // 2. Generate and Upload Application PDF
      const pdfBlob = await generateApplicationPDF(formData, fileUrls);
      const pdfUrl = await uploadFileToSupabase(
        pdfBlob, 
        `membership-applications/app_${timestamp}_${formData.fullName.replace(/\s+/g, '_')}.pdf`
      );

      // 3. Insert into Database
      const vehicleTypesStr = Object.entries(formData.vehicleType)
        .filter(([_, v]) => v)
        .map(([k]) => k)
        .join(', ');

      const { error: insertError } = await supabase
        .from('join_requests')
        .insert([{
          full_name: formData.fullName,
          registered_owner: formData.registeredOwner,
          email: formData.email,
          phone: formData.phone,
          thar_registration_number: formData.registrationNumber,
          vehicle_type: vehicleTypesStr,
          variant: formData.variant,
          blood_group: formData.bloodGroup,
          ownership_proof: fileUrls.ownership,
          relationship_proof: fileUrls.relationship,
          is_agreed: formData.agreed,
          pdf_url: pdfUrl // NOTE: Please add this column to your table if not present!
        }]);

      if (insertError) throw insertError;

      // 4. Send Email Notification via Backend API (Nodemailer)
      try {
        const response = await fetch('http://localhost:5000/api/send-membership-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            thar_registration_number: formData.registrationNumber,
            vehicleType: vehicleTypesStr,
            ownership_proof: fileUrls.ownership,
            relationship_proof: fileUrls.relationship,
            pdf_url: pdfUrl
          })
        });

        if (!response.ok) {
          throw new Error('Backend failed to send email');
        }

        console.log('Email sent successfully via Backend!');
      } catch (emailError) {
        console.error('Email Notification Error:', emailError);
        toast.warning('Data saved, but notification email failed to send.');
      }

      toast.success('Registration Complete! 🏜️ Check your email.');
      setFormData({
        fullName: '', registeredOwner: '', email: '', phone: '',
        registrationNumber: '', vehicleType: { Thar: false, 'Thar ROXX': false },
        variant: '', bloodGroup: '', agreed: false
      });
      setFiles({ relationshipProof: null, ownershipProof: null });
      
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#fff9f2] min-h-screen pt-24 pb-20">
      <div className="page-container">
        <section className="form-intro">
          <p>
            We are as excited as you are to make you a part of us! Please note that owning a 4x4 Mahindra Thar or
            Mahindra Thar ROXX 4x4 is required to join.
          </p>
          <p>
            Please submit your details and our moderators will review them and get back to you with the next steps. We
            appreciate your patience and look forward to welcoming you to the Thar Chennai community soon.
          </p>
        </section>

        <form className="membership-form" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={errors.fullName ? 'error-input' : ''}
            />
            {errors.fullName && (
              <div className="error-message"><AlertCircle size={14} /> {errors.fullName}</div>
            )}
          </div>

          {/* Registered Owner */}
          <div className="form-group">
            <label>Registered Owner (If different from above)</label>
            <input
              type="text"
              name="registeredOwner"
              value={formData.registeredOwner}
              onChange={handleInputChange}
            />
          </div>

          {/* Relationship Proof */}
          <div className="form-group">
            <label>Proof of Relationship With the Registered Owner of the vehicle</label>
            <div className="file-upload-container">
              {!files.relationshipProof ? (
                <>
                  <button type="button" className="upload-btn" onClick={() => relationshipInputRef.current.click()}>
                    + Upload File
                  </button>
                  <input
                    type="file"
                    ref={relationshipInputRef}
                    hidden
                    onChange={(e) => handleFileUpload(e, 'relationshipProof')}
                  />
                </>
              ) : (
                <div className="uploaded-file-info">
                  <CheckCircle2 size={16} className="upload-check-icon" />
                  <span className="file-name">{files.relationshipProof.name}</span>
                  <button
                    type="button"
                    className="delete-file-btn"
                    onClick={() => deleteFile('relationshipProof', relationshipInputRef)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            <p className="field-hint">
              If you are not the Registered owner and requesting Membership, please upload a document to prove your
              relationship to the Registered owner. Ex: If ABC is requesting membership but the vehicle is registered in
              ABC's father's name, please upload a document showing ABC as a son/daughter of registered owner
            </p>
          </div>

          {/* Email */}
          <div className="form-group">
            <label>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? 'error-input' : ''}
            />
            {errors.email && (
              <div className="error-message"><AlertCircle size={14} /> {errors.email}</div>
            )}
          </div>

          {/* Phone with react-phone-input-2 */}
          <div className="form-group">
            <label>Phone *</label>
            <PhoneInput
              country={'in'}
              value={formData.phone}
              onChange={(value) => {
                setFormData(prev => ({ ...prev, phone: value }));
                if (value) setErrors(prev => ({ ...prev, phone: '' }));
              }}
              inputClass={errors.phone ? 'error-input' : ''}
              containerClass="phone-input-wrapper"
              inputStyle={{
                width: '100%',
                height: '42px',
                fontSize: '14px',
                borderColor: errors.phone ? '#e53e3e' : '#ccc',
                borderRadius: '4px',
              }}
              buttonStyle={{
                borderColor: errors.phone ? '#e53e3e' : '#ccc',
                borderRadius: '4px 0 0 4px',
                background: '#fff',
              }}
              enableSearch
              searchPlaceholder="Search country"
            />
            {errors.phone && (
              <div className="error-message"><AlertCircle size={14} /> {errors.phone}</div>
            )}
          </div>

          {/* Registration Number */}
          <div className="form-group">
            <label>Thar Registration Number *</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              className={errors.registrationNumber ? 'error-input' : ''}
            />
            {errors.registrationNumber && (
              <div className="error-message"><AlertCircle size={14} /> {errors.registrationNumber}</div>
            )}
          </div>

          {/* Vehicle Type - CHECKBOXES like image 2 */}
          <div className="form-group">
            <label>Vehicle Type *</label>
            <div className="checkbox-inline-group">
              {['Thar', 'Thar ROXX'].map((type) => (
                <label key={type} className="checkbox-inline-label">
                  <input
                    type="checkbox"
                    checked={formData.vehicleType[type]}
                    onChange={() => handleVehicleTypeChange(type)}
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
            {errors.vehicleType && (
              <div className="error-message"><AlertCircle size={14} /> {errors.vehicleType}</div>
            )}
          </div>

          {/* Variant */}
          <div className="form-group">
            <label>Variant *</label>
            <select
              name="variant"
              value={formData.variant}
              onChange={handleInputChange}
              className={errors.variant ? 'error-input' : ''}
              style={{ cursor: 'pointer' }}
            >
              <option value="">Select a variant</option>
              <option value="Petrol Manual 4x4">Petrol Manual 4x4</option>
              <option value="Petrol Automatic 4x4">Petrol Automatic 4x4</option>
              <option value="Diesel Manual 4x4">Diesel Manual 4x4</option>
              <option value="Diesel Automatic 4x4">Diesel Automatic 4x4</option>
            </select>
            {errors.variant && (
              <div className="error-message"><AlertCircle size={14} /> {errors.variant}</div>
            )}
          </div>

          {/* Blood Group */}
          <div className="form-group">
            <label>Blood Group *</label>
            <input
              type="text"
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleInputChange}
              className={errors.bloodGroup ? 'error-input' : ''}
            />
            {errors.bloodGroup && (
              <div className="error-message"><AlertCircle size={14} /> {errors.bloodGroup}</div>
            )}
          </div>

          {/* Ownership Proof */}
          <div className="form-group">
            <label>Proof of Vehicle Ownership *</label>
            <div className="file-upload-container">
              {!files.ownershipProof ? (
                <>
                  <button
                    type="button"
                    className={`upload-btn ${errors.ownershipProof ? 'upload-btn-error' : ''}`}
                    onClick={() => ownershipInputRef.current.click()}
                  >
                    + Upload File
                  </button>
                  <input
                    type="file"
                    ref={ownershipInputRef}
                    hidden
                    onChange={(e) => handleFileUpload(e, 'ownershipProof')}
                  />
                </>
              ) : (
                <div className="uploaded-file-info">
                  <CheckCircle2 size={16} className="upload-check-icon" />
                  <span className="file-name">{files.ownershipProof.name}</span>
                  <button
                    type="button"
                    className="delete-file-btn"
                    onClick={() => deleteFile('ownershipProof', ownershipInputRef)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            {errors.ownershipProof && (
              <div className="error-message"><AlertCircle size={14} /> {errors.ownershipProof}</div>
            )}
            <p className="field-hint">
              Please upload Vehicle RC Card/Insurance for verification. Registered owner name must match!
            </p>
          </div>

          {/* Terms checkbox - full text with bullets like image 2 */}
          <div className="form-group terms-group">
            <div className="terms-checkbox-row">
              <input
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={formData.agreed}
                onChange={handleInputChange}
              />
              <label htmlFor="agreed" className="terms-label">
                <strong>
                  By checking this box, I acknowledge that the Thar Chennai community is for active owners. I commit to:
                </strong>
                <ul className="terms-list">
                  <li>Posting a brief introduction (Name &amp; Area).</li>
                  <li>Sharing a clear photo of my vehicle within 24 hours of entry.</li>
                </ul>
                <span className="terms-asterisk">*</span>
              </label>
            </div>
            {errors.agreed && (
              <div className="error-message"><AlertCircle size={14} /> {errors.agreed}</div>
            )}
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Submitting Application...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;