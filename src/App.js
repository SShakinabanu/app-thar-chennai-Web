import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { About, Adventures, TheClub, More } from './pages/OtherPages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/adventures" element={<Adventures />} />
            <Route path="/the-club" element={<TheClub />} />
            <Route path="/more" element={<More />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
