<?php
    $json_file = file_get_contents("../json/players.json");
    $playerdata = json_decode($json_file, true);

    // This updates the score and sentence in the json file for player 1

    $playerdata[0]['score'] = $_GET['score'];
    $playerdata[0]['sentence'] = $_GET['sentence'];

    $json_file = fopen('../json/players.json', 'w');
    fwrite($json_file, json_encode($playerdata));
    fclose($json_file);
