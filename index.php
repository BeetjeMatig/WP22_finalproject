<?php
/* Header */
$page_title = 'HypeType';
$navigation = Array(
    'active' => 'Home',
    'items' => Array(
        'Highscores' => 'highscores.php',
    )
);

$sentence_json = file_get_contents(__DIR__.'/json/test.json');
$sentence_array = json_decode($sentence_json, true);
include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<p id="intro-text">Press enter to start the game!</p>

<div class="game-container">
    <?php
    include __DIR__ . '/tpl/player_bar.php';
    ?>

    <?php
    $sentence = $sentence_array[rand(0, count($sentence_array) - 1)];
    $sentence_text = $sentence['context'];
    $trimmed = str_replace('"', "", $sentence_text);
    ?>


    <div class="game-box">
        <blockquote class="blockquote">
            <p class="text-center" id="sentence"><span class="highlight" id="highlight"></span><span id="original"><?php echo $trimmed?></span></p>
        </blockquote>
        <textarea class="form-control" id="inputArea" rows="3"></textarea>
    </div>

</div>

<div class="winner-container">
    <h3 id="loser" class="hidden">Gefeliciteerd, je hebt verloren!</h3>
    <h3 id="winner" class="hidden">Jammer, je hebt gewonnen.</h3>
</div>


<?php
include __DIR__ . '/tpl/body_end.php';
?>