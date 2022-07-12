<?php
    // Read player data
    $json_file = file_get_contents("../json/players.json");
    $playerdata = json_decode($json_file, true);

    // Generate player ID
    $player_id = 0;
    $sentence_number = 0;
    foreach ($playerdata as $key => $value){
        $player_id = $value['player_id'];
    }

    $player_id += 1;
    if($player_id !== 2) {
        foreach ($playerdata as $key => $value) {
            array_pop($playerdata);
            $player_id = 1;
        }
    }

    array_push($playerdata, [
        'player_id' => $player_id,
        'name' => $_GET['username'],
        'score' => 0,
        'sentence' => ''
    ]);

    // Save to external file
    $json_file = fopen('../json/players.json', 'w');
    fwrite($json_file, json_encode($playerdata));
    fclose($json_file);

    header("Location: ../game.php?player_id=$player_id");
    die();
