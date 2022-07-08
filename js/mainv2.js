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

var opponentObj = {
    score: 0,
    started: 0,
    sentence: "",
    refresh: 0
}

function stringifyObject(obj) {
    return JSON.stringify(obj);
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

/* Refreshes page */
function refresh() {
    obj.refresh = 1;
    sendArray(obj);
    window.location.reload();
}

// Dont know what this does
function callingAjax() {
    $.ajax({
        url: "./json/players.json",
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
    xhr.open("GET", "./json/players.json");
    xhr.send();
}

$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    $("#own-bar").css('width', obj.score + "%")
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden");
        $("#replay").removeClass("hidden");
    }
    changeOpponentData();
});

$(document).keydown(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    // $("#own-bar").css('width', obj.score + "%")
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden");
        $("#replay").removeClass("hidden");
    }
    changeOpponentData();
});

function isStarted() {
    // TODO: Check if the game is started and if not, start it.
}

function checkWinCondition() {
    if (opponentObj.score === 100) {
        $("#loser").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
        $("#replay").removeClass("hidden");
    }
}

function readGameData(callback) {
    var opponentData = new XMLHttpRequest();
    opponentData.overrideMimeType("application/json");
    opponentData.open("GET", "../json/gamestates.json", true);
    opponentData.onreadystatechange = function () {
        if (opponentData.readyState == 4 && opponentData.status == 200) {
            callback(opponentData.responseText);
        }
    }
    opponentData.send(null);
}

function changeOpponentData() {
    readGameData(function (data) {;
        var JSONdata = JSON.parse(data);
        opponentObj.score = JSONdata[0].score;
        opponentObj.started = JSONdata[0].started;
        opponentObj.sentence = JSONdata[0].sentence;
        opponentObj.refresh = JSONdata[0].refresh;
        console.log(JSONdata[0]);   
        console.log(opponentObj);
    });
}

function sendGameData() {
    // stuurt de data naar de server
}