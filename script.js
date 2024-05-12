let currentInput = '0'; // Store the current input
let previousInput = ''; // Store the previous input
let operation = ''; // Store the current operation (+, -, *, /)
let floatOperation = false;
const display = document.querySelector('.display'); // Reference to the display element
const keys = document.querySelectorAll('.keys'); // Get references to all key buttons

function isOperator(operation){
    if(operation == '+') return true;
    if(operation == '-') return true;
    if(operation == '*') return true;
    if(operation == '/') return true;
}

function computeOperation(first, second, operator){
    previousInput = '';
    currentInput = '0';
    operation = '';
    if(operator == '+') return first + second;
    if(operator == '-') return first - second;
    if(operator == '*') return first * second;
    if(operator == '/') return first / second;
}

function changeSign(input) {
    if(input <= 0) return input.toString();
    if(input > 0) return '-' + input.toString();
}

function updateDisplay(value) {
    const maxLength = 8; // Maximum number of digits to display
    const numberValue = parseFloat(value);
    const displayText = numberValue.toString();

    // Update the display text
    display.textContent = displayText.substring(0, maxLength);
}


keys.forEach(key => {
    key.addEventListener('click', () => {
        const keyValue = key.textContent;

        if (!isNaN(parseFloat(keyValue))) {
            currentInput += key.textContent;
            
        } else if(isOperator(keyValue)) {
            previousInput = currentInput;
            currentInput = '0';
            operation = keyValue;
            floatOperation = false;

        } else if(keyValue == '=') {
            const result = computeOperation(parseFloat(previousInput), 
                                            parseFloat(currentInput), operation);
            currentInput = result.toString();
            floatOperation = false;

        } else if(keyValue == 'AC') {
            previousInput = '';
            currentInput = '0';
            operation = '';
            floatOperation = false;

        } else if(keyValue == '+/-') {
            currentInput = changeSign(parseFloat(currentInput));

        } else if(keyValue == '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();

        } else if(keyValue == '.' && !floatOperation) {
            floatOperation = true;
            currentInput += '.'
        }

        if(!(isOperator(keyValue) || keyValue == '.')) 
            updateDisplay(currentInput);

    });
});


