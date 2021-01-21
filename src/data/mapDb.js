const mapDb = {
    1 : {
        Documents: {
            startup: {
                tesla : {
                    'about.txt' : '\n\nI make awesome cars\n\n'
                },
                razorpay: {

                },
                spacex: {
                    'lander.sh' : '\n\n\n Elon Musk would be proud of you! Here\'s your next clue:  \n\n'
                }
            }
        },
        Downloads: {

        },
        Music: {

        },
        Movies: {

        },
        Library: {

        },
        Applications: {

        },
    },
    searchFolder: function(stage, folder) {
        folders = this[stage];
        return search(folders, folder) ? true : false;
    }
}


/**
 * 
 * @param {Object} obj 
 * @param {String} folder 
 */
function search(obj, folder) {
    for (const [key, value] of Object.entries(obj)) {
        if(folder === key) {
            return true;
        }
        else if (typeof key === Object) {
            return search(value);
        }
    }
}

exports.mapDb = mapDb;