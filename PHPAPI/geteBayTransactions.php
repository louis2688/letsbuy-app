<?php

    $devID = 'ac8c04a1-9cf3-46e6-ad82-6d1494309c56'; // these prod keys are different from sandbox keys
    $appID = 'InbalMen-hiletsbu-PRD-8dfe517a4-de8ac24d';
    $certID = 'PRD-dfe517a44c1a-e701-4057-8957-9a0b';
    $clientID = 'InbalMen-hiletsbu-PRD-8dfe517a4-de8ac24d';
    //set the Server to use (Sandbox or Production)
    $serverUrl = 'https://api.ebay.com/ws/api.dll';      // server URL different for prod and sandbox
    //the token representing the eBay user to assign the call with
    
    $authToken = 'v^1.1#i^1#f^0#I^3#p^3#r^0#t^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';
    $authToken = "";
    $refreshToken = "";
    $ruName = "Inbal_Mendel_Ha-InbalMen-hilets-ircntvg";
    
    $authTokenFromServer = json_decode(file_get_contents("php://input"));

    if ($authTokenFromServer != null) {
        $authToken = $authTokenFromServer->authToken;
    }
    
    $link = "https://apiz.ebay.com/sell/finances/v1/transaction";
    
    $codeAuth = base64_encode($clientID . ':' . $certID);
    
    /**
     * echo ("<script>console.log('PHP: " . $codeAuth . "');</script>");
     */
    
    $ch = curl_init($link);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'Authorization: Bearer ' . $authToken
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    $response = curl_exec($ch);
    $json = json_decode($response, true);
    $info = curl_getinfo($ch);
    curl_close($ch);
    if ($json != null) {
        echo json_encode($json);
    }
    else {
        echo json_encode("No response from eBay");
    }
?>