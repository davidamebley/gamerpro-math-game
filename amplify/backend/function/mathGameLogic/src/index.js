

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    let response;
    switch (event.operation) {
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


function validateAnswer(questionObj, userAnswer) {
    const { question, answer } = questionObj;

    return {
        correct: answer === parseInt(userAnswer),
        correctAnswer: answer
    };
}