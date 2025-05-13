document.addEventListener("DOMContentLoaded", function () {
  // You can add the necessary code here to initialize the page
});

function showCalculator() {
  var chat = document.getElementById("chat");
  var calculator = document.createElement("div");
  calculator.className = "calculator";
  calculator.innerHTML = `
    <p class="title">Calculator</p>
    <div class="calculator-screen" id="calculator-screen">0</div>
    <div class="calculator-buttons">
      <button onclick="appendNumber('7')">7</button>
      <button onclick="appendNumber('8')">8</button>
      <button onclick="appendNumber('9')">9</button>
      <button onclick="setOperation('+')">+</button>
      <button onclick="appendNumber('4')">4</button>
      <button onclick="appendNumber('5')">5</button>
      <button onclick="appendNumber('6')">6</button>
      <button onclick="setOperation('-')">-</button>
      <button onclick="appendNumber('1')">1</button>
      <button onclick="appendNumber('2')">2</button>
      <button onclick="appendNumber('3')">3</button>
      <button onclick="setOperation('*')">*</button>
      <button onclick="appendNumber('0')">0</button>
      <button onclick="clearScreen()">C</button>
      <button onclick="calculateResult()">=</button>
      <button onclick="setOperation('/')">/</button>
    </div>
  `;
  chat.appendChild(calculator);
}

function appendNumber(number) {
  var screen = document.getElementById("calculator-screen");
  if (screen.textContent === '0') {
    screen.textContent = number;
  } else {
    screen.textContent += number;
  }
}

function setOperation(operator) {
  var screen = document.getElementById("calculator-screen");
  screen.textContent += ` ${operator} `;
}

function clearScreen() {
  var screen = document.getElementById("calculator-screen");
  screen.textContent = '0';
}

function calculateResult() {
  var screen = document.getElementById("calculator-screen");
  try {
    var result = eval(screen.textContent);
    screen.textContent = result;
  } catch (error) {
    screen.textContent = 'Error';
  }
}

function animateTyping(element, text, multimediaSrc) {
  var words = text.split(" ");
  var index = 0;

  function type() {
    if (index < words.length) {
      element.innerHTML += words[index] + " ";
      index++;
      setTimeout(type, 50);
    } else {
      element.innerHTML += `<p>${multimediaSrc}</p>`;
    }
  }

  type();
}
