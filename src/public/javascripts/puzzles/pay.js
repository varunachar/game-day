function pay() {
    window.user.playLevel(razorpays);
}

function razorpays() {
    term.echo("\n\n\n\"No hints this time!\"\n\n");
    processAnswer(razorpays, youWin);
}

function youWin() {
    term.echo("\n\n\nWow! It works on our machine! You're at the top of the stack! We'll be in touch real soon.");
}
