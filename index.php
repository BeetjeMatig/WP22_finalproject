<?php
/* Header */
$page_title = 'HypeType';
$navigation = array(
    'active' => 'Home'
);

include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<div id="intro-text">
    <h1>HypeType</h1>
    <p>This game has been masterfully crafted by 3 Information Science
        students at the Rijksuniversiteit Groningen for an assignment in the Web
        Programming course of 2021/2022.
    </p>
    <p>The game (currently) works like: open two instances of the game on the same device
        on two different tabs, then start typing away and see who is fastest!
    </p>
    <form action="scripts/add_data.php" method="POST">
        <div class="form-group">
            <input type="text" class="form-control" id="username" name="username">
        </div>
        <button class="btn btn-primary" name="submit" onclick="startGame()">Press here to start the game!</button>
<!--        <button type="submit" name="submit" class="btn btn-primary">Submit</button>-->
    </form>
    
    <h3>F.A.Q.</h3>
    <p><b>How do I play against somebody else on the same device?</b><br>
        That's for you to figure out not us.
    </p>
    <p><b>What is your favourite beer?</b><br>
        Dienke: Grolsch. <br>
        Pascal: Brouwers. <br>
        Justin: Hertog Jan.
    </p>
    <p><b>Where can I contact you?</b><br>
        These are our GitHub pages! <br>
        Dienke: <a href="https://github.com/dienke">@dienke</a><br>
        Pascal: <a href="https://github.com/FritzFerdinand">@FritzFerdinand</a><br>
        Justin <a href="https://github.com/BeetjeMatig">@BeetjeMatig</a><br>
        If you wanna send an email, <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">click here.</a>
    </p>
</div>

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
        <button id="replay" class="btn btn-primary" onclick="refresh()">RESTART GAME</button>
    </h3>
    <h3 id="winner" class="hidden">
        Jammer, je hebt gewonnen. <br></br>
        <button id="replay" class="btn btn-primary" onclick="refresh()">RESTART GAME</button>
    </h3>

</div>

<?php
include __DIR__ . '/tpl/body_end.php';
?>