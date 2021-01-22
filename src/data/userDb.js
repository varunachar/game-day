const usersDb = {

    /**
     * Returns the user having the passed id
     * @param {User} id 
     */
    get: function(id) {
        return this[id];
    },
    /**
     * Saves the user
     * @param {User} user 
     */
    save: function(user) {
        this[user.id] = user;
    },

    sortByLeader: function() {
      return this;  
    }
}

exports.usersDb = usersDb;