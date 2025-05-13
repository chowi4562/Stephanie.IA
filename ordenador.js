document.addEventListener("DOMContentLoaded", function () {
  // You can add the necessary code here to initialize the page
});

function showOrdenador() {
  var chat = document.getElementById("chat");
  var ordenador = document.createElement("div");
  ordenador.className = "ordenador";
  ordenador.innerHTML = `
    <p class="title">Number Sorter</p>
    <div class="input-container">
      <label for="numbers">Enter numbers separated by commas:</label>
      <input type="text" id="numbers" placeholder="E.g. 5, 2, 8, 1">
    </div>
    <button class="order-button" onclick="orderNumbers(true)">Sort Descending</button>
    <button class="order-button" onclick="orderNumbers(false)">Sort Ascending</button>
    <div class="result-container" id="result-container"></div>
  `;
  chat.appendChild(ordenador);
}

function orderNumbers(descending) {
  var inputElement = document.getElementById("numbers");
  var resultContainer = document.getElementById("result-container");

  var numbers = inputElement.value.split(",").map(Number);

  if (numbers.some(isNaN)) {
    resultContainer.innerHTML = "Please enter valid numbers.";
    return;
  }

  if (descending) {
    numbers.sort(function (a, b) {
      return b - a;
    });
  } else {
    numbers.sort(function (a, b) {
      return a - b;
    });
  }

  resultContainer.innerHTML = `Sorted numbers: ${numbers.join(", ")}`;
}
