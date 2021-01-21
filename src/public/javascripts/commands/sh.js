/**
 * 
 * @param {String} file 
 */
function sh(file) {
    if (!file) {
        term.echo('sh: No file specified');
        return;
    }
    if(!is_file(file) || !file.endsWith('sh')) {
        term.echo('sh: ' + file + ' is not an executable');
        return;
    }
    var commandName = file.split('.')[0];
    commands[commandName] = window[commandName]();
}