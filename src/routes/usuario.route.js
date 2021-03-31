const { Router } = require('express')
const router = Router()
const { getUsuario,
    login,
    registro,
    editarUsuario,
    borrarUsuario,
    refresToken
} = require('../service/usuario.service');
const verifyToken = require('../middlewares/jwt');

router.route('/usuario')
    .get(getUsuario)
    .post(registro)
    .delete(borrarUsuario)

router.route('/usuario/:id')
    .put(editarUsuario)

router.route('/usuario/login')
    .post(login)

router.route('/refreshToken')
    .get(verifyToken,refresToken)


module.exports = router