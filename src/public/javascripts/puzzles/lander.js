function lander() {
    term.echo("You got that right!\nHere's your next clue: ");
    term.echo("\nFind the familiar phrase or saying in these arrangement of letters");
    whatzit1();
}

function whatzit1() {
    term.echo("\nPuzzle 1: " +
        "\n" +
        "\n ----------------------------" +
        "\n|                  comfort  |" +
        "\n|  close           comfort  |" +
        "\n|  close           comfort  |" +
        "\n|                  comfort  |" +
        "\n ----------------------------"
        );
    processAnswer(whatzit1, whatzit2);
}

function whatzit2() {
    term.echo("\nPuzzle 2: " +
    "\n" +
    "\n ----------------------------" +
    "\n|           SUN             |" +
    "\n|          ANTIQUE          |" +
    "\n|          ARCHAIC          |" +
    "\n|          ANCIENT          |" +
    "\n ----------------------------"
    );
    processAnswer(whatzit2, theEnd);
}

function theEnd() {

    term.echo("Well done! This rocket is nearing escape velocity! Let's see if you know this:");
}

/**
 * Keeps asking for an answer until entered or user gives up
 * @param {Function} currentPuzzle 
 * @param {Function} nextPuzzle 
 */
function processAnswer(currentPuzzle, next) {
    term.read('Answer: ').then(function(answer) {
        if(!answer|| Utils.isEmpty(answer)) {
            currentPuzzle();
        }
        else {
            term.pause();
            checkSolution(currentPuzzle.name, answer).done(function(data) {
                if(!data.correct) {
                    term.echo('Please try again!');
                    return currentPuzzle();
                }
                if (next) {
                    next();
                };
            }).always(function(){
                term.resume();
            });
        }
    });
}

function checkSolution(puzzle, answer) {
    return jQuery.ajax({
        "url": '/puzzles',
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "userId": window.user.id,
        },
        "data": JSON.stringify({ puzzle: puzzle, "answer": answer })
    });
}

function levelUp(puzzle, answer) {
    return jQuery.ajax({
        "url": '/user/level',
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "userId": window.user.id,
        },
        "data": JSON.stringify({ puzzle: puzzle, "answer": answer })
    });
}
