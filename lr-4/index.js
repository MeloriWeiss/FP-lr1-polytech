var display;
var buttons;
var buttonsContainer;
var currentInput = '0';
var firstOperand = null;
var operator = null;
var operations = {
    add: function (a, b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return (b !== 0 ? a / b : NaN); },
    power: function (a, b) { return Math.pow(a, b); },
    sqrt: function (a) { return Math.sqrt(a); },
};
window.addEventListener('DOMContentLoaded', function () { return init(); });
var init = function () {
    getElements();
    addEventListeners();
};
var getElements = function () {
    display = document.getElementById('display');
    buttonsContainer = document.getElementById('buttons');
    buttons = document.querySelectorAll('button');
};
var updateDisplay = function () {
    display.textContent = currentInput;
};
var clear = function () {
    currentInput = '0';
    firstOperand = null;
    operator = null;
    updateDisplay();
};
var appendDigit = function (digit) {
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    }
    else if (digit === '.' && currentInput.indexOf('.') !== -1) {
        return;
    }
    else {
        currentInput += digit;
    }
    updateDisplay();
};
var setOperator = function (operation) {
    if (!currentInput)
        return;
    firstOperand = parseFloat(currentInput);
    operator = operation;
    currentInput = '0';
};
var calculate = function () {
    if (operator && firstOperand) {
        var secondOperand = parseFloat(currentInput);
        var result = void 0;
        if (operator === 'sqrt') {
            result = operations['sqrt'](firstOperand);
        }
        else {
            result = operations[operator](firstOperand, secondOperand);
        }
        currentInput = formatNumber(result);
        firstOperand = null;
        operator = null;
        updateDisplay();
    }
};
var calculateSqrt = function () {
    var num = parseFloat(currentInput);
    var result = num >= 0 ? Math.sqrt(num) : NaN;
    currentInput = formatNumber(result);
    updateDisplay();
};
var formatNumber = function (num) {
    var str = num.toFixed(8);
    if (str.indexOf('.') !== -1) {
        str = str.replace(/\.?0+$/, '');
    }
    return str;
};
var addEventListeners = function () {
    buttonsContainer.addEventListener('click', function (event) {
        var button = event.target;
        if (button.hasAttribute('data-digit')) {
            var digit = button.getAttribute('data-digit');
            if (!digit)
                return;
            appendDigit(digit);
        }
        else if (button.hasAttribute('data-operation')) {
            var operation = button.getAttribute('data-operation');
            if (!operation)
                return;
            if (operation === 'sqrt') {
                calculateSqrt();
            }
            else {
                setOperator(operation);
            }
        }
        else if (button.id === 'equals') {
            calculate();
        }
        else if (button.id === 'clear') {
            clear();
        }
    });
};
