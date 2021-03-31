const { Router } = require('express')
const router = Router()
const { getAutos, registrarAuto, editarAuto,eliminar } = require('../service/auto.service');
const verifyToken = require('../middlewares/jwt');

router.use( verifyToken );

router.route('/autoDato')
    .get(getAutos)
    .post(registrarAuto)

router.route('/autoDato/:id')
    .put(editarAuto)
    .delete(eliminar)

module.exports = router