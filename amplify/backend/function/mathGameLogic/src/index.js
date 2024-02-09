

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    let response;
    const operation = event.operation || "generateQuestion";
    switch (operation) {
        case "generateQuestion":
            response = generateQuestion();
            break;
        case "validateAnswer":
            response = validateAnswer(event.question, event.userAnswer);
            break;
        default:
            response = { message: "Invalid operation" };
    }

    return {
        statusCode: 200,
        body: JSON.stringify(response),
    };
};

function generateQuestion(difficulty) {
    const operation = randomOperation();
    let num1, num2, question, answer;

    switch (operation) {
        case 'add':
            [num1, num2] = generateNumbers(difficulty, 100);
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case 'subtract':
            [num1, num2] = generateNumbers(difficulty, 100);
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case 'multiply':
            [num1, num2] = generateNumbers(difficulty, 12); // Using smaller range for multiplication
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        // May add more operations with custom ranges in the future
    }

    return { question, answer };
}
function randomOperation() {
    const operations = ['add', 'subtract', 'multiply'];
    const index = Math.floor(Math.random() * operations.length);
    return operations[index];
}

function generateNumbers(difficulty, maxRange) {
    let range;
    switch (difficulty) {
        case 'easy':
            range = maxRange / 2; // Easier questions have smaller numbers
            break;
        case 'medium':
            range = maxRange * 0.75;
            break;
        case 'hard':
        default:
            range = maxRange; // Hard questions use the full range
    }
    const num1 = Math.floor(Math.random() * range);
    const num2 = Math.floor(Math.random() * range);
    return [num1, num2];
}

function validateAnswer(questionObj, userAnswer) {
    const { answer } = questionObj;

    let isCorrect = false;
    if (userAnswer) {
        isCorrect = answer === parseInt(userAnswer);
    }

    return {
        correct: isCorrect,
        correctAnswer: answer // Always provide the correct answer
    };
}