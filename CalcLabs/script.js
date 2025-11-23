// ***************======================= Calculator JS Logic ====================************** // 

const Nums = document.getElementById("keys");
const output = document.getElementById("output");

let current = '0';
let previous = null;
let operator = null;

// ======================= Display/Update Result ==================== // 

const updateDisplay = () => {
    output.textContent = current || '0';
};
// ======================= Input Digit Func ==================== // 

const pressDigit = (d) => {
    if (current === '0') current = d;
    else current += d;
    updateDisplay();
};
// ======================= Decimal managing Func ==================== // 

const pressDecimal = () => {
    if (!current.includes('.')) {
        current += '.';
        updateDisplay();
    }
};
// ======================= Delete Func ==================== // 

const pressDEL = () => {
    if (current.length <= 1) current = '0';
    else current = current.slice(0, -1);
    updateDisplay();
};
// ======================= ALL Clear Func ==================== // 

const pressAC = () => {
    current = '0';
    previous = null;
    operator = null;
    updateDisplay();
};
// ======================= Caculate Function ==================== // 

const computeResult = () => {
    if (previous === null || operator === null) return;
    
    const a = parseFloat(previous);
    const b = parseFloat(current);
    let result = 0;

    switch (operator) {
        case '+':      result = a + b;
            break;
        case '-':      result = a - b;
            break;
        case '*':      result = a * b;
            break;
        case '÷': result = b === 0 ? 'Error Cant Divide By Zero' : a / b;
            break;
        case '%':     result = a % b;
            break;
        case '^':      result = Math.pow(a, b);
            break;
        default: return;
    }

    if (typeof result === 'number' && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(10));
    }


    current = String(result);
    previous = null;
    operator = null;
    updateDisplay();
};
// ======================= Oprators handling Func ==================== // 

const pressOperator = (op) => {
    if (previous !== null && operator !== null) {
        computeResult();
    }
    else {
        previous = current;
    }
    operator = op;
    current = '0';
};

// ======================= Central Event Handler ==================== // 

Nums.addEventListener("click", (e) => {
    const key = e.target.textContent.trim();
// ======================= Handle if nothing Pressed ==================== // 
    if (!key) return;
// ======================= Handle Digits ==================== // 
    if (/^[0-9]$/.test(key)) {
        pressDigit(key);
        return;
    }
// ======================= Handle Decimals ==================== // 
    if (key === '.') {
        pressDecimal();
        return;
    }
// ======================= Operators ==================== // 
    if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%' || key === '^' || key === '÷') {
        pressOperator(key);
        return;
    }
// ======================= All Clear ==================== // 
    if (key.toUpperCase() === 'AC') {
        pressAC();
        return;
    }
// ======================= Delete ==================== // 
    if (key.toUpperCase() === 'DEL') {
        pressDEL();
        return;
    }
// ======================= Euals ==================== // 
    if (key === '=') {
        computeResult();
        return;
    }
} );

updateDisplay();