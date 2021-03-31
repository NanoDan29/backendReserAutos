const { config } = require('dotenv');

config({
    path: '.env'
});

const { NODE_ENV:env } = process.env;


switch( env ){
    case 'development':
        config({ path: '.env.development'})
        break;
    case 'production':
        config({path: '.env.production'})
        break;
    default:
        throw new Error('Especifica el entorno de ejecución');
}