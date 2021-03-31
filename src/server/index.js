const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors')
const endPoint = require('../routes');
const morgan = require('morgan');

class  Server {

    constructor( port,name ){

        this.app = express();
        this.port = port;
        this.name = name;
        this.init();
    }

    init(){
        this.cors();
        this.app.use(bodyparser.urlencoded({extended:true}));
        this.app.use(bodyparser.json());
        this.app.use('/',endPoint );
        this.app.use(morgan('dev'));
    }

    cors(){ 
        this.app.use(cors({
            origin: '*'
        }));
    }

    Listen(callback) {
        return this.app.listen(this.port,callback());
    }

    get Name(){
        return this.name;
    }

    get Port(){
        return this.port;
    }

    set Name(name){
        this.name = name;
    }

    set Port(port){
        this.port = port;
    }
}

module.exports = Server;