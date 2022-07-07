const bc = new BroadcastChannel('broadcast-channel');
const input = document.querySelector('inputArea');
let sentenceID = Math.floor(Math.random() * 31);

/* Fetches the sentence from sentences.json that will be used in that game. */
const jsonData = fetch("./json/sentences.json")
    .then(response => response.json())
    .then((data) => {
        let sentence = data[sentenceID];
        actualSentence = sentence["context"];
    });

/* Object which gets send back and forth between the players. */
var obj = {
    score: 0,
    started: 0,
    sentence: "",
    refresh: 0
}

function stringifyObject(obj) {
    return JSON.stringify(obj);
}

/* The Broadcast API check that when they receive a message, if the game should start or not
If the game has already started it will check every time if the win condition is met. */
bc.onmessage = (MessageEvent) => {
    if (MessageEvent.data.started === 1) {
        if (obj.started === 0) {
            $("#original").html(MessageEvent.data.sentence);
            obj.started = 1;
            $(".game-container").css("visibility", "visible");
            $('#intro-text').css("display", "none");
        }
        if (MessageEvent.data.refresh === 1) {
            window.location.reload();
        }
        checkWinCondition(MessageEvent.data);
        $("#opponent-bar").css('width', MessageEvent.data.score + "%");
    }
}

function sendArray(obj) {
    bc.postMessage(obj);
}

/* This function checks if the given input is correct or not and changes the color of the
textbox accordingly. It also calls the changeSpan function if the input is correct. */
function validateInput(keycode) {
    let input = $('#inputArea').val();
    let sentence = $('#sentence').text();
    if (aContainsB(sentence, input)) {
        changespan(keycode);
        $('#inputArea')[0].style.color = "green";
    } else {
        $('#inputArea')[0].style.color = "red";
    }
}

/* Check if the input from the textbox is still correct to the sentence. */
function aContainsB(a, b) {
    return a.indexOf(b) >= 0;
}

/* This function changes the highlighted part of the text which is typed correctly.
Every time a character is typed, the function checks if it should be the next character
typed. If so, it appends the charachter to the highlghted part and it gets removed
from the original span. The createScore function is also called. */
function changespan(keycode) {
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

/* This function returns an object containing the startTime of the game, the stoptime, and
the current score of the player from 0 to 100. */
function createScore(obj) {
    let original = $('#original').text().length;
    let highlight = $('#highlight').text().length;
    obj.score = highlight / (original + highlight) * 100;
    return obj;
}

/* Checks the win condition of the game. If you receive the object with a score of 100
it means that the other player has won. It will make the corresponding winner/loser 
message appear. */
function checkWinCondition(data) {
    if (data.score === 100) {
        $("#loser").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
        $("#replay").removeClass("hidden");
    }
}

/* Every time a keyup or keydown event happens, it will check if the given input is valid
by calling validateInput. It will also send a new object to the other player with the updated
score. */
$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    sendArray(createScore(obj));
    $("#own-bar").css('width', obj.score + "%")
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden");
        $("#replay").removeClass("hidden");
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
        $('.game-container').css("visibility", "hidden");
        $("#replay").removeClass("hidden");
    }
});

/* If the player presses enter the game starts. */
function startGame() {
    if (obj.started === 0) {
        $('#intro-text').css("display", "none");
        $('.game-container').css("visibility", "visible")
        $("#original").html(actualSentence);
        obj.sentence = actualSentence;
        obj.started = 1;
    }
    sendArray(obj);
    callingAjax();
}

/* Refreshes page */
function refresh() {
    obj.refresh = 1;
    sendArray(obj);
    window.location.reload();
}

function callingAjax() {
    $.ajax({
        url: "./json/gamestatus.json",
        success: function (data) {
            console.log(data);
        }
    });
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
        }
    }
    xhr.open("GET", "./json/gamestatus.json");
    xhr.send();
}