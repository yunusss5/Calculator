const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const currentValue = display.value;
        const lastChar = currentValue[currentValue.length - 1];

        if (button.classList.contains('clear')) {
            display.value = '';
        } else if (button.classList.contains('backspace')) {
            display.value = display.value.slice(0, -1);
        } else if (button.classList.contains('operator')) {
            const iconClassList = button.querySelector('i').classList;
            let operator = '';

            if (iconClassList.contains('fa-divide')) {
                operator = '/';
            } else if (iconClassList.contains('fa-xmark')) {
                operator = '*';
            } else if (iconClassList.contains('fa-minus')) {
                operator = '-';
            } else if (iconClassList.contains('fa-plus')) {
                operator = '+';
            } else if (iconClassList.contains('fa-percent')) {
                operator = '%';
            }

            if (['/', '*', '-', '+', '%'].includes(lastChar)) {
                display.value = currentValue.slice(0, -1) + operator;
            } else {
                display.value += operator;
            }
        } else if (button.id === 'equals') {
            try {
                display.value = evaluateExpression(display.value);
            } catch (error) {
                display.value = 'Error';
            }
        } else {
            display.value += button.textContent;
        }
    });
});

function evaluateExpression(expression) {
    // Replace all occurrences of 'x' with '*' for multiplication
    expression = expression.replace(/x/g, '*');
    // Replace all occurrences of '%' with '/100'
    expression = expression.replace(/%/g, '/100');
    
    // Use the built-in Function constructor to safely evaluate the expression
    const result = Function('return ' + expression)();
    return result;
}
