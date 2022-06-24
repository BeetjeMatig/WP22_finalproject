const bc = new BroadcastChannel('broadcast-channe;');
const input = document.querySelector('inputArea');
var obj = {
    // id: 1,
    score: 0,
    startTime: 0,
    stopTime: 0
}

bc.onmessage = (MessageEvent) => {
    console.log(MessageEvent.data);
    checkWinCondition(MessageEvent.data);
}

function sendArray(obj) {
    bc.postMessage(obj)
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
    createScore(obj);
}

function createScore (obj) {
    let original = $('#original').text().length;
    let highlight = $('#highlight').text().length;
    obj.score = highlight / (original + highlight) * 100;
    if ($('#highlight').text().length === 1) {
        obj.startTime = new Date().getTime();
    } else if ($('#original').text().length === 0) {
        obj.stopTime = new Date().getTime();
    }
    return obj;
}

function checkWinCondition (data) {
    if (data.score === 100) {
        console.log("de andere persoon is de winnaar");
        $("#winner").removeClass("hidden");
    }
}

$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    sendArray(createScore(obj));
});