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
    // if it is the first player, a new sentence is selected, using a random number between 0 and 31,
    // This is not the id of the sentence, but rather the index. If there is already a player, the sentence
    // from player one is selected.
    if ($player_id === 1) {
        $sentence_number = rand(0, 30);
    } else {
        $sentence_number = $playerdata[1].$sentence_number;
    }

    array_push($playerdata, [
        'player_id' => $player_id,
        'name' => $_GET['username'],
        'score' => 0,
        'sentence' => $sentence_number
    ]);

    // Save to external file
    $json_file = fopen('../json/players.json', 'w');
    fwrite($json_file, json_encode($playerdata));
    fclose($json_file);

    if ($player_id == 1) {
        header("Location: ../game.php?player_id=$player_id");
        die();
    } else {
        header("Location: ../game.php?player_id=$player_id");
        die();
    }
?>