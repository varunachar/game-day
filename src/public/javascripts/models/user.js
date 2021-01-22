class User {

    constructor(id, name, email, phone) {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.id = id;
      this.level = 1;
    };
  
    getUser() {
      return {
        name : this.name,
        email: this.email,
        phone: this.phone,
        level: this.level,
        id: this.id,
      };
    };
  
    /**
     * Checks the current level of the user and then allows game play
     * @param {Function} playFn 
     */
    playLevel(playFn) {
        term.pause();
        jQuery.ajax({
            "url": BASE_URL+'/puzzles/level',
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "userId": this.id,
            },
            data: JSON.stringify({puzzle : playFn.name})
        }).done(function (resp) {
            var playable = JSON.parse(resp).playable;
            if(!playable) {
                term.echo("Don't get ahead of yourself. Finish the others first");
            }
            else {
                playFn();
            }
        }).fail(function(xhr, status, err) {
            term.echo('You got rate limited');
        }).always(function () {
            term.resume();
        });
    }
  
  }