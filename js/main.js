function validateInput () {
    let input = $('#inputArea').val();
    let sentence = $('#sentence').text();
    if (aContainsB(sentence, input)) {
        $('#inputArea')[0].style.color="green";
    } else {
        $('#inputArea')[0].style.color="red";
    }
}

function aContainsB (a, b) {
    return a.indexOf(b) >= 0;
}

$(document).keyup(function () {
    validateInput();
});
