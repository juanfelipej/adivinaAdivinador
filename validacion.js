function validarFormulario() {
    // Validar nombre y apellidos
    var nombreInput = document.getElementById('nombre');
    var nombre = nombreInput.value.trim();
    if (!/^[a-zA-Z\s]+$/.test(nombre)) {
        alert('Por favor, ingresa solo letras en el campo de Nombre y Apellidos.');
        nombreInput.focus();
        return false;
    }

    // Validar cédula
    var cedulaInput = document.getElementById('cedula');
    var cedula = cedulaInput.value.trim();
    if (!/^\d{6,}$/.test(cedula)) {
        alert('La cédula debe contener al menos 6 dígitos numéricos.');
        cedulaInput.focus();
        return false;
    }

    // Validar número de celular
    var celularInput = document.getElementById('celular');
    var celular = celularInput.value.trim();
    if (!/^\d{10}$/.test(celular)) {
        alert('El número de celular debe contener 10 dígitos numéricos.');
        celularInput.focus();
        return false;
    }

    // Resto de validaciones...

    return true; // Si todas las validaciones pasan, se envía el formulario
}
