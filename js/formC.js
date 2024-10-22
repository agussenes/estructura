const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el envío estándar del formulario

    // Validaciones aquí (si deseas agregar alguna adicional)
    let isValid = true;

    // Validar Nombre Completo
    const nombre = document.getElementById('nombre');
    const nombreError = document.getElementById('nombreError');
    if (nombre.value.trim() === '') {
        nombreError.textContent = 'El nombre completo es requerido.';
        isValid = false;
    } else {
        nombreError.textContent = '';
    }

    // Validar Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        emailError.textContent = 'Por favor, ingresa un email válido.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Validar Teléfono
    const telefono = document.getElementById('telefono');
    const telefonoError = document.getElementById('telefonoError');
    if (telefono.value.trim() === '') {
        telefonoError.textContent = 'El teléfono es requerido.';
        isValid = false;
    } else {
        telefonoError.textContent = '';
    }

    // Validar Mensaje
    const mensaje = document.getElementById('mensaje');
    const mensajeError = document.getElementById('mensajeError');
    if (mensaje.value.trim() === '') {
        mensajeError.textContent = 'El mensaje no puede estar vacío.';
        isValid = false;
    } else {
        mensajeError.textContent = '';
    }

    // Si todo es válido, enviar los datos mediante AJAX
    if (isValid) {
        const formData = new FormData(form);

        // Enviar los datos mediante fetch
        fetch('form/formulario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Ocultar el formulario y mostrar el mensaje de éxito
            form.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});