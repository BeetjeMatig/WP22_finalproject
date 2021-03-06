<?php
/* Header */
$page_title = 'HypeType';
$navigation = array(
    'active' => 'Home'
);

include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<script src="js/main.js" defer></script>
<script src="styleJS/confetti.js" defer></script>

<body class="game">
    <div class="game-container">
        <?php
        include __DIR__ . '/tpl/player_bar.php';
        ?>
        <div class="game-box">
            <blockquote class="blockquote">
                <p class="text-center" id="sentence"><span class="highlight" id="highlight"></span><span id="original"></span></p>
            </blockquote>
            <textarea class="form-control" id="inputArea" rows="3"></textarea>
        </div>
    </div>

    <div class="winner-container">
        <h3 id="loser" class="hidden">
            Gefeliciteerd, je hebt verloren! <br></br>
            <form action="scripts/delete_data.php" method="get">
                <button id="exit" class="btn btn-primary">EXIT GAME</button>
            </form>
        </h3>
        <h3 id="winner" class="hidden">
            Jammer, je hebt gewonnen. <br></br>
            <form action="scripts/delete_data.php" method="get">
                <button id="exit" class="btn btn-primary">EXIT GAME</button>
            </form>

        </h3>
    </div>

    <?php
    include __DIR__ . '/tpl/body_end.php';
    ?>