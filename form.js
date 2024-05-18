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
