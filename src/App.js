// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import CategoryFilter from './components/CategoryFilter';
import QuestionCard from './components/QuestionCard';
import StatsPanel from './components/StatsPanel';
import Confetti from './components/Confetti';
import { questionBank } from './data/questionBank';

function App() {
  const [userProfile, setUserProfile] = useState({
    name: 'Player',
    email: 'player@brainspark.com',
    totalQuestions: 0,
    accuracy: 0
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [stats, setStats] = useState({
    stars: 95,
    streak: 5,
    rank: 'Beginner'
  });

  useEffect(() => {
    loadNewQuestion();
  }, [selectedCategory]);

  const loadNewQuestion = () => {
    let availableQuestions = [];

    if (selectedCategory === 'all') {
      Object.values(questionBank).forEach(questions => {
        availableQuestions.push(...questions);
      });
    } else {
      availableQuestions = questionBank[selectedCategory] || [];
    }

    // Filter out already asked questions
    const unaskedQuestions = availableQuestions.filter(
      q => !askedQuestions.includes(q.id)
    );

    let questionToAsk;
    if (unaskedQuestions.length === 0) {
      // Reset if all questions are asked
      setAskedQuestions([]);
      questionToAsk = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    } else {
      questionToAsk = unaskedQuestions[Math.floor(Math.random() * unaskedQuestions.length)];
    }

    setCurrentQuestion(questionToAsk);
    setAskedQuestions([...askedQuestions, questionToAsk.id]);
    setAnswered(false);
  };

  const handleAnswer = (isCorrect) => {
    const pointsEarned = currentQuestion.difficulty === 'easy' ? 10 
                       : currentQuestion.difficulty === 'medium' ? 20 
                       : 30;

    const newTotalQuestions = userProfile.totalQuestions + 1;
    const newCorrectAnswers = isCorrect ? correctAnswers + 1 : correctAnswers;

    if (isCorrect) {
      setStats(prevStats => ({
        stars: prevStats.stars + pointsEarned,
        streak: prevStats.streak + 1,
        rank: calculateRank(prevStats.stars + pointsEarned)
      }));
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setStats(prevStats => ({
        ...prevStats,
        streak: 0
      }));
    }

    setUserProfile(prev => ({
      ...prev,
      totalQuestions: newTotalQuestions,
      accuracy: Math.round((newCorrectAnswers / newTotalQuestions) * 100)
    }));

    setCorrectAnswers(newCorrectAnswers);
    setAnswered(true);
  };

  const calculateRank = (stars) => {
    if (stars >= 500) return 'Legend';
    if (stars >= 400) return 'Master';
    if (stars >= 300) return 'Expert';
    if (stars >= 200) return 'Advanced';
    if (stars >= 100) return 'Intermediate';
    return 'Beginner';
  };

  const getCurrentCategory = () => {
    if (!currentQuestion) return 'general';
    
    for (const [category, questions] of Object.entries(questionBank)) {
      if (questions.find(q => q.id === currentQuestion.id)) {
        return category;
      }
    }
    return 'general';
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile(prev => ({
      ...prev,
      name: updatedProfile.name,
      email: updatedProfile.email
    }));
  };

  return (
    <div className="App">
      {showConfetti && <Confetti />}
      
      <Header />

      <div className="main-content">
        <div className="left-section">
          <UserProfile 
            stats={userProfile} 
            onUpdate={handleProfileUpdate}
          />
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="center-section">
          {currentQuestion && (
            <QuestionCard
              question={currentQuestion}
              category={getCurrentCategory()}
              onAnswer={handleAnswer}
              answered={answered}
            />
          )}
          
          {answered && (
            <button 
              onClick={loadNewQuestion} 
              className="next-question-btn"
            >
              Next Question →
            </button>
          )}
        </div>

        <div className="right-section">
          <StatsPanel stats={stats} />
        </div>
      </div>
    </div>
  );
}

export default App;