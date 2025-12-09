// src/components/CategoryFilter.js
import React from 'react';
import './CategoryFilter.css';

const categoryIcons = {
  all: '🎯',
  aptitude: '🧮',
  bollywood: '🎬',
  entertainment: '🎭',
  science: '🔬',
  general: '📚',
  fun: '🎪'
};

const categoryLabels = {
  all: 'All Categories',
  aptitude: 'Aptitude',
  bollywood: 'Bollywood',
  entertainment: 'Entertainment',
  science: 'Science',
  general: 'General Knowledge',
  fun: 'Fun & Riddles'
};

const categoryColors = {
  all: '#667eea',
  aptitude: '#3b82f6',
  bollywood: '#ec4899',
  entertainment: '#f59e0b',
  science: '#10b981',
  general: '#8b5cf6',
  fun: '#ef4444'
};

function CategoryFilter({ selectedCategory, onSelect }) {
  const categories = ['all', 'aptitude', 'bollywood', 'entertainment', 'science', 'general', 'fun'];

  return (
    <div className="category-filter">
      <div className="filter-header">
        <span className="filter-icon">🎨</span>
        <h3>Categories</h3>
      </div>
      <div className="filter-options">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
            style={{
              background: selectedCategory === category
                ? `linear-gradient(135deg, ${categoryColors[category]}, ${categoryColors[category]}dd)`
                : '#f9fafb'
            }}
          >
            <span className="category-icon">{categoryIcons[category]}</span>
            <span className="category-label">{categoryLabels[category]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;