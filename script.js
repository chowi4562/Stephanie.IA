document.addEventListener("DOMContentLoaded", function () {
  var elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  }
});

function sendMessage() {
  var userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  var chatContainer = document.getElementById("chat-container");
  var chat = document.getElementById("chat");

  var userMessage = document.createElement("div");
  userMessage.className = "message user";
  userMessage.innerHTML = userInput;
  chat.appendChild(userMessage);

  var iaResponse = getIAResponse(userInput);
  var multimediaSrc = getMultimediaForResponse(iaResponse);

  var iaMessage = document.createElement("div");
  iaMessage.className = "message ia";
  chat.appendChild(iaMessage);

  animateTyping(iaMessage, iaResponse, multimediaSrc);

  document.getElementById("user-input").value = "";

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function resetChat() {
  location.reload();
}

function toggleDarkMode() {
  var body = document.body;
  body.classList.toggle("dark-mode");
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

function getIAResponse(userInput) {
  var lowerInput = userInput.toLowerCase();

  if (lowerInput.includes("resumen") || lowerInput.includes("rsumen") || lowerInput.includes("rsmen")) {
    return "Claro, aquí tienes los requisitos: 1) Debes separar por párrafos (párrafo 1, párrafo 2, etc.). 2) Debes decirme hasta qué párrafo quieres que resuma.";
  } else {
    return realizarOperacionMatematica(lowerInput);
  }
}

function realizarOperacionMatematica(userInput) {
  var operacion = userInput.match(/[0-9]+[\+\-\*\/]+[0-9]+/);

  if (operacion) {
    try {
      var resultado = eval(operacion[0]);
      return `El resultado es: ${resultado}`;
    } catch (error) {
      return "Lo siento, no pude calcular eso. Por favor, asegúrate de ingresar una expresión matemática válida.";
    }
  }

  return "Lo siento, no pude entender la expresión matemática. Por favor, asegúrate de ingresar una operación válida.";
}

function getMultimediaForResponse(response) {
  return `<video src="default.mp4" loop autoplay muted style="width: 200px;"></video>`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Agrega aquí el código para inicializar la página
});

function handleModeChange(mode) {
  var chat = document.getElementById("chat");
  var message = document.createElement("div");
  message.className = "message ia";

  switch (mode) {
    case "normal":
      message.innerHTML = "Modo Normal Activado";
      break;
    case "expense-manager":
      message.innerHTML = "Modo Administrador de Gastos Activado";
      showExpenseManager();
      break;
    case "admin-tiempo":
      message.innerHTML = "Modo Administrador de Tiempo Activado";
      showTimeManager();
      break;
    case "calculadora": // Nuevo caso para "Calculadora"
      message.innerHTML = "Modo Calculadora Activado";
      showCalculator(); // Llama a la función correspondiente para mostrar la calculadora
      break;
    case "ordenador": // Nuevo caso para "Ordenador"
      message.innerHTML = "Modo Ordenador Activado";
      showOrdenador(); // Llama a la función correspondiente para mostrar el ordenador
      break;
    default:
      message.innerHTML = "Modo Desconocido Seleccionado";
  }

  chat.appendChild(message);
}

// Agrega la función showCalculator para mostrar la calculadora
function showCalculator() {
  var chat = document.getElementById("chat");
  var calculator = document.createElement("div");
  calculator.className = "calculator";
  calculator.innerHTML = `
    <p class="title">Calculadora</p>
    <!-- Agrega aquí el contenido de la calculadora -->
  `;
  chat.appendChild(calculator);
}

function showExpenseManager() {
  var chat = document.getElementById("chat");
  var expenseManager = document.createElement("div");
  expenseManager.className = "expense-manager";
  expenseManager.innerHTML = `
    <p class="title">Administrador de Gastos</p>
    <div class="budget-container">
      <label for="budget">Presupuesto:</label>
      <input type="number" id="budget">
    </div>
    <div class="expenses-container">
      ${generateExpenseInputs()}
    </div>
    <button class="calculate-button" onclick="calculateSavings()">Calcular</button>
  `;
  chat.appendChild(expenseManager);
}

function generateExpenseInputs() {
  var inputs = "";
  for (var i = 1; i <= 16; i++) {
    inputs += `
      <div class="expense-input">
        <label for="expense-${i}">Nombre del Gasto ${i}:</label>
        <input type="text" id="expense-${i}">
        <label for="price-${i}">Precio:</label>
        <input type="number" id="price-${i}">
      </div>
    `;
  }
  return inputs;
}

function calculateSavings() {
  var budget = parseFloat(document.getElementById("budget").value) || 0;
  var remainingBudget = calculateTotalSavings(budget);

  var savingsMessage = getSavingsMessage(remainingBudget, budget);
  var multimediaSrc = getMultimediaForSavings(remainingBudget, budget);

  var chat = document.getElementById("chat");
  var savingsMessageElement = document.createElement("div");
  savingsMessageElement.className = "message ia";
  chat.appendChild(savingsMessageElement);

  animateTyping(savingsMessageElement, savingsMessage, multimediaSrc);
}

function calculateTotalSavings(budget) {
  var remainingBudget = budget;

  for (var i = 1; i <= 16; i++) {
    var expense = parseFloat(document.getElementById(`expense-${i}`).value) || 0;
    var price = parseFloat(document.getElementById(`price-${i}`).value) || 0;

    remainingBudget -= price;
  }

  return remainingBudget;
}

function getSavingsMessage(remainingBudget, budget) {
  var totalSavings = budget - remainingBudget;
  return `Total gastado: $${totalSavings.toFixed(2)}, Ahorrado: $${remainingBudget.toFixed(2)}`;
}

function getMultimediaForSavings(remainingBudget, budget) {
  if (remainingBudget >= budget * 0.7) {
    return `<video src="celebration.mp4" loop autoplay muted style="width: 200px;"></video>`;
  } else if (remainingBudget >= budget * 0.5) {
    return `<video src="support.mp4" loop autoplay muted style="width: 200px;"></video>`;
  } else if (remainingBudget > 0) {
    return `<video src="sadness.mp4" loop autoplay muted style="width: 200px;"></video>`;
  } else {
    return `<video src="no-savings.mp4" loop autoplay muted style="width: 200px;"></video>`;
  }
}
