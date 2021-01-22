/**
 * Executes a file by adding command and then executing it.
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
    var puzzle = file.split('.')[0];
    window[puzzle]();
}