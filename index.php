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

<?php
include __DIR__ . '/tpl/body_end.php';
?>