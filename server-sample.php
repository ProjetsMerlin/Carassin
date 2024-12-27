<?php
header('Content-Type: application/json');

$apiKey = 'votre_cle';

$url = "https://api.openweathermap.org/data/2.5/weather?q=Bruxelles,be&lang=fr&appid=$apiKey";

$response = file_get_contents($url);
if ($response === FALSE) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur lors de la récupération des données météorologiques']);
}
else {
    echo $response;
}