/* This retrieves the player ID from a parameter passed in the URL*/
let actualPlayerID = new URLSearchParams(window.location.search).get('player_id');

const input = document.querySelector('inputArea');
let sentenceID;

const jsonData = fetch("./json/players.json")
    .then(response => response.json())
    .then((data) => {
        playerData = data[(actualPlayerID - 1)];
        sentenceID = playerData["sentence"];
    });

/**
 * Fetches a sentence for the game to use from sentences.json.
 */
fetch("./json/sentences.json")
    .then(response => response.json())
    .then((data) => {
        if (actualPlayerID == 1) {
            let sentenceID = Math.floor(Math.random() * 31);
            let sentence = data[sentenceID];
            actualSentence = sentence["context"];
            obj.sentence = actualSentence;
            updateGameData();
        }
        if (actualPlayerID == 2) {
            changeOpponentData();
            updateGameData();
        }
    });

/**
 * Loads the sentence onto the page.
 */
function loadSentence() {
    if ($('#original').text() == "") {
        if (actualPlayerID == 1) {
            $('#original').empty();
            $('#original').append(obj.sentence);
        }
        if (actualPlayerID == 2) {
            $('#original').empty();
            $('#original').append(opponentObj.sentence);
        }
    }
}

/**
 * Object which contains the score and the sentence of the player.
 */
var obj = {
    score: 0,
    sentence: ""
}

/**
 * Object which contains the score and the sentence of the opponent.
 */
var opponentObj = {
    score: 0,
    sentence: ""
}

/**
 * This function is called when the player presses a key and checks if the key is correct
 * with the next character in the sentence. If so, it changes the highlighted part of the text 
 * in the changeSpan function.
 * @summary: This function is called when the player presses a key.
 * @param {*} keycode - Unicode code of the key which was pressed
 */
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

/**
 * Checks if the first string is a part of the second string.
 * @param {*} a - First string
 * @param {*} b - Second string
 * @returns - True if the first string contains the second string, false otherwise.
 */
function aContainsB(a, b) {
    return a.indexOf(b) >= 0;
}

/**
 * This function changes the highlighted part of the text which is typed correctly.
 * Every time a character is typed, the function checks if it should be the next character
 * typed. If so, it appends the character to the highlighted part removes it
 * from the original span. The createScore function is also called.
 * @param {*} keycode - Unicode code of the key which was pressed
 */
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

/**
 * This function calculates the score of the player and updates the object as such.
 * @param {*} obj - Object which contains the score and the sentence
 * @returns - The updated object
 */
function createScore(obj) {
    let original = $('#original').text().length;
    let highlight = $('#highlight').text().length;
    obj.score = highlight / (original + highlight) * 100;
    return obj;
}

/**
 * This function is called on an interval and checks if the opponent has met the
 * win condition (a score of 100/100). If so, it shows the player the losing screen because 
 * the other player has won.
 */
function checkWinConditionOpponent() {
    if (opponentObj.score == 100) {
        $("#loser").removeClass("hidden");
        $('.game-container').css("visibility", "hidden")
        $("#replay").removeClass("hidden");
        clearInterval(intervalID);
    }
}

/**
 * This function is called on a keypress and checks if the player has met the
 * win condition (a score of 100/100). If so, the player is shown a winner screen.
 */
function checkWinConditionPlayer() {
    if (obj.score === 100) {
        startConfetti();
        $("#winner").removeClass("hidden");
        $('.game-container').css("visibility", "hidden");
        $("#replay").removeClass("hidden");
        clearInterval(intervalID);
    }
}

/**
 * This function reads the game data from a JSON file and uses a callback
 * function to pass the data back to another function which can handle the
 * data.
 * @param {*} callback - Allows this function to be passed as a parameter
 */
function readGameData(callback) {
    var opponentData = new XMLHttpRequest();
    opponentData.overrideMimeType("application/json");
    opponentData.open("GET", "./json/players.json", true);
    opponentData.onreadystatechange = function () {
        if (opponentData.readyState == 4 && opponentData.status == 200) {
            callback(opponentData.responseText);
        }
    }
    opponentData.send(null);
}

/**
 * This function is called on an interval and updates the player's score.
 */
function changeOpponentData() {
    readGameData(function (data) {
        ;
        var JSONdata = JSON.parse(data);
        if (actualPlayerID == 1) {
            if (JSONdata.length > 1) {
                opponentObj.score = JSONdata[1].score;
            }
        } else {
            opponentObj.score = JSONdata[0].score;
            opponentObj.sentence = JSONdata[0].sentence;
            obj.sentence = JSONdata[0].sentence;
        }
    });
}

/**
 * Updates the opponent their score in the progress bar.
 */
function updateOpponentProgressBar() {
    $("#opponent-bar").css('width', opponentObj.score + "%");
}

/**
 * These two functions are called when the player presses the buttons on the
 * keyboard. They check the keycode and call the validateInput function. It also
 * updates the player their score in the progress bar. If the wincondition is met,
 * the player is shown a win screen.
 * 
 * Both keyup and keydown are used because the event would have trouble being
 * called whenever the player presses 2 keys at the same time.
 */
$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    $("#own-bar").css('width', obj.score + "%")
    checkWinConditionPlayer();
});

$(document).keydown(function (event) {
    var keycode = event.key;
    validateInput(keycode);
    $("#own-bar").css('width', obj.score + "%")
    checkWinConditionPlayer();
    updateGameData();
});

/**
 * Whenever this function is called it updates the player's score in the JSON file
 * by calling a PHP script. There is a PHP script which is called in the background
 * for each player.
 */
function updateGameData() {
    if (actualPlayerID == 1) {
        if ($('body').is('.game')) {
            $.ajax({
                type: "GET",
                url: "./scripts/update_score.php",
                data: { score: obj.score, sentence: actualSentence }
            })
        }
    }
    if (actualPlayerID == 2) {
        if ($('body').is('.game')) {
            $.ajax({
                type: "GET",
                url: "./scripts/update_score_2.php",
                data: { score: obj.score, sentence: obj.sentence }
            })
        }
    }
}

/**
 * Interval function to update the opponent's score, updates it in the progress
 * bar and checks if the opponent has met the win condition.
 */
var intervalID = setInterval(function () {
    changeOpponentData();
    updateOpponentProgressBar();
    checkWinConditionOpponent();
    updateGameData();
    loadSentence();
}, 100);