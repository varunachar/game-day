// Fake in memory filesystem


// Change to localhost:3000 when developing locally
var BASE_URL = 'https://000e83f74dad.ngrok.io';

var path = [];
var cwd = fileSystem.dir;

/**
 * Restore current working directory
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
            cwd = restore_cwd(fileSystem.dir, path);
        } else if (dir === '..') {
            if (path.length) {
                path.pop(); // remove from end
                cwd = restore_cwd(fileSystem.dir, path);
            }
        } else if (dir.match(/\//)) {
            var p = dir.replace(/\/$/, '').split('/').filter(Boolean);
            if (dir[0] !== '/') {
                p = path.concat(p);
            }
            cwd = restore_cwd(fileSystem.dir, p);
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
    sh: sh,
    cat: cat,
    less: cat,
    help: function () {
        // Add some funny sentences
        this.echo('Available commands: ' + Object.keys(commands).join(', '));
    },
    pwd: function () {
        this.echo(path.join('/') + "/");
    },
    start: start,
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
                callback(dirs(fileSystem.dir));
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
            callback(dirs(restore_cwd(fileSystem.dir, p)).map(function (dir) {
                return prefix + '/' + dir;
            }));
        }
    } else if (cmd.name === 'cat' || cmd.name === 'less' || cmd.name === 'sh') {
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
    greetings: "Razorpay Engineering, copywrite 2021",
    completion: completion,
    exceptionHandler: function(exception) {
        if (exception) {
            term.echo("[[;red;]" + exception.message + "]");
        }
        else {
            term.echo("[[;red;]sh: command not found" + exception.message + "]");
        }
    }
});