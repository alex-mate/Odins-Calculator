const displayText = document.querySelector("#display-text");
const displayBox = document.querySelector("#display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const backspaceButton = document.querySelector("#backspace");
const mathErrorMessage = "Math Error";

let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return mathErrorMessage;
  return num1 / num2;
}

function operate(num1, operator, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return "Error";
  }
}

function formatResult(value) {
  if (value === mathErrorMessage || value === "Error") return value;

  let rounded = Math.round(value * 1000000) / 1000000;
  let stringValue = String(rounded);

  if (stringValue.length > 12) {
    return Number(rounded).toExponential(5);
  }

  return stringValue;
}

function updateDisplay(value) {
  displayText.textContent = value;
  displayBox.scrollLeft = displayBox.scrollWidth;
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      displayText.textContent === "0" ||
      shouldResetDisplay ||
      isInvalidDisplayValue()
    ) {
      updateDisplay(button.dataset.number);
      shouldResetDisplay = false;
    } else {
      updateDisplay(displayText.textContent + button.dataset.number);
    }
  });
});

function handleDecimal() {
  if (shouldResetDisplay || isInvalidDisplayValue()) {
    updateDisplay("0.");
    shouldResetDisplay = false;
    return;
  } else if (!displayText.textContent.includes(".")) {
    updateDisplay(displayText.textContent + ".");
  }
}

function backSpace() {
  if (shouldResetDisplay || isInvalidDisplayValue()) {
    return;
  }

  const newValue = displayText.textContent.slice(0, -1);

  if (newValue === "" || newValue === "-") {
    updateDisplay("0");
    return;
  }

  updateDisplay(newValue);
}

function isInvalidDisplayValue() {
  return (
    displayText.textContent === mathErrorMessage ||
    displayText.textContent === "Error" ||
    displayText.textContent === "Infinity" ||
    displayText.textContent === "NaN"
  );
}
// chaining operations without pressing equals
function evaluate() {
  if (operator === "" && !shouldResetDisplay) {
    return;
  }
  secondNumber = displayText.textContent;

  const result = operate(Number(firstNumber), operator, Number(secondNumber));
  firstNumber = displayText.textContent;
  updateDisplay(formatResult(result));
}
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (isInvalidDisplayValue()) return;

    if (operator !== "" && !shouldResetDisplay) {
      evaluate();
    }

    firstNumber = displayText.textContent;
    operator = button.dataset.operator;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", () => {
  secondNumber = displayText.textContent;
  const result = operate(Number(firstNumber), operator, Number(secondNumber));
  updateDisplay(formatResult(result));
});

clearButton.addEventListener("click", () => {
  updateDisplay("0");
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
});

decimalButton.addEventListener("click", handleDecimal);

backspaceButton.addEventListener("click", backSpace);
