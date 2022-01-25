const themeSlider = document.querySelector('.theme-slider');
const themes = ['theme-1', 'theme-2', 'theme-3'];

themeSlider.addEventListener('input', () => {
    setTheme(themeSlider.value);
});

let savedOperand;
let savedOperation;
let currentOperand;

for (let i = 0; i <= 9; i++) {
    document.querySelector(`.button-${i}`).addEventListener('click', () => {
        currentOperand += String(i);
    });
}

document.querySelector('.button-add').addEventListener('click', () => {
    operation('+');
});

document.querySelector('.button-subtract').addEventListener('click', () => {
    operation('-');
});

document.querySelector('.button-multiply').addEventListener('click', () => {
    operation('*');
});

document.querySelector('.button-divide').addEventListener('click', () => {
    operation('/');
});

document.querySelector('.button-equals').addEventListener('click', () => {
    let result = savedOperand;
    if (savedOperation === '+') {
        result += currentOperand;
    } else if (savedOperation === '-') {
        result -= currentOperand;
    } else if (savedOperation === '*') {
        result *= currentOperand;
    } else if (savedOperation === '/') {
        result /= currentOperand;
    }

    currentOperand = result;
});

document.querySelector('.button-del').addEventListener('click', () => {
    currentOperand = currentOperand.slice(0, -1);
});

document.querySelector('.button-reset').addEventListener('click', () => {
    currentOperand = '';
});

const setTheme = (themeNumber) => {
    const body = document.querySelector('body');
    themes.forEach((theme) => body.classList.remove(theme));
    body.classList.add(themes[themeNumber - 1]);
};

const operation = (operationType) => {
    savedOperand = currentOperand;
    savedOperation = operationType;
    currentOperand = '';
};

const updateDisplay = (value) => {
    const display = document.querySelector('.display');

    let currentOperandAsString = String(currentOperand);

    // Add commas
    let position = currentOperandAsString.length;
    if (currentOperand % 1 !== 0) {
        while (currentOperandAsString[position] !== '.') {
            position--;
        }

        while (position > 0) {
            position -= 3;

            if (position > 0) {
                insert(position, ',', currentOperandAsString);
            }
        }
    }
};

const insert = (index, strToInsert, baseStr) => {
    return baseStr.slice(0, index - 1) + strToInsert + baseStr.slice(index);
};
