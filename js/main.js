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
}

$(document).keyup(function (event) {
    var keycode = event.key;
    validateInput(keycode);
});
