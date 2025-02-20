const keys = document.querySelector("#calculator-keys");
const display = document.querySelector("#calculator-display");

const history = [];

const clearHistory = () => (history.length = 0);
const addToHistory = (value) => history.push(value);
const removeLastFromHistory = () => history.pop();

const updateDisplay = (value) => (display.value = value);

const isNumberButton = (button) => !button.dataset?.action;
const isOperationButton = (button) => button.dataset?.action;

const addNumber = (value) => {
  addToHistory(value);
  updateDisplay(value);
};
const updateNumber = (value) => {
  updateDisplay(`${display.value}${value}`);
  removeLastFromHistory();
  addToHistory(display.value);
};
const addOperation = (value) => addToHistory(value);

const clearMemory = () => {
  updateDisplay(0);
  clearHistory();
};

const calculate = () => {
  if (history.length < 3) return;
  const [firstOperand, operator, secondOperated] = history;
  clearHistory();
  const result = mathOperations[operator](
    parseFloat(firstOperand),
    parseFloat(secondOperated)
  );
  return result;
};

const saveResult = (result) => {
  clearHistory();
  addToHistory(result);
  updateDisplay(result);
};

const mathOperations = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  multiply: (a, b) => a * b,
  division: (a, b) => a / b,
};

keys.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const { action } = e.target.dataset;
  const key = e.target.textContent.trim();

  if (isNumberButton(e.target)) {
    const changeNumber = history.length % 2 === 0 ? addNumber : updateNumber;
    changeNumber(key);
  } else if (isOperationButton(e.target) && action === "clear") {
    clearMemory();
  } else if (isOperationButton(e.target) && action === "decimal") {
  } else if (isOperationButton(e.target) && action === "equal") {
    const result = calculate();
    if (result !== undefined) saveResult(result);
  } else {
    if (history.length === 3) {
      const result = calculate();
      saveResult(result);
    }
    addOperation(action);
  }
});
