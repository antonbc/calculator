const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const equalButton = document.getElementById('equal');
const decimalButton = document.getElementById('decimal');

let firstNumber = ''; 
let secondNumber = '';
let currentOperator = null;
let result = null;

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Clear button functionality
clearButton.addEventListener('click', () => {
    firstNumber = ''; 
    secondNumber = '';
    currentOperator = null;
    result = null;
    updateDisplay(''); // Clear display
});

// Digit button functionality
digits.forEach(digitBtn => {
    digitBtn.addEventListener('click', () => {
        if (currentOperator === null) {
            firstNumber += digitBtn.textContent;
            updateDisplay(firstNumber);
        } else {
            secondNumber += digitBtn.textContent;
            updateDisplay(secondNumber);
        }
    });
});

// Operator button functionality
operators.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', () => {
        if (firstNumber !== '' && secondNumber !== '' && currentOperator !== null) {
            result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = result.toString();
            secondNumber = '';
            updateDisplay(result);
        }
        currentOperator = operatorBtn.textContent; // Assign operator
    });
});

// Equal button functionality
equalButton.addEventListener('click', () => {
    if (firstNumber !== '' && secondNumber !== '' && currentOperator !== null) {
        result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
        updateDisplay(result);
        firstNumber = result.toString();
        secondNumber = '';
        currentOperator = null;
    }
});

// Decimal button functionality
decimalButton.addEventListener('click', () => {
    if (currentOperator === null) {
        if (!firstNumber.includes('.')) {
            firstNumber += '.';
            updateDisplay(firstNumber);
        }
    } else {
        if (!secondNumber.includes('.')) {
            secondNumber += '.';
            updateDisplay(secondNumber);
        }
    }
});

// Arithmetic operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return 'undefined';
    return a / b;
}

// Operate function to handle operations
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}