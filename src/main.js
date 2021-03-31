require('./config');
const Database = require('./config/database');
const Server = require('./server');

const database = new Database();

database.Connection()
    .then(() => console.log('database connected'))
    .then(() => {
        const { PORT,APP_NAME } = process.env;
        const server = new Server( PORT,APP_NAME );
        server.Listen(() => console.log(`listenging app ${server.Name} on port ${server.Port}`));
    })
    .catch( console.log )