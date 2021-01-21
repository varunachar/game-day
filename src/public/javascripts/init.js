// Fake in memory filesystem

var BASE_URL = 'localhost:3000/';

/**
 * Encapsulate all utils
 */
var Utils = {  
    /**
     * 
     * @param {String} val 
     */
    isEmpty : function(val) {
        return val === undefined || val.length == 0 ? true : false;
    }

}

var fs = {
    'help.txt': 'Maybe you should just quit? Type help',
    'projects': {
        'start.txt': 'Hello this is file baz.txt',
        'quux.txt': "Lorem Ispum (quux.txt)",
        'foo.txt': "Hello, World!",
        'bar.txt': "Wellcome to the bar",
        "terminal": {
            "foo": {
                "bar.txt": "hello bar",
                "baz.txt": "baz content"
            }
        }
    }
};

var path = [];
var cwd = fs;

/**
 * 
 * @param {*} fs 
 * @param {Array} path 
 */
function restore_cwd(fs, path) {
    path = path.slice();
    while (path.length) {
        var dir_name = path.shift();
        if (!is_dir(fs[dir_name])) {
            throw new Error('Internal Error Invalid directory ' +
                $.terminal.escape_brackets(dir_name));
        }
        fs = fs[dir_name];
    }
    return fs;
}
function is_dir(obj) {
    return typeof obj === 'object';
}
function is_file(obj) {
    return typeof obj === 'string';
}
var commands = {
    cd: function (dir) {
        this.pause();
        if (dir === '/') {
            path = [];
            cwd = restore_cwd(fs, path);
        } else if (dir === '..') {
            if (path.length) {
                path.pop(); // remove from end
                cwd = restore_cwd(fs, path);
            }
        } else if (dir.match(/\//)) {
            var p = dir.replace(/\/$/, '').split('/').filter(Boolean);
            if (dir[0] !== '/') {
                p = path.concat(p);
            }
            cwd = restore_cwd(fs, p);
            path = p;
        } else if (!is_dir(cwd[dir])) {
            this.error($.terminal.escape_brackets(dir) + ' is not a directory');
        } else {
            cwd = cwd[dir];
            path.push(dir);
        }
        this.resume();
    },
    ls: function () {
        if (!is_dir(cwd)) {
            throw new Error('Internal Error Invalid directory');
        }
        var dir = Object.keys(cwd).map(function (key) {
            if (is_dir(cwd[key])) {
                return key + '/';
            }
            return key;
        });
        this.echo(dir.join('\n'));
    },
    cat: cat,
    less: cat,
    help: function () {
        // Add some funny sentences
        this.echo('Available commands: ' + Object.keys(commands).join(', '));
    },
    pwd: function () {
        this.echo(path.join('/') + "/");
    },
    start: function () {
        var user = {

        };
        var name, email, mobile;
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
                    });
                }
            });
        }

    }
};

function cat(file) {
    if (!is_file(cwd[file])) {
        this.error($.terminal.escape_brackets(file) + " don't exists");
    } else {
        this.echo(cwd[file]);
    }
}

function completion(string, callback) {
    var command = this.get_command();
    var cmd = $.terminal.parse_command(command);
    function dirs(cwd) {
        return Object.keys(cwd).filter(function (key) {
            return is_dir(cwd[key]);
        }).map(function (dir) {
            return dir + '/';
        });
    }
    if (cmd.name === 'ls') {
        callback([]);
    } else if (cmd.name === 'cd') {
        var p = string.split('/').filter(Boolean);
        if (p.length === 1) {
            if (string[0] === '/') {
                callback(dirs(fs));
            } else {
                callback(dirs(cwd));
            }
        } else {
            if (string[0] !== '/') {
                p = path.concat(p);
            }
            if (string[string.length - 1] !== '/') {
                p.pop();
            }
            var prefix = string.replace(/\/[^/]*$/, '');
            callback(dirs(restore_cwd(fs, p)).map(function (dir) {
                return prefix + '/' + dir;
            }));
        }
    } else if (cmd.name === 'cat' || cmd.name === 'less') {
        var files = Object.keys(cwd).filter(function (key) {
            return is_file(cwd[key]);
        });
        callback(files);
    } else {
        callback(Object.keys(commands));
    }
}
var term = $('body').terminal(commands, {
    prompt: 'user@rzp-engg:/' + path.join('/') + '$ ',
    completion: completion,
});

// Hide the copy write text
term.update(0, "Razorpay Engineering, copywrite 2021");