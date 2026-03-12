function getNumbers() {
  let numberOne = Number(prompt("Enter the first number"));
  if (isNaN(numberOne)) {
    alert("Please enter a valid number");
    return;
  }

  let operator = prompt("Enter the operator");
  if (
    operator !== "+" &&
    operator !== "-" &&
    operator !== "*" &&
    operator !== "/"
  ) {
    alert("Please enter a valid operator");
    return;
  }

  let numberTwo = Number(prompt("Enter the second number"));
  if (isNaN(numberTwo)) {
    alert("Please enter a valid number");
    return;
  }

  const result = operate(numberOne, operator, numberTwo);
  alert("Result is: " + result);
}

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
  if (num2 === 0) {
    return "Cannot divide by zero";
  }
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
      return "Invalid operator";
  }
}

getNumbers();
