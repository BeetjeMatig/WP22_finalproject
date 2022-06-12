<?php
/* Header */
$page_title = 'Webprogramming Assignment 3';
$navigation = Array(
    'active' => 'Home',
    'items' => Array(
        'Highscores' => 'highscores.php',
    )
);
include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<div class="game-container">
    <?php
    include __DIR__ . '/tpl/player_bar.php';
    include __DIR__ . '/tpl/player_bar.php';
    include __DIR__ . '/tpl/player_bar.php';
    ?>
    <div class="game-box">
        <blockquote class="blockquote">
            <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ad fugiat vel deleniti odio libero, porro eaque. Architecto, ratione eos impedit molestias dolorum pariatur! Voluptatem alias minus corporis illum et.</p>
        </blockquote>
        <textarea class="form-control" id="inputArea" rows="3"></textarea>
    </div>
</div>


<?php
include __DIR__ . '/tpl/body_end.php';
?>