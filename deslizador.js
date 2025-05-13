// Función para desplazar el chat basado en el valor del deslizador
function scrollChat(value) {
    const chat = document.getElementById('chat');
    const maxScrollTop = chat.scrollHeight - chat.clientHeight;
    const scrollPosition = (value / 100) * maxScrollTop;
    chat.scrollTop = scrollPosition;
  }
  
  // Función para actualizar el deslizador cuando se agreguen mensajes
  function updateSlider() {
    const chat = document.getElementById('chat');
    const slider = document.getElementById('scroll-slider'); // Asegurarse de que sea scroll-slider
    const maxScrollTop = chat.scrollHeight - chat.clientHeight;
    const scrollPosition = chat.scrollTop;
  
    // Actualizar la posición del deslizador basado en la posición del scroll
    slider.value = (scrollPosition / maxScrollTop) * 100;
  }
  
  // Función para reiniciar el chat
  function resetChat() {
    const chat = document.getElementById('chat');
    chat.innerHTML = '';
    updateSlider();
  }
  
  // Opcional: Inicializar el deslizador en la carga de la página
  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('scroll-slider');
    if (slider) {
      slider.value = 50; // Valor por defecto
      scrollChat(slider.value);
    }
  });
  