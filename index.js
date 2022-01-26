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

const defaultDisplayFontSize = getComputedStyle(document.querySelector('.display')).getPropertyValue('font-size');

let firstOperand = '';
let operation = '';
let secondOperand = '';

// States = {'firstNumber', 'secondNumber', 'evaluate'}
let state = 'firstNumber';

for (let i = 0; i <= 9; i++) {
  document.querySelector(`.button-${i}`).addEventListener('click', () => {
    updateStateMachine(String(i));
  });
}

document.querySelector('.button-decimal').addEventListener('click', () => {
  updateStateMachine('.');
});

document.querySelector('.button-add').addEventListener('click', () => {
  updateStateMachine('+');
});

document.querySelector('.button-subtract').addEventListener('click', () => {
  updateStateMachine('-');
});

document.querySelector('.button-multiply').addEventListener('click', () => {
  updateStateMachine('*');
});

document.querySelector('.button-divide').addEventListener('click', () => {
  updateStateMachine('/');
});

document.querySelector('.button-equals').addEventListener('click', () => {
  updateStateMachine('=');
});

document.querySelector('.button-del').addEventListener('click', () => {
  updateStateMachine('del');
});

document.querySelector('.button-reset').addEventListener('click', () => {
  resetStateMachine();
});

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case '0':
      updateStateMachine('0');
      animateKey('.button-0');
      break;
    case '1':
      updateStateMachine('1');
      animateKey('.button-1');
      break;
    case '2':
      updateStateMachine('2');
      animateKey('.button-2');
      break;
    case '3':
      updateStateMachine('3');
      animateKey('.button-3');
      break;
    case '4':
      updateStateMachine('4');
      animateKey('.button-4');
      break;
    case '5':
      updateStateMachine('5');
      animateKey('.button-5');
      break;
    case '6':
      updateStateMachine('6');
      animateKey('.button-6');
      break;
    case '7':
      updateStateMachine('7');
      animateKey('.button-7');
      break;
    case '8':
      updateStateMachine('8');
      animateKey('.button-8');
      break;
    case '9':
      updateStateMachine('9');
      animateKey('.button-9');
      break;
    case '.':
      updateStateMachine('.');
      animateKey('.button-decimal');
      break;
    case '+':
      updateStateMachine('+');
      animateKey('.button-add');
      break;
    case '-':
      updateStateMachine('-');
      animateKey('.button-subtract');
      break;
    case '*':
      updateStateMachine('*');
      animateKey('.button-multiply');
      break;
    case '/':
      updateStateMachine('/');
      animateKey('.button-divide');
      break;
    case '=':
    case 'Enter':
      updateStateMachine('=');
      animateKey('.button-equals');
      break;
    case 'Backspace':
    case 'Delete':
      updateStateMachine('del');
      animateKey('.button-del');
      break;
    case 'Escape':
      resetStateMachine();
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

const updateStateMachine = (input) => {
  if (state === 'firstNumber') {
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        firstOperand += input;
        updateDisplay(firstOperand);
        break;
      case '.':
        firstOperand = appendDecimal(firstOperand);
        updateDisplay(firstOperand);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        operation = input;
        state = 'secondNumber';
        break;
      case '=':
        firstOperand = evaluate(firstOperand, operation, secondOperand);
        updateDisplay(firstOperand);
        state = 'evaluate';
        break;
      case 'del':
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
        break;
      case 'reset':
        resetStateMachine();
        break;
      default:
        resetStateMachine();
        break;
    }
  } else if (state === 'secondNumber') {
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        secondOperand += input;
        updateDisplay(secondOperand);
        break;
      case '.':
        secondOperand = appendDecimal(secondOperand);
        updateDisplay(secondOperand);
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        firstOperand = evaluate(firstOperand, operation, secondOperand);
        operation = input;
        secondOperand = '';
        updateDisplay(firstOperand);
        break;
      case '=':
        firstOperand = evaluate(firstOperand, operation, secondOperand);
        updateDisplay(firstOperand);
        state = 'evaluate';
        break;
      case 'del':
        secondOperand = secondOperand.slice(0, -1);
        updateDisplay(secondOperand);
        break;
      case 'reset':
        resetStateMachine();
        break;
      default:
        resetStateMachine();
        break;
    }
  } else if (state === 'evaluate') {
    switch (input) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        firstOperand = input;
        updateDisplay(firstOperand);
        state = 'firstNumber';
        break;
      case '.':
        firstOperand = appendDecimal('');
        updateDisplay(firstOperand);
        state = 'firstNumber';
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        operation = input;
        secondOperand = '';
        state = 'secondNumber';
        break;
      case '=':
        firstOperand = evaluate(firstOperand, operation, secondOperand);
        updateDisplay(firstOperand);
        break;
      case 'del':
        firstOperand = firstOperand.slice(0, -1);
        updateDisplay(firstOperand);
        break;
      case 'reset':
        resetStateMachine();
        break;
      default:
        resetStateMachine();
        break;
    }
  } else {
    resetStateMachine();
  }
};

const appendDecimal = (value) => {
  if (value === '') {
    return '0.';
  } else if (value.indexOf('.') === -1) {
    return value + '.';
  } else {
    return value;
  }
};

const evaluate = (firstOperand, operation, secondOperand) => {
  if (operation === '') {
    return '';
  }

  // If either operand is blank, fill it in with the appropriate
  // identity
  if (firstOperand === '') {
    switch (operation) {
      case '+':
      case '-':
        firstOperand = '0';
        break;
      case '*':
      case '/':
        firstOperand = '1';
        break;
    }
  }

  if (secondOperand === '') {
    switch (operation) {
      case '+':
      case '-':
        secondOperand = '0';
        break;
      case '*':
      case '/':
        secondOperand = '1';
        break;
    }
  }

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

const resetStateMachine = () => {
  firstOperand = '';
  operation = '';
  secondOperand = '';
  updateDisplay('');
  document.querySelector('.display').style.fontSize = defaultDisplayFontSize;
  state = 'firstNumber';
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
