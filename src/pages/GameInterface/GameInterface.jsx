import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './GameInterface.css';

const GameInterface = () => {
    const [question, setQuestion] = useState('12 + 12 = ?');
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('Correct!');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const ROOT_API = process.env.REACT_APP_API_URL;

    const fetchQuestion = useCallback(async () => {
        try {
            const response = await axios.get(`${ROOT_API}/generateQuestion`);
            setQuestion(response.data.question);
            setTimeLeft(30); // Reset timer for the new question
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    }, [ROOT_API]);

    useEffect(() => {
        fetchQuestion();
    }, [fetchQuestion]);

    useEffect(() => {
        const handleTimeOut = async () => {
            try {
                // Fetch correct answer for the current question
                const response = await axios.post(`${ROOT_API}/validateAnswer`, { question, userAnswer: "" });

                setFeedback(`Time up! The correct answer was ${response.data.correctAnswer}`);

                // Introduce a delay before fetching the next question
                setTimeout(() => {
                    fetchQuestion();
                    setUserAnswer(''); // Reset answer field
                    setTimeLeft(30);   // Reset timer for new question
                }, 3000); // 3-second delay
            } catch (error) {
                console.error('Error fetching the correct answer:', error);
            }
        };

        // Timer logic
        if (timeLeft === 0) {
            handleTimeOut();  // Call handleTimeOut when time runs out
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, question, fetchQuestion, ROOT_API]);

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const submitAnswer = async () => {
        try {
            const response = await axios.post(`${ROOT_API}/validateAnswer`, { question, userAnswer });

            if (response.data.correct) {
                setFeedback('Correct!');
                setScore(previousScore => previousScore + 1); // update score
            } else {
                setFeedback('Incorrect. The correct answer was ' + response.data.correctAnswer);
            }
            setUserAnswer(''); // Reset answer field
            setFeedback('');   // Clear feedback for new question
            setTimeLeft(30);   // Reset timer for new question
            fetchQuestion();
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
                <button type="submit" onClick={submitAnswer} className="button submit-answer-button" disabled={feedback !== '' || timeLeft === 0}>Submit Answer</button>
            </div>
            {feedback && <div className="feedback-section">{feedback}</div>}
            <div className="score-section">Score: {score}</div>
            <div className="timer-section">Time left: {timeLeft}s</div>
            {/* TODO! Additional features will be added later */}
        </div>
    );
};

export default GameInterface;
