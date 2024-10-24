// Función para enviar los datos a través del proxy PHP
function enviarDatosAGoogleSheets() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Evita el envío tradicional del formulario

        let isValid = true;

        // Obtener valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
        const mensaje = document.getElementById('mensaje').value;

        // Aquí podrías agregar validaciones adicionales si es necesario
        // ...

        if (isValid) {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('email', email);
            formData.append('telefono', telefono);
            formData.append('mensaje', mensaje);

            // Enviar los datos al archivo proxy.php
            fetch("https://tudominio.com/proxy.php", {  // Cambia por la URL real de tu archivo proxy.php
                method: "POST",
                body: formData
            })
            .then(response => response.json())  // Procesar la respuesta JSON
            .then(result => {
                if (result.status === 'success') {
                    console.log("Datos enviados a Google Sheets:", result);
                    document.getElementById('successMessage').style.display = 'block';  // Muestra mensaje de éxito
                } else {
                    console.error("Error en la respuesta:", result.message);
                }
            })
            .catch(error => {
                console.error("Error al enviar los datos al proxy PHP:", error);
            });
        }
    });
}

// Llamar a la función para enviar a Google Sheets cuando se cargue la página
enviarDatosAGoogleSheets();
