const { connect } = require('mongoose');

const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

class Database{
    constructor( ){
        this.uri = process.env.DB_URI;
    }

    Connection ( ){
        return connect(this.uri,options)
    }
}

module.exports = Database;