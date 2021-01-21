var fileSystem = {
    dir: {
        'help.txt': 'Maybe you should quit? Well.. let me get you started, type help',
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
    /**
     * Unused
     * @param {String} dir 
     */
    isLocked: function(dir) {
        return jQuery.ajax({
            "url": '/map/folder',
            "method": "POST",
            "timeout": 10,
            "headers": {
                "Content-Type": "application/json",
                "userId" : window.user.id,
            },
            "data": JSON.stringify({"folder": dir})
        });
    }
};