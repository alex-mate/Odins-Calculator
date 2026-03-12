const display = document.querySelector("#display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const decimalButton = document.querySelector("#decimal");
const backspaceButton = document.querySelector("#backspace");
const errorMessage = "Math Error";

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
  if (num2 === 0) return errorMessage;
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

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (
      display.textContent === "0" ||
      shouldResetDisplay ||
      display.textContent === "Math Error"
    ) {
      display.textContent = button.dataset.number;
      shouldResetDisplay = false;
    } else {
      display.textContent += button.dataset.number;
    }
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    firstNumber = display.textContent;
    operator = button.dataset.operator;
    shouldResetDisplay = true;
  });
});

equalsButton.addEventListener("click", () => {
  secondNumber = display.textContent;
  const result = operate(Number(firstNumber), operator, Number(secondNumber));
  display.textContent = result;
});

clearButton.addEventListener("click", () => {
  display.textContent = "0";
  firstNumber = "";
  secondNumber = "";
  operator = "";
  shouldResetDisplay = false;
});
