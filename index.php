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

<div>
    <blockquote class="blockquote">
        <p class="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur ad fugiat vel deleniti odio libero, porro eaque. Architecto, ratione eos impedit molestias dolorum pariatur! Voluptatem alias minus corporis illum et.</p>
    </blockquote>
</div>
<div>
    <textarea class="form-control" id="inputArea" rows="3"></textarea>
</div>


<?php
include __DIR__ . '/tpl/body_end.php';
?>