<?php
$database = file_get_contents("orders/orders.json");
$correct_api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYzQzMzUyNC04ZTBiLTQ4NjItOWE1Mi1hNmE4MDBmMzYxODMiLCJwZXJtaXNzaW9ucyI6W3sibmFtZSI6IlFVRVJZX0FMTF9TSE9QUyJ9LHsibmFtZSI6IlFVRVJZX0FMTF9HT0RTIn0seyJuYW1lIjoiVVNFX0ZJTFRFUlMifV19.2j79llRQP_eudUFVJJ5xcjsQjCpVw_TXPDvgmGGtvp8";
$api_key = $_GET['ak'];
$order = $_GET['order'];

$ERR_API_RESPONSE_400 = <<<EOL
{
    "message": "Bad request",
    "code": 400
}
EOL;

$ERR_API_RESPONSE_403 = <<<EOL
{
    "message": "Access denied",
    "code": 403
}
EOL;

if ($api_key != "") {
    if ($api_key == $correct_api_key) {
        if ($order != "") {
            $db = json_decode($database);
            $obj = json_decode($order);
            array_push($db, $obj);
            $response = json_encode($db);
            file_put_contents("orders/orders.json", $response);
            header("HTTP/1.1 200 OK");
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json");
            echo($response);
        } else {
            header("HTTP/1.1 400 Bad request");
            header("Access-Control-Allow-Origin: *");
            header("Content-Type: application/json");
            echo($ERR_API_RESPONSE_400);
        }
    } else {
        header("HTTP/1.1 403 Access denied");
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json");
        echo($ERR_API_RESPONSE_403);
    }
} else {
    header("HTTP/1.1 400 Bad request");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    echo($ERR_API_RESPONSE_400);
}
?>