const digitsButton = document.querySelectorAll('.digits');
const operatorButton = document.querySelectorAll('.operator');
const percentButton = document.querySelector('.percent');
const decimalButton = document.querySelector('.decimal');
const clearButton = document.querySelector('.clear');
const signButton = document.querySelector('.sign');
const equalButton = document.querySelector('.equal');
const display = document.querySelector('.display');

let firstNumber = '';
let secondNumber = '';
let operation = null;
let result = null;

function addToDisplay(value){
    display.value = value;
};

operatorButton.forEach(operator => {
    operator.addEventListener('click', () => {
        if(firstNumber !== '' && secondNumber !== '' && operation !== null){
            result = operate(operation, parseFloat(firstNumber), parseFloat(secondNumber))
            addToDisplay(result)
            firstNumber = result
            secondNumber = ''
        }
        else if(operator.textContent === '÷')
            operation = '/'
        else if(operator.textContent === 'x')
            operation = '*'
        else operation = operator.textContent

    })
});

digitsButton.forEach(digit => {
    digit.addEventListener('click', () => {
        if(operation === null){
            firstNumber += digit.textContent;
            addToDisplay(firstNumber);
        }
        else{
            secondNumber += digit.textContent;
            addToDisplay(secondNumber);
        }
    })
});

clearButton.addEventListener('click', () => {
    firstNumber = '';
    secondNumber = '';
    operation = null;
    result = null;
    addToDisplay('');
});


decimalButton.addEventListener('click', () => {
    if(operation === null){
        if(!firstNumber.includes('.')){
            firstNumber += '.';
            addToDisplay(firstNumber);
        }
    }
    else{
        if(!secondNumber.includes('.')){ 
            secondNumber += '.';
            addToDisplay(secondNumber);
        }
    }
});

equalButton.addEventListener('click', () => {
    if(firstNumber !== '' && secondNumber !== '' && operation !== null){
        result = operate(operation, parseFloat(firstNumber), parseFloat(secondNumber))
        addToDisplay(result);
        firstNumber = result;
        secondNumber = '';
        operation = null;
    }
});

percentButton.addEventListener('click', () => {
    let temp1 = firstNumber
    let temp2 = secondNumber
    if(operation === null){
        firstNumber = (parseFloat(temp1) / 100).toString();
        addToDisplay(firstNumber);
    }
    else{
        secondNumber = (parseFloat(temp2) / 100).toString();
        addToDisplay(secondNumber);
    }
});

signButton.addEventListener('click', () => {
    if(operation === null) {
        firstNumber = parseFloat(firstNumber) * -1;
        addToDisplay(firstNumber);
    } 
    else {
        secondNumber = parseFloat(secondNumber) * -1;
        addToDisplay(secondNumber);
    }
});


function add(firstNumber, secondNumber){
    return firstNumber + secondNumber;
};

function subtract(firstNumber, secondNumber){
    return firstNumber - secondNumber;
};

function multiply(firstNumber, secondNumber){
    return firstNumber * secondNumber;
};

function divide(firstNumber, secondNumber){
    if (secondNumber === 0) return 'undefined';
    return firstNumber / secondNumber;
};

function operate(operator, firstNumber, secondNumber){
    switch (operator){
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return null;
    }
};