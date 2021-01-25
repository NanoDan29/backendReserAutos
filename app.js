require('./config/config')

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyparser = require('body-parser');
const cors = require('cors')
const usuario = require('./routes/usuario.route')
const auto = require('./routes/auto.route')
const alquiler = require('./routes/alquilar.auto.route')

//Habilitamos cors
app.use(cors())

// parse application/x-www-form-urlencoded para tomar fomularios html
app.use(bodyparser.urlencoded({ extended: false }))

// parse aplication/json
app.use(bodyparser.json())

app.use("/", usuario)
app.use("/auto", auto)
app.use("/alquiler", alquiler)



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});