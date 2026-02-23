import React from 'react';
import { Mail, Instagram } from 'lucide-react';
import '../App.css';

const Home = () => {
  return (
    <div className="page-container">
      <section className="form-intro">
        <p>We are as excited as you are to make you a part of us! Please note that owning a 4x4 Mahindra Thar or Mahindra Thar ROXX 4x4 is required to join.</p>
        <p>Please submit your details and our moderators will review them and get back to you with the next steps. We appreciate your patience and look forward to welcoming you to the Thar Chennai community soon.</p>
      </section>

      <form className="membership-form">
        <div className="form-group">
          <label>Full Name *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Registered Owner (If different from above)</label>
          <input type="text" />
        </div>

        <div className="form-group">
          <label>Proof of Relationship With the Registered Owner of the vehicle</label>
          <div className="file-upload-container">
            <button type="button" className="upload-btn">+ Upload File</button>
          </div>
          <p className="field-hint">If you are not the Registered owner and requesting Membership, please upload a document to prove your relationship to the Registered owner. Ex: If ABC is requesting membership but the vehicle is registered in ABC's father's name, please upload a document showing ABC as a son/daughter of registered owner</p>
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" required />
        </div>

        <div className="form-group">
          <label>Phone *</label>
          <div className="phone-input-container">
            <div className="country-select">
              <span className="flag">🇮🇳</span>
              <span className="arrow">⌄</span>
            </div>
            <input type="tel" placeholder="Enter phone number" required />
          </div>
        </div>

        <div className="form-group">
          <label>Thar Registration Number *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Vehicle Type *</label>
          <div className="radio-group">
            <label><input type="radio" name="vehicleType" value="Thar" /> Thar</label>
            <label><input type="radio" name="vehicleType" value="Thar ROXX" /> Thar ROXX</label>
          </div>
        </div>

        <div className="form-group">
          <label>Variant *</label>
          <select required>
            <option value="">Select Variant</option>
            <option value="LX">LX</option>
            <option value="AX">AX</option>
          </select>
        </div>

        <div className="form-group">
          <label>Blood Group *</label>
          <input type="text" required />
        </div>

        <div className="form-group">
          <label>Proof of Vehicle Ownership *</label>
          <div className="file-upload-container">
            <button type="button" className="upload-btn">+ Upload File</button>
          </div>
          <p className="field-hint">Please upload Vehicle RC Card/Insurance for verification. Registered owner name must match!</p>
        </div>

        <div className="form-group checkbox-group">
          <input type="checkbox" required />
          <label>
            By checking this box, I acknowledge that the Thar Chennai community is for active owners. I commit to:
            <ul>
              <li>Posting a brief introduction (Name & Area).</li>
              <li>Sharing a clear photo of my vehicle within 24 hours of entry.</li>
            </ul>
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <footer className="form-footer">
        <div className="footer-logo">
          <h2>Thar Chennai</h2>
          <span>4x4 Club</span>
        </div>
        <div className="social-links">
          <Instagram size={24} />
          <Mail size={24} />
        </div>
      </footer>
    </div>
  );
};

export default Home;
