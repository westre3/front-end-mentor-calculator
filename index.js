import Stack from './stack.js';

const themeSlider = document.querySelector('.theme-slider');
const themes = ['theme-1', 'theme-2', 'theme-3'];

// Control Theme Slider
themeSlider.addEventListener('input', () => {
    setTheme(themeSlider.value);
    localStorage.setItem('theme-preference', `theme-${themeSlider.value}`);
});

const setTheme = (themeNumber) => {
    const body = document.querySelector('body');
    themes.forEach((theme) => body.classList.remove(theme));
    body.classList.add(themes[themeNumber - 1]);
};

if (localStorage.getItem('theme-preference') == 'theme-1') {
    themeSlider.value = 1;
    setTheme(1);
} else if (localStorage.getItem('theme-preference') == 'theme-2') {
    themeSlider.value = 2;
    setTheme(2);
} else if (localStorage.getItem('theme-preference') == 'theme-3') {
    themeSlider.value = 3;
    setTheme(3);
} else if (matchMedia && matchMedia('(prefers-color-scheme: light)').matches) {
    themeSlider.value = 2;
    setTheme(2);
} else if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) {
    themeSlider.value = 3;
    setTheme(3);
} else {
    themeSlider.value = 1;
    setTheme(1);
}

// Calculator Functionality
const mainStack = new Stack();
let lastEvaluatedOperation = '';
let lastEvaluatedOperand = '';
let clearedResult = false;

const defaultDisplayFontSize = getComputedStyle(
    document.querySelector('.display')
).getPropertyValue('font-size');

let firstOperand = '';
let operation = '';
let secondOperand = '';

for (let i = 0; i <= 9; i++) {
    document.querySelector(`.button-${i}`).addEventListener('click', () => {
        input(String(i));
    });
}

document.querySelector('.button-decimal').addEventListener('click', () => {
    input('.');
});

document.querySelector('.button-add').addEventListener('click', () => {
    input('+');
});

document.querySelector('.button-subtract').addEventListener('click', () => {
    input('-');
});

document.querySelector('.button-multiply').addEventListener('click', () => {
    input('*');
});

document.querySelector('.button-divide').addEventListener('click', () => {
    input('/');
});

document.querySelector('.button-equals').addEventListener('click', () => {
    input('=');
});

document.querySelector('.button-del').addEventListener('click', () => {
    input('del');
});

document.querySelector('.button-reset').addEventListener('click', () => {
    input('reset');
});

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case '0':
            input('0');
            animateKey('.button-0');
            break;
        case '1':
            input('1');
            animateKey('.button-1');
            break;
        case '2':
            input('2');
            animateKey('.button-2');
            break;
        case '3':
            input('3');
            animateKey('.button-3');
            break;
        case '4':
            input('4');
            animateKey('.button-4');
            break;
        case '5':
            input('5');
            animateKey('.button-5');
            break;
        case '6':
            input('6');
            animateKey('.button-6');
            break;
        case '7':
            input('7');
            animateKey('.button-7');
            break;
        case '8':
            input('8');
            animateKey('.button-8');
            break;
        case '9':
            input('9');
            animateKey('.button-9');
            break;
        case '.':
            input('.');
            animateKey('.button-decimal');
            break;
        case '+':
            input('+');
            animateKey('.button-add');
            break;
        case '-':
            input('-');
            animateKey('.button-subtract');
            break;
        case '*':
            input('*');
            animateKey('.button-multiply');
            break;
        case '/':
            input('/');
            animateKey('.button-divide');
            break;
        case '=':
        case 'Enter':
            input('=');
            animateKey('.button-equals');
            break;
        case 'Backspace':
        case 'Delete':
            input('del');
            animateKey('.button-del');
            break;
        case 'Escape':
            input('reset');
            animateKey('.button-reset');
            break;
    }

    e.preventDefault();
});

const animateKey = (keyClassString) => {
    const keyClass = document.querySelector(keyClassString);
    keyClass.classList.add('active');
    setTimeout(() => keyClass.classList.remove('active'), 100);
};

const evaluate = (firstOperand, operation, secondOperand) => {
    const firstNumber = Number(firstOperand);
    const secondNumber = Number(secondOperand);
    let result;

    switch (operation) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            result = firstNumber / secondNumber;
            break;
    }

    return String(result);
};

const updateDisplay = (value) => {
    const display = document.querySelector('.display');

    let displayedValue = value;

    if (displayedValue === '') {
        displayedValue = '0';
    }

    // Add commas
    let position = displayedValue.indexOf('.');
    if (position === -1) {
        position = displayedValue.length;
    }

    position -= 3;
    while (position > 0) {
        insert(position, ',', displayedValue);
        position -= 3;
    }

    display.innerHTML = displayedValue;

    if (display.scrollWidth > display.clientWidth) {
        const fontSize = getComputedStyle(display).getPropertyValue('font-size');
        display.style.fontSize = String(Number(fontSize.slice(0, -2)) / 2) + 'px';
    }
};

