let display: HTMLDivElement;
let buttons: NodeListOf<HTMLButtonElement>;
let buttonsContainer: HTMLDivElement;

let currentInput: string = '0';
let firstOperand: number | null = null;
let operator: string | null = null;

const operations: Record<Operation, (a: number, b?: number) => number> = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b !== 0 ? a / b : NaN),
    power: (a, b) => Math.pow(a, b),
    sqrt: (a) => Math.sqrt(a),
};

type Operation = 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt';

window.addEventListener('DOMContentLoaded', () => init());

const init = (): void => {
    getElements();
    addEventListeners();
};

const getElements = (): void => {
    display = document.getElementById('display') as HTMLDivElement;
    buttonsContainer = document.getElementById('buttons') as HTMLDivElement;
    buttons = document.querySelectorAll<HTMLButtonElement>('button');
};

const updateDisplay = (): void => {
    display.textContent = currentInput;
};

const clear = (): void => {
    currentInput = '0';
    firstOperand = null;
    operator = null;

    updateDisplay();
};

const appendDigit = (digit: string): void => {
    if (currentInput === '0' && digit !== '.') {
        currentInput = digit;
    } else if (digit === '.' && currentInput.indexOf('.') !== -1) {
        return;
    } else {
        currentInput += digit;
    }
    updateDisplay();
};

const setOperator = (operation: Operation): void => {
    if (!currentInput) return;

    firstOperand = parseFloat(currentInput);
    operator = operation;
    currentInput = '0';
};

const calculate = (): void => {
    if (operator && firstOperand) {
        const secondOperand = parseFloat(currentInput);

        let result: number;

        if (operator === 'sqrt') {
            result = operations['sqrt'](firstOperand);
        } else {
            result = operations[operator](firstOperand, secondOperand);
        }

        currentInput = formatNumber(result);

        firstOperand = null;
        operator = null;

        updateDisplay();
    }
};

const calculateSqrt = (): void => {
    const num = parseFloat(currentInput);

    const result = num >= 0 ? Math.sqrt(num) : NaN;

    currentInput = formatNumber(result);

    updateDisplay();
};

const formatNumber = (num: number): string => {
    let str = num.toFixed(8);

    if (str.indexOf('.') !== -1) {
        str = str.replace(/\.?0+$/, '');
    }
    return str;
};

const addEventListeners = (): void => {
    buttonsContainer.addEventListener('click', (event: MouseEvent) => {
        const button = event.target as HTMLButtonElement;

        if (button.hasAttribute('data-digit')) {
            const digit = button.getAttribute('data-digit');

            if (!digit) return;

            appendDigit(digit);

        } else if (button.hasAttribute('data-operation')) {
            const operation = button.getAttribute('data-operation');

            if (!operation) return;

            if (operation === 'sqrt') {
                calculateSqrt();
            } else {
                setOperator(operation as Operation);
            }
        } else if (button.id === 'equals') {
            calculate();
        } else if (button.id === 'clear') {
            clear();
        }
    })
};