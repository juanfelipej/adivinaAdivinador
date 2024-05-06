const scriptURL = 'https://script.google.com/macros/s/AKfycbwhN7rhMwCp341L7JDe2BvTvH3joBQR9QWGmrEohbOrLELHe-6DOgPgfCZDpBvBs9aHJA/exec';

const form = document.forms['contact-form'];

form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => {
    if (response.ok) {
      alert("Thank you! Your form is submitted successfully.");
      window.location.href = 'https://juanfelipej.github.io/adivinaAdivinador/confirmacion.html'; // Redirige a la página de confirmación
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch(error => console.error('Error!', error.message));
});
