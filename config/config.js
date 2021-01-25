process.env.PORT = process.env.PORT || 4000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/reservaAutos';
} else {
    urlDB = `mongodb+srv://jhoel:123@cluster0.pudma.mongodb.net/<dbname>?retryWrites=true&w=majority;`
}

process.env.URLDB = urlDB;