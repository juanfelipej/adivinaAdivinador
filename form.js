const scriptURL = 'https://script.google.com/macros/s/AKfycbxZZxgqYxUYp7lK3fk34Yo4WQ7AGb5PzO-me0qcsV-Jzk3T9MiBWRRQGY2kzGorKRlpYQ/exec';

const form = document.forms['contact-form'];
const overlay = document.getElementById('overlay');
const loadingIndicator = document.getElementById('loading-indicator');

form.addEventListener('submit', e => {
  e.preventDefault();

  const dia = form.elements['dia'].value.padStart(2, '0');
  const mes = form.elements['mes'].value.padStart(2, '0');
  const anio = form.elements['anio'].value;
  const otro = form.elements['otroInput'].value; 

  const fecha = `${anio}-${mes}-${dia}`;
  
  // Calcular la edad basada en la fecha de nacimiento
  const fechaNacimiento = new Date(`${mes}/${dia}/${anio}`);
  const edad = Math.floor((new Date() - fechaNacimiento) / 3.15576e+10); // 3.15576e+10 es la cantidad de milisegundos en un año
  const esMayorDeEdad = edad >= 21;

  var opacidadElement = document.getElementById('opacidad');
  var ageErrorElement = document.getElementById('age-error');

  // Verificar si es mayor de edad
  if (!esMayorDeEdad) {
    opacidadElement.classList.remove('noneDisplay');
    opacidadElement.classList.add('backdrop');
    ageErrorElement.classList.remove('noneDisplay');
    ageErrorElement.classList.add('popup');
    return; // No se envía el formulario si es menor de edad
  }

  const formData = new FormData(form);
  formData.set('fecha', fecha);

  const apuesta = formData.get('apuesta');

  if(apuesta==="Otro"){
    formData.set('apuesta', otro);
  }

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

// Manejar el evento del botón para recargar la página
document.getElementById('reload-page').addEventListener('click', () => {
  location.reload();
});
