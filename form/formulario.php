<?php
// Clave secreta de reCAPTCHA
$secretKey = "6Lfw6mgqAAAAAMJV4jckv8avwHiERPapRtrkWxmp";  // Cambia esto por tu clave secreta

// Recibir datos del formulario
$nombre = htmlspecialchars(trim($_POST['nombre']));
$email = htmlspecialchars(trim($_POST['email']));
$telefono = htmlspecialchars(trim($_POST['telefono']));
$mensaje = htmlspecialchars(trim($_POST['mensaje']));
$recaptchaResponse = $_POST['g-recaptcha-response'];  // Capturamos la respuesta del reCAPTCHA

// Validar que no haya campos vacíos
if (empty($nombre) || empty($email) || empty($telefono) || empty($mensaje)) {
    echo 'Por favor completa todos los campos.';
    exit;
}

// Validar reCAPTCHA
$verifyResponse = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaResponse");
$responseData = json_decode($verifyResponse);

if (!$responseData->success) {
    echo 'Por favor, verifica que no eres un robot.';
    exit;
}

// Aquí procesas el formulario si el reCAPTCHA fue exitoso
$destino = "info@inovandodes.com";  // Cambia esto con tu dirección de correo
$asunto = "Nuevo mensaje del formulario de contacto";

// Crear el cuerpo del email para el administrador
$cuerpo = "Has recibido un nuevo mensaje de contacto:\n\n";
$cuerpo .= "Nombre: $nombre\n";
$cuerpo .= "Email: $email\n";
$cuerpo .= "Teléfono: $telefono\n";
$cuerpo .= "Mensaje:\n$mensaje\n";

// Enviar email al administrador
$headers = "From: noreply@inovandodes.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

mail($destino, $asunto, $cuerpo, $headers);

// Enviar correo de confirmación al usuario
$asuntoConfirmacion = "Confirmación de envío de mensaje";
$cuerpoConfirmacion = "Hola $nombre,\n\n";
$cuerpoConfirmacion .= "Gracias por ponerte en contacto con nosotros. Hemos recibido tu mensaje y te responderemos pronto.\n\n";
$cuerpoConfirmacion .= "Tu mensaje fue:\n$mensaje\n\n";
$cuerpoConfirmacion .= "Saludos,\nEl equipo de soporte.";

// Encabezados para el correo de confirmación al usuario
$headersConfirmacion = "From: noreply@inovandodes.com\r\n";
$headersConfirmacion .= "Reply-To: info@inovandodes.com\r\n";
$headersConfirmacion .= "MIME-Version: 1.0\r\n";
$headersConfirmacion .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headersConfirmacion .= "X-Mailer: PHP/" . phpversion();

mail($email, $asuntoConfirmacion, $cuerpoConfirmacion, $headersConfirmacion);

// Responder un mensaje de éxito
echo 'Mensaje enviado con éxito';
?>
