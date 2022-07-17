<?php
$db = file_get_contents("db/156061cc-0a5d-46c2-8af3-0891f297d1ed.json");
$obj = json_decode($db);

// Key secret: 2993f1d0-aa4b-4d31-9873-d9dbd8dc3dc9

$correct_api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYzQzMzUyNC04ZTBiLTQ4NjItOWE1Mi1hNmE4MDBmMzYxODMiLCJwZXJtaXNzaW9ucyI6W3sibmFtZSI6IlFVRVJZX0FMTF9TSE9QUyJ9LHsibmFtZSI6IlFVRVJZX0FMTF9HT0RTIn0seyJuYW1lIjoiVVNFX0ZJTFRFUlMifV19.2j79llRQP_eudUFVJJ5xcjsQjCpVw_TXPDvgmGGtvp8";
$api_key = $_GET['ak'];
$filter = $_GET['criteria'];
$shop_id = $_GET['sid'];
$show_only_available_shops = $_GET['as'];
$show_only_available_gods = $_GET['ag'];

$ERR_API_RESPONSE_400 = <<<EOL
{
    "message": "Bad request",
    "code": 400,
    "shops" : []
}
EOL;

$ERR_API_RESPONSE_403 = <<<EOL
{
    "message": "Access denied",
    "code": 403,
    "shops" : []
}
EOL;

$ERR_API_RESPONSE_404 = <<<EOL
{
    "message": "Not found",
    "code": 404,
    "shops" : []
}
EOL;

if ($api_key != "") {
    if ($api_key == $correct_api_key) {
        if ($filter != "") {
            if ($filter == "shops") {
                if ($show_only_available_shops == "true") {
                    $response = array();
                    
                    for ($i = 0; $i < sizeof($obj->{'shops'}); $i++) {
                        if ($obj->{'shops'}[$i]->{'is_available'} == true) {
                            array_push($response, $obj->{'shops'}[$i]);
                        }
                    }
                    
                    $r = json_encode($response);
                    header("HTTP/1.1 200 OK");
                    header("Access-Control-Allow-Origin: *");
                    header("Content-Type: application/json");
                    echo($r);
                } else {
                    header("HTTP/1.1 200 OK");
                    header("Access-Control-Allow-Origin: *");
                    header("Content-Type: application/json");
                    echo($db);
                }
            } else if ($filter == "goods") {
                if ($shop_id != "") {
                    if ($show_only_available_gods == "true") {
                        $shop;
                    
                        for ($i = 0; $i < sizeof($obj->{'shops'}); $i++) {
                            if ($obj->{'shops'}[$i]->{'id'} == $shop_id) {
                                $shop = $obj->{'shops'}[$i]->{'goods'};
                            }
                        }
                        
                        if ($shop == null) {
                            header("HTTP/1.1 404 Not found");
                            header("Access-Control-Allow-Origin: *");
                            header("Content-Type: application/json");
                            echo($ERR_API_RESPONSE_404);
                        } else {
                            $ga = array();
                    
                            for ($i = 0; $i < sizeof($shop); $i++) {
                                if ($shop[$i]->{'is_available'} == true) {
                                    array_push($ga, $shop[$i]);
                                }
                            }
                            
                            $response = json_encode($ga);
                            header("HTTP/1.1 200 OK");
                            header("Access-Control-Allow-Origin: *");
                            header("Content-Type: application/json");
                            echo($response);
                        }
                    } else {
                        $shop;
                    
                        for ($i = 0; $i < sizeof($obj->{'shops'}); $i++) {
                            if ($obj->{'shops'}[$i]->{'id'} == $shop_id) {
                                $shop = $obj->{'shops'}[$i]->{'goods'};
                            }
                        }
                        
                        if ($shop == null) {
                            header("HTTP/1.1 404 Not found");
                            header("Access-Control-Allow-Origin: *");
                            header("Content-Type: application/json");
                            echo($ERR_API_RESPONSE_404);
                        } else {
                            $response = json_encode($shop);
                            header("HTTP/1.1 200 OK");
                            header("Access-Control-Allow-Origin: *");
                            header("Content-Type: application/json");
                            echo($response);
                        }
                    }
                } else {
                    header("HTTP/1.1 400 Bad request");
                    header("Access-Control-Allow-Origin: *");
                    header("Content-Type: application/json");
                    echo($ERR_API_RESPONSE_400);
                }
            } else {
                header("HTTP/1.1 400 Bad request");
                header("Access-Control-Allow-Origin: *");
                header("Content-Type: application/json");
                echo($ERR_API_RESPONSE_400);
            }
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