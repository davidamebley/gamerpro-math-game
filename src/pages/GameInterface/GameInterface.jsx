import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import './GameInterface.css';

const GameInterface = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');   // Correct answer
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timerActive, setTimerActive] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ROOT_API = process.env.REACT_APP_API_URL;

    const fetchQuestion = useCallback(async () => {
        try {
            const response = await axios.get(`${ROOT_API}/questions/generateQuestion`);
            const responseBody = JSON.parse(response.data.body);
            setQuestion(responseBody.question);
            setAnswer(responseBody.answer);
            setTimeLeft(30); // Reset timer for the new question
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    }, [ROOT_API]);

    useEffect(() => {
        fetchQuestion();    // Call function only once when the component mounts
    }, [fetchQuestion]);

    useEffect(() => {
        if (!timerActive) return;

        const handleTimeOut = async () => {
            try {
                // Fetch correct answer for the current question
                const response = await axios.post(`${ROOT_API}/questions/validateAnswer`, {
                    operation: "validateAnswer",
                    question: {
                        question: question,
                        answer: answer,
                    },
                    userAnswer: userAnswer,
                });

                const responseBody = JSON.parse(response.data.body);

                setFeedback(`Time up! The correct answer was ${responseBody.correctAnswer}`);

                // Introduce a delay before fetching the next question
                setTimeout(() => {
                    fetchQuestion();
                    setUserAnswer(''); // Reset answer field
                    setFeedback('');    // Hide feedback after delay
                    setTimeLeft(30);   // Reset timer for new question
                    setTimerActive(true); // Reactivate timer for new question
                }, 3000); // 3-second delay
            } catch (error) {
                console.error('Error fetching the correct answer:', error);
            }
        };

        if (timeLeft === 0) {
            handleTimeOut();  // Call handleTimeOut when time runs out
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, timerActive, question, fetchQuestion, answer, userAnswer, ROOT_API]);

    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value);
    };

    const submitAnswer = async () => {
        setIsSubmitting(true);  // Prevent further submissions

        try {
            const response = await axios.post(`${ROOT_API}/questions/validateAnswer`, {
                operation: "validateAnswer",
                question: {
                    question: question,
                    answer: answer,
                },
                userAnswer: userAnswer,
            });

            const responseBody = JSON.parse(response.data.body);

            if (responseBody.correct) {
                setFeedback('Correct!');
                setScore(previousScore => previousScore + 1); // update score
            } else {
                setFeedback('Incorrect. The correct answer was ' + responseBody.correctAnswer);
            }

            // Deactivate the timer
            setTimerActive(false);

            // A delay before resetting for the next question
            setTimeout(() => {
                setUserAnswer('');
                setFeedback('');
                setTimeLeft(30);   // Reset timer for new question
                fetchQuestion();
                setTimerActive(true); // Reactivate timer for new question
                setIsSubmitting(false); // Allow submissions again
            }, 3000);

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
                <button type="submit" onClick={submitAnswer} className="button submit-answer-button" disabled={isSubmitting || feedback !== '' || timeLeft === 0}>Submit Answer</button>
            </div>
            {feedback && <div className="feedback-section">{feedback}</div>}
            <div className="score-section">Score: {score}</div>
            <div className="timer-section">Time left: {timeLeft}s</div>
            {/* TODO! Additional features will be added later */}
        </div>
    );
};

export default GameInterface;
