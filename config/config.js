process.env.PORT = process.env.PORT || 4000

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ============================
//  Base de datos
// ============================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = "mongodb://localhost:27017/reservaAutos";
} else {
    urlDB = "mongodb+srv://autos:123@cluster0.kgukc.mongodb.net/autos?retryWrites=true&w=majority"
}

process.env.URLDB = urlDB;