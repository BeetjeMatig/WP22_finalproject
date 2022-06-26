const bc = new BroadcastChannel('broadcast-channe;');
const input = document.querySelector('inputArea');
let sentenceID = Math.floor(Math.random() * 30);
const jsonData = fetch("./json/sentences.json")
    .then(response => response.json())
    .then((data) => {
        let sentence = data[sentenceID];
        actualSentence = sentence["context"];
        console.log(actualSentence);
    });

var obj = {
    score: 0,
    startTime: 0,
    stopTime: 0,
    started: 0,
    sentence: ""
}

bc.onmessage = (MessageEvent) => {
    console.log(obj.started);
    if(MessageEvent.data.started === 1) {
        if(obj.started === 0) {
            $("#original").html(MessageEvent.data.sentence);
            obj.started = 1;
            $(".game-container").css("visibility", "visible");
            $('#intro-text').css("visibility", "hidden");
    }
    console.log(MessageEvent.data);
    checkWinCondition(MessageEvent.data);
    $("#opponent-bar").css('width', MessageEvent.data.score + "%");
}}

function sendArray(obj) {
    bc.postMessage(obj);
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
    console.log(keycode)
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
        $("#loser").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
    }
}

$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    sendArray(createScore(obj));
    $("#own-bar").css('width', obj.score + "%")
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
    }
});

$(document).keydown(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    sendArray(createScore(obj));
    $("#own-bar").css('width', obj.score + "%")
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
    }
});

$(document).on('keypress',function(e) {
    if(e.key === 'Enter') {
        if(obj.score === 0) {
            $('.game-container').css("visibility", "visible")
        }
        $('#intro-text').css("visibility", "hidden");
        if(obj.started === 0) {
            $("#original").html(actualSentence);
            obj.sentence = actualSentence;
            obj.started = 1;
        }
    }
});