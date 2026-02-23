import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <div className="logo-text">
            <h1>Thar Chennai</h1>
            <span>4x4 Club</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="nav-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/the-club">The Club</Link></li>
          <li><Link to="/adventures">Adventures</Link></li>
          <li><Link to="/more">More</Link></li>
        </ul>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/the-club" onClick={toggleMenu}>The Club</Link></li>
          <li><Link to="/adventures" onClick={toggleMenu}>Adventures</Link></li>
          <li><Link to="/more" onClick={toggleMenu}>More</Link></li>
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;
