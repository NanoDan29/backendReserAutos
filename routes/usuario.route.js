const { Router } = require('express')
const router = Router()
const { getUsuario,
    login,
    registro,
    editarUsuario,
    borrarUsuario
} = require('../service/usuario.service')

router.route('/usuario')
    .get(getUsuario)
    .post(registro)
    .delete(borrarUsuario)

router.route('/usuario/:id')
    .put(editarUsuario)

router.route('/usuario/login')
    .get(login)

module.exports = router