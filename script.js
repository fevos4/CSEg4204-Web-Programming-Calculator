const display = document.getElementById("display");
let lastInput = ""; // Tracks the last input character
let decimalAdded = false; // Tracks if a decimal point has been added

function appendToDisplay(input) {
  // Reset display if current value is 0 or error
  if (display.value === "0" || display.value === "Error" || display.value === "Error: Division by 0") {
    display.value = input;
  } else {
    display.value += input;
  }
  lastInput = input;

  // Update decimalAdded status
  if (input === ".") {
    decimalAdded = true;
  } else if (["+","-","*","/"].includes(input)) {
    decimalAdded = false; // Reset for next number
  }
}

function clearDisplay() {
  display.value = "0";
  decimalAdded = false;
}

function calculate() {
  const expression = display.value;

  try {
    // Split numbers and operators while keeping the decimal points in mind
    const numbers = expression.split(/[\+\-\*\/]/g).map(Number);
    const operators = expression.split(/[0-9\.]+/g).filter(op => op);

    let result = numbers[0];

    for (let i = 0; i < operators.length; i++) {
      const operator = operators[i];
      const nextNumber = numbers[i + 1];

      if (operator === '+') {
        result += nextNumber;
      } else if (operator === '-') {
        result -= nextNumber;
      } else if (operator === '*') {
        result *= nextNumber;
      } else if (operator === '/') {
        if (nextNumber === 0) {
          display.value = "Error: Division by 0";
          return;
        }
        result /= nextNumber;
      }
    }

    display.value = result;
    decimalAdded = false;
  } catch (error) {
    display.value = "Error";
  }
}

function appendDecimal() {
  if (!decimalAdded) {
    if (lastInput === "" || isNaN(lastInput)) {
      appendToDisplay("0.");
    } else {
      appendToDisplay(".");
    }
    decimalAdded = true;
  }
}
