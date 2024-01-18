import { useState } from 'react';

import './GameInterface.css';

const GameInterface = () => {
    const [answer, setAnswer] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [correct, setCorrect] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [question, setQuestion] = useState('12 + 12 =?');

    const handleAnswerChange = (event) => {
        setAnswer(event.target.value);
    };
    const submitAnswer = () => {
        console.log('Submitted Answer:', answer);
        // Reset Answer field
        setAnswer('');
    };
    return (
        <div className="game-interface">
            <div className="question-section">
                <span className="math-expression">{question}</span>
            </div>
            <div className="answer-section">
                <input
                    type="text"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="Enter your answer"
                    className="answer-input"
                />
                <button type="submit" onClick={submitAnswer} className="button submit-answer-button">Submit Answer</button>
            </div>
            {/* TODO! Feedback and Score Display will be added later */}
        </div>
    );
};

export default GameInterface;
