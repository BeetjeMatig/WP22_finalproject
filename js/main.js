function validateInput () {
    let input = document.getElementById("Input").value;
    if (aContainsB(sentence, input)) {
        document.getElementById("Input").style.color="green";
    } else {
        document.getElementById("Input").style.color="red";
    }
}


function aContainsB (a, b) {
    return a.indexOf(b) >= 0;
}