const insert = (index, strToInsert, baseStr) => {
    return baseStr.slice(0, index) + strToInsert + baseStr.slice(index);
};

const input = (key) => {
    if (key === 'reset') {
        console.log('reset');
        mainStack.clear();
        lastEvaluatedOperation = '';
        lastEvaluatedOperand = '';
        clearedResult = false;
        document.querySelector('.display').style.fontSize = defaultDisplayFontSize;
        updateDisplay('0');
    } else if (key === 'del') {
        if (mainStack.isEmpty()) {
        } else if (isOperation(mainStack.peek())) {
        } else {
            let value = mainStack.pop();
            value = value.slice(0, value.length - 1);
            if (value !== '') {
                mainStack.push(value);
                updateDisplay(value);
            } else {
                updateDisplay(value);
            }
        }
    } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'].includes(key)) {
        console.log('number');
        let operand;
        // If the user has just hit =, ignore the number on top of the stack
        // and use the newly entered number instead
        if (!clearedResult && lastEvaluatedOperation !== '' && lastEvaluatedOperand !== '') {
            mainStack.pop();
            operand = key;
            clearedResult = true;
        }

        // Append key to existing number on top of stack
        else if (isNumber(mainStack.peek())) {
            operand = mainStack.pop() + key;
        }

        // Push new number to top of stack
        else {
            operand = key;
        }

        if (operand === '.') {
            operand = '0.';
        }

        mainStack.push(operand);
        updateDisplay(operand);
    } else if (['*', '/'].includes(key)) {
        console.log('multiplication or division');
        // If user entered operation first, ignore it
        if (mainStack.isEmpty()) {
        }

        // If user entered two operations in a row, replace the older operation
        // with the newer one
        else if (isOperation(mainStack.peek())) {
            mainStack.pop();
            mainStack.push(key);
        }

        // evaluate existing operations until we hit a + or -
        else {
            let runningTotal = mainStack.pop();
            while (!mainStack.isEmpty() && !['+', '-'].includes(mainStack.peek())) {
                let operation = mainStack.pop();
                runningTotal = evaluate(mainStack.pop(), operation, runningTotal);
            }

            mainStack.push(runningTotal);
            updateDisplay(runningTotal);
            mainStack.push(key);

            lastEvaluatedOperation = '';
            lastEvaluatedOperand = '';
        }

        clearedResult = false;
    } else if (['+', '-'].includes(key)) {
        console.log('addition or subtraction');
        // If user entered operation first, ignore it
        if (mainStack.isEmpty()) {
        }

        // If user entered two operations in a row, replace the older operation
        // with the newer one
        else if (isOperation(mainStack.peek())) {
            mainStack.pop();
            mainStack.push(key);
        }

        // evaluate all existing operations
        else {
            let runningTotal = mainStack.pop();
            while (!mainStack.isEmpty()) {
                let operation = mainStack.pop();
                runningTotal = evaluate(mainStack.pop(), operation, runningTotal);
            }

            mainStack.push(runningTotal);
            updateDisplay(runningTotal);
            mainStack.push(key);

            lastEvaluatedOperation = '';
            lastEvaluatedOperand = '';
        }

        clearedResult = false;
    } else if (key === '=') {
        console.log('equals');
        // If user hit = first, ignore it
        if (mainStack.isEmpty()) {
        }

        // If user entered <operand> <operation>, assume second operand is same as first
        else if (isOperation(mainStack.peek())) {
            let operation = mainStack.pop();
            let operand = mainStack.pop();
            let result = evaluate(operand, operation, operand);
            lastEvaluatedOperation = operation;
            lastEvaluatedOperand = operand;
            mainStack.push(result);
            updateDisplay(result);
        }

        // If user hit = multiple times, repeat last operation
        else if (lastEvaluatedOperation !== '' && lastEvaluatedOperand !== '') {
            let result = evaluate(mainStack.pop(), lastEvaluatedOperation, lastEvaluatedOperand);
            mainStack.push(result);
            updateDisplay(result);
        }

        // If user entered only one number, don't do anything
        else if (isNumber(mainStack.peek()) && mainStack.length() === 1) {
        }

        // evaluate series of operations
        else {
            let runningTotal = mainStack.pop();
            lastEvaluatedOperand = runningTotal;
            let operation = mainStack.pop();
            lastEvaluatedOperation = operation;
            runningTotal = evaluate(mainStack.pop(), operation, runningTotal);

            while (!mainStack.isEmpty()) {
                operation = mainStack.pop();
                runningTotal = evaluate(mainStack.pop(), operation, runningTotal);
            }

            mainStack.push(runningTotal);
            updateDisplay(runningTotal);
        }

        clearedResult = false;
    }
    console.log(mainStack.data);
};

const isNumber = (s) => {
    return !isNaN(Number(s));
};

const isOperation = (s) => {
    return ['+', '-', '*', '/'].includes(s);
};
