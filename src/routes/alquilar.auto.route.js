const { Router } = require('express')
const router = Router()
const { getAlquileres, registrarAlquiler, alquilar, devolverAuto, getAlquileresCorreo } = require("../service/alquilar.auto.service")
const verifyToken = require('../middlewares/jwt');

router.use( verifyToken );

router.route('/auto')
    .get(getAlquileres)
    .post(alquilar)
    .put(alquilar)

router.route('/devolver')
    .put(devolverAuto)

router.route('/auto/:correo')
    .get(getAlquileresCorreo)

module.exports = router