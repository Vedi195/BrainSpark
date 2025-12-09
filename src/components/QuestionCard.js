// src/components/QuestionCard.js
import React, { useState } from 'react';
import './QuestionCard.css';

const categoryIcons = {
  aptitude: '🧮',
  bollywood: '🎬',
  entertainment: '🎭',
  science: '🔬',
  general: '📚',
  fun: '🎪'
};

const categoryColors = {
  aptitude: '#3b82f6',
  bollywood: '#ec4899',
  entertainment: '#f59e0b',
  science: '#10b981',
  general: '#8b5cf6',
  fun: '#ef4444'
};

const difficultyColors = {
  easy: '#4ade80',
  medium: '#fbbf24',
  hard: '#ef4444'
};

function QuestionCard({ question, category, onAnswer, answered }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState('');

  const handleOptionClick = (index) => {
    if (answered) return;

    setSelectedOption(index);
    const isCorrect = index === question.correct;
    setFeedback(isCorrect ? 'correct' : 'wrong');
    onAnswer(isCorrect);
  };

  const getDifficultyColor = () => difficultyColors[question.difficulty] || '#6366f1';
  const getCategoryColor = () => categoryColors[category] || '#667eea';

  return (
    <div 
      className={`question-card ${feedback}`}
      style={{
        borderTopColor: feedback ? (feedback === 'correct' ? '#22c55e' : '#ef4444') : getCategoryColor()
      }}
    >
      <div className="question-header">
        <div className="question-type">
          <span className="type-icon">{categoryIcons[category] || '❓'}</span>
          <span className="type-text" style={{ color: getCategoryColor() }}>
            {category.toUpperCase()}
          </span>
        </div>
        <div 
          className="difficulty-badge"
          style={{ backgroundColor: getDifficultyColor() }}
        >
          {question.difficulty}
        </div>
      </div>

      <div className="question-text">
        <h2>{question.question}</h2>
      </div>

      <div className="options-container">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${
              selectedOption === index
                ? index === question.correct
                  ? 'correct-option'
                  : 'wrong-option'
                : ''
            } ${answered && index === question.correct ? 'show-correct' : ''}`}
            onClick={() => handleOptionClick(index)}
            disabled={answered}
            style={{
              borderColor: selectedOption === index || (answered && index === question.correct)
                ? undefined
                : getCategoryColor() + '33'
            }}
          >
            <span 
              className="option-letter"
              style={{
                backgroundColor: selectedOption === index
                  ? (index === question.correct ? '#22c55e' : '#ef4444')
                  : answered && index === question.correct
                  ? '#22c55e'
                  : getCategoryColor()
              }}
            >
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option}</span>
          </button>
        ))}
      </div>

      {feedback && (
        <div className={`feedback-message ${feedback}`}>
          <span className="feedback-icon">{feedback === 'correct' ? '🎉' : '😅'}</span>
          <span>
            {feedback === 'correct' 
              ? 'Perfect! You got it right!' 
              : 'Oops! Better luck next time!'}
          </span>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;