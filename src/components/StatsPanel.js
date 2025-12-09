// src/components/StatsPanel.js
import React from 'react';
import './StatsPanel.css';

function StatsPanel({ stats }) {
  const getRankIcon = () => {
    if (stats.stars >= 500) return '👑';
    if (stats.stars >= 400) return '🏆';
    if (stats.stars >= 300) return '🎯';
    if (stats.stars >= 200) return '⭐';
    if (stats.stars >= 100) return '📈';
    return '🌱';
  };

  const getRankName = () => {
    if (stats.stars >= 500) return 'Legend';
    if (stats.stars >= 400) return 'Master';
    if (stats.stars >= 300) return 'Expert';
    if (stats.stars >= 200) return 'Advanced';
    if (stats.stars >= 100) return 'Intermediate';
    return 'Beginner';
  };

  const getRankColor = () => {
    if (stats.stars >= 500) return '#fbbf24';
    if (stats.stars >= 400) return '#a855f7';
    if (stats.stars >= 300) return '#ef4444';
    if (stats.stars >= 200) return '#3b82f6';
    if (stats.stars >= 100) return '#10b981';
    return '#6366f1';
  };

  const getProgressPercentage = () => {
    return (stats.stars % 100);
  };

  const getStarsToNextRank = () => {
    return 100 - (stats.stars % 100);
  };

  return (
    <div className="stats-panel">
      <div className="rank-display" style={{ borderColor: getRankColor() }}>
        <div className="rank-icon">{getRankIcon()}</div>
        <div className="rank-info">
          <span className="rank-label">Current Rank</span>
          <span className="rank-name" style={{ color: getRankColor() }}>
            {getRankName()}
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-item stars">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <span className="stat-value">{stats.stars}</span>
            <span className="stat-label">Total Stars</span>
          </div>
        </div>

        <div className="stat-item streak">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <span className="stat-value">{stats.streak}</span>
            <span className="stat-label">Day Streak</span>
          </div>
        </div>
      </div>

      <div className="progress-section">
        <h4>Progress to Next Rank</h4>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${getProgressPercentage()}%`,
              background: getRankColor()
            }}
          ></div>
        </div>
        <p className="progress-text">
          {getStarsToNextRank()} stars to {
            stats.stars >= 500 ? 'MAX' :
            stats.stars >= 400 ? 'Legend' :
            stats.stars >= 300 ? 'Master' :
            stats.stars >= 200 ? 'Expert' :
            stats.stars >= 100 ? 'Advanced' :
            'Intermediate'
          }
        </p>
      </div>

      <div className="motivational-section">
        <span className="quote-icon">💭</span>
        <p className="quote-text">
          {stats.stars >= 300 
            ? "You're crushing it! Keep going!" 
            : stats.stars >= 100 
            ? "Amazing progress! Don't stop now!" 
            : "Keep learning, keep growing!"}
        </p>
      </div>
    </div>
  );
}

export default StatsPanel;