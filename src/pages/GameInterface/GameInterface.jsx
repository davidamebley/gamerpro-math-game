import { useState, useEffect } from 'react';
import axios from 'axios';

import './GameInterface.css';

const GameInterface = () => {
    const [question, setQuestion] = useState('12 + 12 = ?');
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('Correct!');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        fetchQuestion();
    }, []);

    useEffect(() => {
        // Timer logic
        if (timeLeft === 0) {
            setFeedback('Time up!');
            fetchQuestion();    // Fetch next question
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);

    const fetchQuestion = async () => {
        try {
            const response = await axios.get('/api/generateQuestion');   // dummy api
            setQuestion(response.data.question);
            setTimeLeft(30); // Reset timer for the new question
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const submitAnswer = async () => {
        try {
            const response = await axios.post('/api/validateAnswer', { question, userAnswer });     // dummy api

            if (response.data.correct) {
                setFeedback('Correct!');
                setScore(previousScore => previousScore + 1);   // update score
            } else {
                setFeedback('Incorrect. The correct answer was ' + response.data.correctAnswer);
            }
            fetchQuestion();    // fetch next question
            console.log('Submitted Answer:', userAnswer);
            // Reset Answer field
            setUserAnswer('');
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };
    return (
        <div className="game-interface">
            <div className="question-section">
                <span className="math-expression">{question}</span>
            </div>
            <div className="answer-section">
                <input
                    type="number"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    placeholder="Enter your answer"
                    className="answer-input"
                />
                <button type="submit" onClick={submitAnswer} className="button submit-answer-button" disabled={feedback !== ''}>Submit Answer</button>
            </div>
            {feedback && <div className="feedback-section">{feedback}</div>}
            <div className="score-section">Score: {score}</div>
            <div className="timer-section">Time left: {timeLeft}s</div>
            {/* TODO! Additional features like timer will be added later */}
        </div>
    );
};

export default GameInterface;
