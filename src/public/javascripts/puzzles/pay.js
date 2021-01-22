function pay() {
    window.user.playLevel(razorpays);
}

function razorpays() {
    term.echo("\n\n\n\"No hints this time!\"\n\n");
    processAnswer(razorpays, youWin);
}

function youWin() {
    term.echo("\n\n\n\nYou win, you deserve it!");
}
