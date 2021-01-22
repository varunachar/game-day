/**
 * Keeps asking for an answer until entered or user gives up
 * @param {Function} currentPuzzle 
 * @param {Function} nextPuzzle 
 */
function processAnswer(currentPuzzle, next) {
    term.read('Answer: ').then(function (answer) {
        if (!answer || Utils.isEmpty(answer)) {
            currentPuzzle();
        }
        else {
            term.pause();
            checkSolution(currentPuzzle.name, answer).done(function (data) {
                if (!data.correct) {
                    term.echo("It's not that easy!");
                    return currentPuzzle();
                }
                if (next) {
                    next();
                };
            }).fail(function(xhr, status, err){
                term.echo("STOP CHEATING!");
            }).always(function () {
                term.resume();
            });
        }
    });
}

function checkSolution(puzzle, answer) {
    return jQuery.ajax({
        "url": BASE_URL+'/puzzles',
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "userId": window.user.id,
        },
        "data": JSON.stringify({ puzzle: puzzle, "answer": answer })
    });
}