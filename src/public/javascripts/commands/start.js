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
                // Register the user
                jQuery.ajax({
                    "url": '/users/register',
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify(user),
                    "success" : function(resp) {
                        var parsedResponse = JSON.parse(resp);
                        window.user = parsedResponse.user;
                        fileSystem.addFolders(parsedResponse.folders);
                        term.echo("\n\n\nRegistered, look again!");
                    }
                });
            }
        });
    }
}