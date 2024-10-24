const form = document.getElementById('contactForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Evitar el envío estándar del formulario

    let isValid = true;

    // Validaciones
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    const nombreError = document.getElementById('nombreError');
    const emailError = document.getElementById('emailError');
    const telefonoError = document.getElementById('telefonoError');
    const mensajeError = document.getElementById('mensajeError');

    // Limpiar mensajes de error
    nombreError.textContent = '';
    emailError.textContent = '';
    telefonoError.textContent = '';
    mensajeError.textContent = '';

    // Validar nombre
    if (nombre.trim() === '') {
        isValid = false;
        nombreError.textContent = 'El nombre completo es requerido.';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        isValid = false;
        emailError.textContent = 'Por favor, ingresa un email válido.';
    }

    // Validar teléfono
    if (telefono.trim() === '') {
        isValid = false;
        telefonoError.textContent = 'El teléfono es requerido.';
    }

    // Validar mensaje
    if (mensaje.trim() === '') {
        isValid = false;
        mensajeError.textContent = 'El mensaje no puede estar vacío.';
    }

    // Si las validaciones son correctas
    if (isValid) {
        const formData = new FormData(form);

        // Enviar los datos al servidor PHP para el correo
        fetch('form/formulario.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            // Mostrar mensaje de éxito si el correo fue enviado
            form.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
        })
        .catch(error => {
            console.error('Error en el envío del correo:', error);
        });
    }
});
