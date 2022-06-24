const bc = new BroadcastChannel('broadcast-channe;');
const input = document.querySelector('inputArea');

bc.onmessage = (MessageEvent) => {
    if (MessageEvent.data == 'update_array') {
        console.log("update")
    }
}

function sendArray() {
    bc.postMessage('update_array')
}

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
    }
    if (checkWinCondition() == 1) {
        // createScore(new Date().getTime());
        createScore(index);
    }
}

// function timer (index) {
//     if (index == 0) {
//         var start = new Date().getTime();
//         return start
//     } else if (index == 1) {
//         var time = new Date().getTime();
//         return time
//     }
// }

function checkWinCondition () {
    if ($('#original').text().length === 0) {
        return 1;
    } else {
        return 0;
    }
}

// array met index id, progress, --> jquery, original and higlight, start time, stop time
// function createScore (index) {
//     let progress = $('#progress').text();
//     let original = $('#original').text();
//     let highlight = $('#highlight').text();
//     let start = $('#start').text();
//     let stop = $('#stop').text();
//     let score = {
//         id: index,
//         progress: progress,
//         original: original,
//         highlight: highlight,
//         start: start,
//         stop: stop
//     }
//     scores.push(score);
//     console.log(scores);
// }
function createScore (index){ //, time) {
    let original = $('#original').text().length;
    let highlight = $('#highlight').text().length;
    let score = highlight / (original + highlight) * 100;
    const fs = require('fs');
    var obj = {
        id: 1,
        score: score,
        startTime: null,
        stopTime: null
    }
    if (index === 0) {
        obj.startTime = new Date().getTime();
    } else if (index === 1) {
        obj.stopTime = new Date().getTime();
    }
    scores.push(obj);
    // const fs = require("fs");
    // let scoresJson = fs.readFileSync("../json/scores.json","utf-8");
    // let scores = JSON.parse(scoresJson);
    // users.push(obj);
    // scoresJson = JSON.stringify(scores);
}

$(document).keyup(function (event) {
    if ($('#highlight').text().length == 1) {
        // var start = timer(0)
        createScore(0);
    }
    var keycode = event.key;
    validateInput(keycode);
    timer();
    sendArray();
});


