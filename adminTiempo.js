document.addEventListener("DOMContentLoaded", function () {
  // Puedes agregar código necesario aquí para inicializar la página
});

function showTimeManager() {
  var chat = document.getElementById("chat");
  var timeManager = document.createElement("div");
  timeManager.className = "time-manager";
  timeManager.innerHTML = `
    <p class="title">Time Manager</p>
    <div class="day-container">
      ${generateTimeInputs()}
    </div>
    <button class="calculate-button" onclick="calculatePriorities()">Calculate</button>
  `;
  chat.appendChild(timeManager);

  // Añadir tabla gráfica editable
  var graphicTable = document.createElement("div");
  graphicTable.className = "graphic-table";
  graphicTable.innerHTML = generateGraphicTable();
  chat.appendChild(graphicTable);

  // Añadir canvas para dibujar la imagen
  var canvasContainer = document.createElement("div");
  canvasContainer.className = "canvas-container";
  canvasContainer.innerHTML = `
    <canvas id="scheduleCanvas" width="800" height="800" style="border:1px solid #000000;"></canvas>
    <button class="save-button" onclick="saveScheduleImage()">Save Schedule Image</button>
  `;
  chat.appendChild(canvasContainer);
}

function generateGraphicTable() {
  var table = '<table>';
  table += '<tr><th>Time</th><th>Activity</th></tr>';

  for (var i = 1; i <= 24; i++) {
    table += `
      <tr>
        <td><input type="text" id="time-${i}" value="${i}:00" style="width: 60px;" /></td>
        <td id="activity-${i}"></td>
      </tr>
    `;
  }

  table += '</table>';
  return table;
}

function generateTimeInputs() {
  var inputs = "";
  for (var i = 1; i <= 24; i++) {
    inputs += `
      <div class="time-input">
        <label for="event-${i}">Event at ${i}:00:</label>
        <input type="text" id="event-${i}" pattern="[0-9:]*" placeholder="E.g. Work">
        <label for="event-desc-${i}">Description:</label>
        <input type="text" id="event-desc-${i}" placeholder="Event details">
        <label for="event-end-${i}">Until:</label>
        <input type="text" id="event-end-${i}" pattern="[0-9:]*" placeholder="E.g. 14:00">
      </div>
    `;
  }
  return inputs;
}

function calculatePriorities() {
  var priorities = {
    work: [],
    personal: []
  };

  for (var i = 1; i <= 24; i++) {
    var eventName = document.getElementById(`event-${i}`).value.trim().toLowerCase();
    var eventDesc = document.getElementById(`event-desc-${i}`).value.trim();
    var eventEnd = document.getElementById(`event-end-${i}`).value.trim();
    var eventTime = document.getElementById(`time-${i}`).value.trim();

    if (eventName.includes("work") || eventName.includes("meeting") || eventName.includes("task")) {
      priorities.work.push({ hour: eventTime, name: eventName, desc: eventDesc, end: eventEnd });
    } else {
      priorities.personal.push({ hour: eventTime, name: eventName, desc: eventDesc, end: eventEnd });
    }
  }

  // Mostrar el resultado en la tabla gráfica con horas editadas
  for (var i = 1; i <= 24; i++) {
    var activityElement = document.getElementById(`activity-${i}`);
    if (activityElement) {
      var workEvent = priorities.work.find(event => event.hour === `${i}:00`);
      var personalEvent = priorities.personal.find(event => event.hour === `${i}:00`);

      if (workEvent) {
        activityElement.textContent = `${workEvent.name} (${workEvent.desc}) until ${workEvent.end}`;
      } else if (personalEvent) {
        activityElement.textContent = `${personalEvent.name} (${personalEvent.desc}) until ${personalEvent.end}`;
      }
    }
  }

  // Dibujar la imagen en el canvas
  drawScheduleImage();
}

function drawScheduleImage() {
  var canvas = document.getElementById('scheduleCanvas');
  var context = canvas.getContext('2d');
  var table = document.querySelector('.graphic-table table');

  // Limpiar el canvas antes de redibujar
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Configuración básica
  context.font = '14px Arial';
  context.textAlign = 'left';
  context.fillStyle = 'black';

  // Dibuja el encabezado
  context.fillText('Time', 50, 30);
  context.fillText('Activity', 150, 30);
  context.moveTo(40, 35);
  context.lineTo(600, 35);
  context.stroke();

  var rows = table.rows;
  for (var i = 1; i < rows.length; i++) {
    var time = rows[i].cells[0].querySelector('input').value;  // Obtener el valor del input editable
    var activity = rows[i].cells[1].textContent;
    context.fillText(time, 50, 30 + i * 30);
    context.fillText(activity, 150, 30 + i * 30);
  }
}

function saveScheduleImage() {
  var canvas = document.getElementById('scheduleCanvas');
  var link = document.createElement('a');
  link.href = canvas.toDataURL("image/png");
  link.download = 'schedule.png';
  link.click();
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
