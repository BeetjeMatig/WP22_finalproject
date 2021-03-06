<?php
/* Header */
$page_title = 'HypeType';
$navigation = array(
    'active' => 'Home'
);

include __DIR__ . '/tpl/head.php';
include __DIR__ . '/tpl/body_start.php';
?>

<body class="index">
    <div id="intro-text">
        <h1>HypeType</h1>
        <p>This game has been masterfully crafted by 3 Information Science
            students at the Rijksuniversiteit Groningen for an assignment in the Web
            Programming course of 2021/2022.
        </p>
        <p>The game (currently) works like: open two instances of the game on the same device
            on two different tabs, then start typing away and see who is fastest!
        </p>
        <form action="scripts/add_data.php" method="get">
            <div class="form-group">
                <input type="text" class="form-control" id="username" name="username">
            </div>
            <button class="btn btn-primary" name="submit" id="submit">Press here to start the game!</button>
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

    <?php
    include __DIR__ . '/tpl/body_end.php';
    ?>