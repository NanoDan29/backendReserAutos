process.env.PORT = process.env.PORT || 4000




// ============================
//  Base de datos
// ============================
let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/reservaAutos';
// } else {
    urlDB = `mongodb+srv://jhoel:123@cluster0.pudma.mongodb.net/%3Cdbname%3E?retryWrites=true&w=majority;`
// }

process.env.URLDB = urlDB;