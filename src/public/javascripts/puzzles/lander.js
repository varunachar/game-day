function lander() {
    term.echo("You got that right!\nHere's your next clue: ");
    term.echo("\n");
    whatzit1();
}

function whatzit1() {
    term.echo("\nFind the familiar phrase or saying in these arrangement of letters: " +
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
    term.echo("\nName the movie and find your next clue: " +
        "\n" +
        "\n ----------------------------" +
        "\n|    ---->  GLOCK           |" +
        "\n|          BERETTA          |" +
        "\n|           COLT            |" +
        "\n|          WALTER           |" +
        "\n ----------------------------"
    );
    processAnswer(whatzit2, theEnd);
}

function theEnd() {
    term.echo("Well done! You're in the Neeedd.. The need for speeed!");
}
