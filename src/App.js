import './App.css';

import React, { useState, useEffect } from 'react';

const App = () => {
  // State for tracking game parameters
  const [timeLimit, setTimeLimit] = useState(60); // default 60 seconds
  const [currentTime, setCurrentTime] = useState(timeLimit);
  const [isGameActive, setIsGameActive] = useState(false);

  // Math problem generation state
  const [currentProblem, setCurrentProblem] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');

  // Scoring and tracking
  const [score, setScore] = useState(0);
  const [totalQuestionsSolved, setTotalQuestionsSolved] = useState(0);

  // Generate a new math problem
  const generateProblem = () => {
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let num1, num2;
    switch(operator) {
      case '+':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 20) + 10;
        setCurrentProblem(`${num1} + ${num2}`);
        setCorrectAnswer(num1 + num2);
        break;
      case '-':
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * 10) + 1;
        setCurrentProblem(`${num1} - ${num2}`);
        setCorrectAnswer(num1 - num2);
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        setCurrentProblem(`${num1} × ${num2}`);
        setCorrectAnswer(num1 * num2);
        break;
      case '/':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        let tmp = num1 * num2;
        setCurrentProblem(`${tmp} / ${num2}`);
        setCorrectAnswer(num1);
        break;
      default:
        break;
    }
  };

  // Start the game
  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTotalQuestionsSolved(0);
    setCurrentTime(timeLimit);
    generateProblem();

    // Start the timer
    const timer = setInterval(() => {
      setCurrentTime(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // setIsGameActive(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  // Handle user answer input
  const handleAnswerChange = (e) => {
    const inputAnswer = e.target.value;
    setUserAnswer(inputAnswer);

    // Check if answer is correct and auto-generate next problem
    if (inputAnswer !== '' && parseInt(inputAnswer) === correctAnswer) {
      setScore(prevScore => prevScore + 1);
      setTotalQuestionsSolved(prev => prev + 1);
      setUserAnswer('');
      generateProblem();
    }
  };

  // Reset game
  const resetGame = () => {
    setIsGameActive(false);
    setScore(0);
    setTotalQuestionsSolved(0);
    setCurrentTime(timeLimit);
  };

  // Automatically generate first problem when time changes
  useEffect(() => {
    if (isGameActive && currentTime > 0) {
      generateProblem();
    }
  }, [isGameActive]);

  return (
    <div className="h-screen flex items-center justify-center bg-slate-100">
    <div className= "max-w-lg mx-auto p-4">

      <div className="p-8 border-8 border-slate-500 rounded">
              {!isGameActive ? (
        <div>
          <h1 className="text-center text-5xl font-bold mb-2">Number Sense</h1>
          <h2 className="text-center text-3xl font-bold mb-4">a mental math game</h2>
          <div className="mb-4">
            <label className="text-center text-xl block mb-2">duration (seconds):</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
              className="text-center w-full p-2 border"
              min="10"
              max="300"
            />
          </div>
          <button
            onClick={startGame}
            className="font-bold w-full bg-blue-500 text-white p-2 rounded"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div>
          {currentTime != 0 && (
                      <div className="text-center text-xl mt-8 mb-4">
                      <div className="flex justify-between mb-4">
                      <span className="text-amber-500">{currentTime}s</span>
                      <span>Solved: {score}</span>
                      </div>
                      {currentProblem} =
                      <input
                      type="number"
                      value={userAnswer}
                      onChange={handleAnswerChange}
                      className="text-center p-2 border mt-4 mb-4 ml-4"
                      placeholder="solution"
                      required
                    />
                    </div>
          )}

          {currentTime === 0 && (
            <div className="mt-4 text-center">
              <h2 className="font-bold text-3xl text-red-500">time's up!</h2>
              { totalQuestionsSolved != 1 && (
                <p className="mt-4 mb-4">you solved <span className="font-bold text-xl text-green-500">{totalQuestionsSolved}</span> problems in <span className="font-bold text-xl text-amber-500">{timeLimit}s</span></p>
              )}
              { totalQuestionsSolved == 1 && (
                <p className="mt-4 mb-4">you solved <span className="font-bold text-xl text-green-500">{totalQuestionsSolved}</span> problem in <span className="font-bold text-xl text-amber-500">{timeLimit}s</span></p>
              )}
              <button
                onClick={resetGame}
                className="font-bold mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Play Again
              </button>
            </div>
          )}
        </div>
      )}

      </div>

    { currentTime === 0 && (
    <div className="flex-col text-center">
    <p className="text-slate-500 mt-6">created by:</p>
    <p className="text-slate-500">rahul koonantavida (r15a)</p>
    </div>
    )}

    </div>
    </div>
  );
};

export default App;