const numbers = Array.from(document.getElementsByClassName('digits'));
const screen = document.querySelector('#display');
const operation = Array.from(document.getElementsByClassName('operator'));
const calculate = document.querySelector('.equals');
const cleared = document.querySelector('.clearAll');
const clearEntry = document.querySelector('.backspace')
const decimal = document.querySelector('.decimal')
const opScreen = document.querySelector('#calcDisplay');

let a = null;
let b = null;
let operator = '';
let maxLength = 14;

function add(a, b) {return parseFloat(a) + parseFloat(b)}
function subtract(a, b) {return a - b}
function divide(a, b) {return a / b}
function multiply(a, b) {return a * b}

/*
back() functions allows to clear a single number from entry 
*/
function back() {
    clearEntry.addEventListener('click', () => {
    screen.textContent = screen.textContent.substring(0, screen.textContent.length - 1);
    
    if (a == null || operator == '') {
        a = screen.textContent
    } else {
        b = screen.textContent
    }
    })
}
back()

/*
clearAll() function clears all data in calculator, operators & operands
*/
function clearAll() {
    cleared.addEventListener('click', () => {
        a = null;
        b = null;
        operator = '';
        screen.textContent = '';
        opScreen.textContent = '';
    })
}
clearAll()


/*
calculates two numbers with any given operator
*/
function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b)
        case '-':
            return subtract(a, b)
        case '*':
            return multiply(a, b)
        case '/':
            if (b == 0) {
                return 'LOL'
            }
            return divide(a, b)
    }
}

/*
calc() lets the '=' button display calculations on calculator screen
*/
function calc() {
    calculate.addEventListener('click', () => {

    if (a != null && operator != '' && b != null && screen.textContent.includes('.') == false) {
        a = operate(operator, a, b)
        screen.textContent = a
        opScreen.textContent = ''
        b = null
        operator = ''
    } else if (a != null && operator != '' && b != null && screen.textContent.includes('.') == true) {
        a = operate(operator, a, b)
        screen.textContent = a.toFixed(2)
        opScreen.textContent = ''
        b = null
        operator = ''
    } else {return}
    })
}
calc()

/*
function allows user to string together calculations without having to press '=' each time
*/
operation.forEach(op => {
    op.addEventListener('click', (e) => {


    if (a != null && operator == '') {
    operator = e.target.value
    screen.textContent = ''
    } else if (a != null && operator != '' && b != null) {
        a = operate(operator, a, b)
        screen.textContent = ''
        let newOperator = e.target.textContent
        opScreen.textContent = a + ' ' + newOperator
        operator = e.target.value
        b = null
    }
    })
});

/*
updates calculator screen with each number button click upto maxLength
*/
numbers.forEach(num => {
    num.addEventListener('click', (e) => {
    let display = e.target.value

    if (screen.textContent.length >= maxLength == true) {
        screen.textContent == display
    } else {
        screen.textContent += display
    }

    if (a == null || operator == '') {
        a = screen.textContent
    } else  if (a != null && operator != '') {
        b = screen.textContent
    }
    })
});

/*
decimal button does what you think it does
*/
function decimalBtn() {
    decimal.addEventListener('click', (e) => {

        let dec = e.target.textContent

        if (screen.textContent === '') {
            screen.textContent += '0.'
        } else if (screen.textContent.includes(dec) == false) {
            screen.textContent += '.'
        }
    })
}

decimalBtn()
