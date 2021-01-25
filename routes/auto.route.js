const { Router } = require('express')
const router = Router()
const { getAutos, registrarAuto, editarAuto } = require('../service/auto.service')

router.route('/autoDato')
    .get(getAutos)
    .post(registrarAuto)

router.route('/autoDato/:id')
    .put(editarAuto)

module.exports = router