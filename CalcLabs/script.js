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
        case '+': result = a + b;
            break;
        case '-': result = a - b;
            break;
        case '*': result = a * b;
            break;
        case '÷': result = b === 0 ? 'Error Cant Divide By Zero' : a / b;
            break;
        case '%': result = a % b;
            break;
        case '^': result = Math.pow(a, b);
            break;
        default: return;
    }

    if (typeof result === 'number' && !Number.isInteger(result)) {
        result = parseFloat(result.toFixed(8));
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
    output.textContent += op;
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
        // updateDisplay();
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
});

updateDisplay();

// ***************======================= Converter JS Logic ====================************** // 

//  =====================Area Converter================ //
{
    const areaToSqMeter = {
        Acre: 4046.8564224,
        Are: 100,
        Hectare: 10000,
        SqCm: 0.0001,
        SqFoot: 0.092903,
        SqInch: 0.00064516
    };
    const convertVal = () => {
        const areaInput = document.getElementById("ar1").value;
        const convFrom = document.getElementById("area1").value;
        const convTo = document.getElementById("area2").value;

        const valInSqM = parseFloat(areaInput) * areaToSqMeter[convFrom];
        const toResult = valInSqM / areaToSqMeter[convTo];

        document.getElementById("Converted").innerHTML = `${areaInput} ${convFrom} = <b>${toResult}</b> ${convTo}`;
    };

    document.getElementById("ar1").addEventListener("input", convertVal);
    document.getElementById("area1").addEventListener("change", convertVal);
    document.getElementById("area2").addEventListener("change", convertVal);

}

//  =====================Length Converter================ //
{
    const lengthinMetre = {
        CentiMetre: 0.01,
        MilliMetre: 0.001,
        KiloMetre: 1000,
        Mile: 1609.344,
        Foot: 0.3048,
        Inch: 0.0254,
        Metre: 1
    };
    const convertVal = () => {
        const length = document.getElementById("lenVal").value;
        const unitFrom = document.getElementById("len1").value;
        const unitTo = document.getElementById("len2").value;

        const valConvert = parseFloat(length) * lengthinMetre[unitFrom];
        const result = valConvert / lengthinMetre[unitTo];

        document.getElementById("Converted2").innerHTML = `${length} ${unitFrom} = <b>${result}</b> ${unitTo}`;

    };

    document.getElementById("lenVal").addEventListener("input", convertVal);
    document.getElementById("len1").addEventListener("change", convertVal);
    document.getElementById("len2").addEventListener("change", convertVal);
}

//  =====================Volume Converter================ //
{
    const volumeInLitres = {
        Litre: 1,
        USGallon: 3.7854,
        UKGallon: 4.54609,
        CubicCM: 0.001,
        CubicM: 1000,
        CubicInch: 0.01638
    };

    const convertVal = () => {
        const volume = document.getElementById("volVal").value;
        const volFrom = document.getElementById("vol1").value;
        const volTo = document.getElementById("vol2").value;

        const valConvert = parseFloat(volume) * volumeInLitres[volFrom];
        const result = valConvert / volumeInLitres[volTo];

        document.getElementById("Converted3").innerHTML = `${volume} ${volFrom} = <b>${result}</b> ${volTo}`;
    };

    document.getElementById("volVal").addEventListener('input', convertVal);
    document.getElementById("vol1").addEventListener('change', convertVal);
    document.getElementById("vol2").addEventListener('change', convertVal);
}

// =====================Mass Converter================== //
{
    const massInKG = {
        KG: 1,
        Gram: 0.001,
        Ounce: 0.02834,
        Pound: 0.4535,
        Quintal: 100,
        Ton: 1000
    };

    const convertVal = () => {
        const length = document.getElementById("massVal").value;
        const unitFrom = document.getElementById("mass1").value;
        const unitTo = document.getElementById("mass2").value;

        const valConvert = parseFloat(length) * massInKG[unitFrom];
        const result = valConvert / massInKG[unitTo];

        document.getElementById("Converted4").innerHTML = `${length} ${unitFrom} = <b>${result}</b> ${unitTo}`;

    };

    document.getElementById("massVal").addEventListener("input", convertVal);
    document.getElementById("mass1").addEventListener("change", convertVal);
    document.getElementById("mass2").addEventListener("change", convertVal);
}

// ====================Speed Converter=================== //
{
    const speedInKMPH = {
        Kmph: 1,
        Kmps: 3600,
        Mph: 1.609,
        Mps: 0.0004469,
        mps: 3.6,
        Mach: 1225.073
    };

    const convertVal = () => {
        const length = document.getElementById("speedVal").value;
        const unitFrom = document.getElementById("speed1").value;
        const unitTo = document.getElementById("speed2").value;

        const valConvert = parseFloat(length) * speedInKMPH[unitFrom];
        const result = valConvert / speedInKMPH[unitTo];

        document.getElementById("Converted5").innerHTML = `${length} ${unitFrom} = <b>${result}</b> ${unitTo}`;

    };

    document.getElementById("speedVal").addEventListener("input", convertVal);
    document.getElementById("speed1").addEventListener("change", convertVal);
    document.getElementById("speed2").addEventListener("change", convertVal);
}
