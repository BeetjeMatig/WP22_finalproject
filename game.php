<?php
/* Header */
$page_title = 'HypeType';
$navigation = array(
    'active' => 'Home'
);

include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<body class="game">
<div>
    <?php
    include __DIR__ . '/tpl/player_bar.php';
    ?>
    <div class="game-box">
        <blockquote class="blockquote">
            <p class="text-center" id="sentence"><span class="highlight" id="highlight"></span><span id="original">This is an example.</span></p>
        </blockquote>
        <textarea class="form-control" id="inputArea" rows="3"></textarea>
    </div>
</div>

<div class="winner-container">
    <h3 id="loser" class="hidden">
        Gefeliciteerd, je hebt verloren! <br></br>
        <form action="game.php" method="POST">
        <button id="replay" class="btn btn-primary">RESTART GAME</button>
        </form>
        <form action="scripts/delete_data.php" method="get">
            <button id="exit" class ="btn btn-primary" >EXIT GAME</button>
        </form>
    </h3>
    <h3 id="winner" class="hidden">
        Jammer, je hebt gewonnen. <br></br>
        <form action="game.php" method="POST">
            <button id="replay" class="btn btn-primary">RESTART GAME</button>
        </form>
        <form action="scripts/delete_data.php" method="get">
            <button id="exit" class ="btn btn-primary" >EXIT GAME</button>
        </form>

    </h3>

</div>
</body>