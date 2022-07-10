<div class="player-box">
    <div class="player-name">
        <p class="name">You (games won: )</p>
    </div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated" id="own-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 0">Progress</div>
    </div>

    <div class="player-name">
        <p class="name">Opponent (games won: )</p>
    </div>
    <div class="progress">
        <div class="progress-bar progress-bar-striped progress-bar-animated bg-danger" id="opponent-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 0">Progress</div>
    </div>
</div>

<?php
$json_file = file_get_contents("../json/players.json");
$players = json_decode($json_file, true);
// Get article key
foreach($players as $key => $value){
    if ($value['id'] == $_POST['player_id']){
        $players_key = $key;
    }
}
?>