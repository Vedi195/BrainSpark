// src/components/Header.js
import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="brain-emoji">🧠</span>
          <h1>BrainSpark</h1>
          <span className="spark-emoji">💡</span>
        </div>
        <p className="tagline">Unlimited Questions - Learn, Play & Grow Forever!</p>
      </div>
      <div className="header-decoration">
        <div className="floating-icon">🧩</div>
        <div className="floating-icon">⭐</div>
        <div className="floating-icon">🎯</div>
        <div className="floating-icon">🎨</div>
      </div>
    </header>
  );
}

export default Header;