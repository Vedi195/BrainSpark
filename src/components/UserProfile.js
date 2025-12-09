// src/components/UserProfile.js
import React, { useState } from 'react';
import './UserProfile.css';

function UserProfile({ stats, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(stats.name);
  const [email, setEmail] = useState(stats.email);

  const handleSave = () => {
    onUpdate({ name, email });
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="profile-avatar">
          {stats.name.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          {isEditing ? (
            <div className="edit-form">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="edit-input"
                placeholder="Your Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="edit-input"
                placeholder="your@email.com"
              />
              <div className="edit-actions">
                <button onClick={handleSave} className="save-btn">Save</button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="profile-name">{stats.name}</h3>
              <p className="profile-email">{stats.email}</p>
              <button onClick={() => setIsEditing(true)} className="edit-btn">
                ✏️ Edit Profile
              </button>
            </>
          )}
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-box">
          <div className="stat-value">{stats.totalQuestions}</div>
          <div className="stat-label">Questions Solved</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;