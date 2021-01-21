function start() {
    var user = {};
    readName();
    function readName() {
        term.read('Enter name: ').then(function (val) {
            if (Utils.isEmpty(val)) {
                readName();
            }
            else {
                user.name = val;
                readEmail();
            }
        });
    }

    function readEmail() {
        term.read('Enter email: ').then(function (val) {
            if (Utils.isEmpty(val)) {
                readEmail();
            }
            else {
                user.email = val;
                readMobile();
            }
        });
    }

    function readMobile() {
        term.read('Enter mobile: ').then(function (val) {
            if (Utils.isEmpty(val)) {
                readMobile();
            }
            else {
                user.mobile = val;
                term.pause();
                // Register the user
                jQuery.ajax({
                    "url": '/users/register',
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify(user),
                }).done(function (resp) {
                    var parsed = JSON.parse(resp);
                    var user = new User(parsed.user.id,
                        parsed.user.name,
                        parsed.user.email,
                        parsed.user.phone,
                    );
                    window.user = user;
                    fileSystem.addFolders(parsed.folders);
                    term.echo("\n\n\nThank you! \n\n\nOf Course I Still Love You");
                }).always(function () {
                    term.resume();
                });
            }
        });
    }
}