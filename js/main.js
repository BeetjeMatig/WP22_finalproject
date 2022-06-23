function validateInput (keycode) {
    let input = $('#inputArea').val();
    let sentence = $('#sentence').text();
    if (aContainsB(sentence, input)) {
        changespan(keycode);
        $('#inputArea')[0].style.color="green";
    } else {
        $('#inputArea')[0].style.color="red";
    }
}

function aContainsB (a, b) {
    return a.indexOf(b) >= 0;
}

function changespan (keycode) {
    let sentence = $('#original').text();
    let character = sentence.charAt(0);
    if (character == keycode) {
        var trimmed = sentence.substring(1);
        $('#original').empty();
        $('#original').append(trimmed);

        let highlighText = $('#highlight').text();
        var newText = highlighText.concat(character)
        $('#highlight').empty();
        $('#highlight').append(newText);
        console.log(character)
    }
    if (checkWinCondition() == 1) {
        createScore(new Date().getTime());
    }
}

function timer (index) {
    if (index == 0) {
        var start = new Date().getTime();
        return start
    } else if (index == 1) {
        var time = new Date().getTime();
        return time
    }
}

function checkWinCondition () {
    if ($('#original').text().length == 0) {
        return 1;
    } else {
        return 0;
    }
}

function createScore (time) {
    var obj = {
        id: 1,
        score: 2
    }
    const fs = require("fs");
    let scoresJson = fs.readFileSync("../json/scores.json","utf-8");
    let scores = JSON.parse(scoresJson);
    users.push(obj);
    scoresJson = JSON.stringify(scores);
}

$(document).keyup(function (event) {
    if ($('#highlight').text().length == 1) {
        var start = timer(0)
    }
    var keycode = event.key;
    validateInput(keycode);
    timer();
});
