function birdie() {
    window.user.playLevel(scramble1);
}

function scramble1() {
    term.echo("\n\n\n\"If you were directly above him, how could you see him?\"\n\n" +
        "\"Because I was [[b;green;;;scramble]INVERTED]\"");
    term.echo("\nUnscamble the letters to find your first word" +
        "\n[[b;green;;;scramble]E D E P S Y]"
    );
    processAnswer(scramble1, scramble2);
}

function scramble2() {
    term.echo("\nThis man's work is what you need" +
        "\n[[b;green;;;scramble]T R I J D K S A]"
    );
    processAnswer(scramble2, scramble3);
}

function scramble3() {
    term.echo("\n " +
        "\n[[b;green;;;scramble]A H R I L G M O T]"
    );
    processAnswer(scramble3, scramble4);
}

function scramble4() {
    term.echo("\n You betcha!" +
        "\n[[b;green;;;scramble]E S S N R Y C E A]"
    );
    processAnswer(scramble4, scramble5);
}

function scramble5() {
    term.echo("\n Enter the 3rd, 8th, 6th, 7th char of the unscrambled words and find your next clue!" +
        "\n[[b;green;;;scramble]Talk is cheap, show me you can read the ____]"
    );
    processAnswer(scramble5, theScambledEnd);
}

function theScambledEnd() {

}