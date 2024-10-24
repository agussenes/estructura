<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener los datos POST enviados desde el frontend
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $mensaje = $_POST['mensaje'] ?? '';

    // Crear un arreglo con los datos
    $data = [
        'nombre' => $nombre,
        'email' => $email,
        'telefono' => $telefono,
        'mensaje' => $mensaje,
    ];

    // Convertir los datos a JSON
    $jsonData = json_encode($data);

    // URL de tu Google Apps Script
    $url = 'https://script.google.com/macros/s/AKfycbygQ9xcEMiyG7O2KBxIDYYvurjxTjxrI25vdYgGl5rE4q5K1auNu6KifXdYixguhjwEHQ/exec';

    // Configurar la solicitud HTTP con cURL
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);

    // Ejecutar la solicitud
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    // Verificar si hubo algún error en la solicitud
    if ($httpCode === 200) {
        echo json_encode(['status' => 'success', 'message' => 'Datos enviados correctamente a Google Sheets']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Hubo un error al enviar los datos']);
    }

    curl_close($ch);
} else {
    // Respuesta si se accede a este archivo con otro método que no sea POST
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>
