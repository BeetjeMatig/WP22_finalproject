<?php
if (isset($_POST['submit'])) {
    // Read player data
    $json_file = file_get_contents("../json/players.json");
    $playerdata = json_decode($json_file, true);

    // Generate player ID
    $player_id = 0;
    foreach ($playerdata as $key => $value){
        $player_id = $value['player_id'];
    }
    
    $player_id += 1;
    array_push($playerdata, [
        'player_id' => $player_id,
        'name' => $_POST['username'],
        'score' => 0,
        'games_won' => 0
    ]);

    // Save to external file
    $json_file = fopen('../json/players.json', 'w');
    fwrite($json_file, json_encode($playerdata));
    fclose($json_file);

    // Redirect to homepage
    header("Location: ../");
    die();
}
?>