

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

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    const operation = randomOperation();

    let question, answer;
    switch (operation) {
        case 'add':
            question = `${num1} + ${num2}`;
            answer = num1 + num2;
            break;
        case 'subtract':
            question = `${num1} - ${num2}`;
            answer = num1 - num2;
            break;
        case 'multiply':
            question = `${num1} * ${num2}`;
            answer = num1 * num2;
            break;
        // May add more operations here in the future
    }

    return { question, answer };
}


function validateAnswer(questionObj, userAnswer) {
    const { question, answer } = questionObj;

    return {
        correct: answer === parseInt(userAnswer),
        correctAnswer: answer
    };
}