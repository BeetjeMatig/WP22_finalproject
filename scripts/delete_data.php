<?php
    $json_file_players = file_get_contents("../json/players.json");
    $playerdata = json_decode($json_file_players, true);

    // This clears the json file of it's contents

    foreach ($playerdata as $key => $value){
        array_pop($playerdata);;
    }

    $json_file_players = fopen('../json/players.json', 'w');
    fwrite($json_file_players, json_encode($playerdata));
    fclose($json_file_players);

    header("Location: ../index.php");
