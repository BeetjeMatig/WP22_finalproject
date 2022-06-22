<?php
/* Header */
$page_title = 'HypeType';
$navigation = Array(
    'active' => 'Home',
    'items' => Array(
        'Highscores' => 'highscores.php',
    )
);

$sentence_json = file_get_contents(__DIR__.'/json/sentences.json');
$sentence_array = json_decode($sentence_json, true);
include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<script src="js/main.js" defer></script>
<div class="game-container">
    <?php
    include __DIR__ . '/tpl/player_bar.php';
    include __DIR__ . '/tpl/player_bar.php';
    include __DIR__ . '/tpl/player_bar.php';
    ?>

    <?php
    $sentence = $sentence_array[rand(0, count($sentence_array) - 1)];
    $sentence_text = $sentence['context'];
    $trimmed = str_replace('"', "", $sentence_text);
    ?>

    <div class="game-box">
        <blockquote class="blockquote">
            <p class="text-center" id="sentence"><?php echo $trimmed?></p>
        </blockquote>
        <textarea class="form-control" id="inputArea" rows="3"></textarea>
    </div>
</div>



<?php
include __DIR__ . '/tpl/body_end.php';
?>