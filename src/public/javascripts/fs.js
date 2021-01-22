var fileSystem = {
    dir: {
        'help.txt': '\n\nSo soon? Well.. let me get you started, type help\n\n',
    },
    /**
     * Adds the folders to root
     * @param {Object} folders 
     */
    addFolders: function (folders) {
        for (const [key, value] of Object.entries(folders)) {
            this.dir[key] = value;
        }
    },
};