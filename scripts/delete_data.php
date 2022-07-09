<?php
if (isset($_POST['article_id'])){

    $json_file_players = file_get_contents("../json/players.json");
    $playerdata = json_decode($json_file_players, true);

    foreach ($playerdata as $key => $value){
        if ($value['id'] == $_POST['article_id']){
            unset($playerdata[$key]);
            break;
        }
    }

    $json_file_players = fopen('../json/players.json', 'w');
    fwrite($json_file_players, json_encode($playerdata));
    fclose($json_file_players);


    $json_file_scores = file_get_contents("../json/scores.json");
    $scoresdata = json_decode($json_file_scores, true);

    foreach ($scoresdata as $key => $value){
        if ($value['id'] == $_POST['article_id']){
            unset($scoresdata[$key]);
            break;
        }
    }

    $json_file_scores = fopen('../json/scores.json', 'w');
    fwrite($json_file_scores, json_encode($scoresdata));
    fclose($json_file_scores);
}
?>