const scriptURL = 'https://script.google.com/macros/s/AKfycbz0jRkpBdGfh671Z0V4HCm3seBU8yYZT0mXzNK3eIu_VIgQs9k3Xhoamaf8AsN0w39YlQ/exec';

const form = document.forms['contact-form'];
const overlay = document.getElementById('overlay');
const loadingIndicator = document.getElementById('loading-indicator');

form.addEventListener('submit', e => {
  e.preventDefault();

  const dia = form.elements['dia'].value.padStart(2, '0');
  const mes = form.elements['mes'].value.padStart(2, '0');
  const anio = form.elements['anio'].value;

  const fecha = `${anio}-${mes}-${dia}`;

  const formData = new FormData(form);
  formData.set('fecha', fecha);

  // Obtener la fecha actual en el formato deseado (aaaa-mm-dd)
  const fechaActual = new Date();
  const fechaActualFormateada = `${fechaActual.getFullYear()}-${(fechaActual.getMonth() + 1).toString().padStart(2, '0')}-${fechaActual.getDate().toString().padStart(2, '0')}`;
  formData.set('fecha_actual', fechaActualFormateada);

  overlay.style.display = 'block';
  loadingIndicator.style.display = 'block';

  fetch(scriptURL, { method: 'POST', body: formData})
  .then(response => {
    if (response.ok) {
      window.location.href = 'https://juanfelipej.github.io/adivinaAdivinador/confirmacion.html';
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => console.error('Error!', error.message))
  .finally(() => {
    overlay.style.display = 'none';
    loadingIndicator.style.display = 'none';
  });
});
