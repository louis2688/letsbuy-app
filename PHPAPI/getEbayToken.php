<?php

    $devID = 'ac8c04a1-9cf3-46e6-ad82-6d1494309c56'; // these prod keys are different from sandbox keys
    $appID = 'InbalMen-hiletsbu-PRD-8dfe517a4-de8ac24d';
    $certID = 'PRD-dfe517a44c1a-e701-4057-8957-9a0b';
    $clientID = 'InbalMen-hiletsbu-PRD-8dfe517a4-de8ac24d';
    //set the Server to use (Sandbox or Production)
    $serverUrl = 'https://api.ebay.com/ws/api.dll';      // server URL different for prod and sandbox
    //the token representing the eBay user to assign the call with
    
    $authCode = 'v%5E1.1%23i%5E1%23r%5E1%23f%5E0%23I%5E3%23p%5E3%23t%5EUl41XzE6MUQwRTU0QkMwNzkxMjU2MEQ5N0NEOEVBQ0M3MjQzNUVfMF8xI0VeMjYw&expires_in=299';
    $authToken = "";
    $refreshToken = "";
    $ruName = "Inbal_Mendel_Ha-InbalMen-hilets-ircntvg";
    
    $authCodeFromServer = json_decode(file_get_contents("php://input"));

    if ($authCodeFromServer != null) {
        $authCode = $authCodeFromServer->authCode;
    }
    
    $link = "https://api.ebay.com/identity/v1/oauth2/token";
    
    $codeAuth = base64_encode($clientID . ':' . $certID);
    
    /**
     * echo ("<script>console.log('PHP: " . $codeAuth . "');</script>");
     */
    
    $ch = curl_init($link);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'Authorization: Basic ' . $codeAuth
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "grant_type=authorization_code&code=" . $authCode . "&redirect_uri=" . $ruName);
    $response = curl_exec($ch);
    $json = json_decode($response, true);
    $info = curl_getinfo($ch);
    curl_close($ch);
    if ($json != null) {
        echo json_encode($json);
    }
?>