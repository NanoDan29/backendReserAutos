const Usuario = require('../models/usuario')
const bcrypt = require('bcrypt');
const generateJWT = require('../helpers/jtw');
const usuarioService={}



usuarioService.getUsuario=(function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find()
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count((err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                });

            });


        });


});

usuarioService.login=(function (req, res) {

    let body = req.body;

    console.log(body)
   
    Usuario.findOne({ email: body.email }, (err, usuario) => {

        if (err) return res.status(400).json({ ok: false, err })

        if (!usuario) return res.status(404).json({ ok: false, msg: 'el usuario no existe' })

     
      
        bcrypt.compare(body.password, usuario.password,
            (err, resBcrypt) => {
                if (err) return res.status(404).json({ ok: true, err })
                if (!resBcrypt) return res.json({ ok: false, msg:'contraseña invalida' })

                const token = generateJWT({uid:usuario._id,username:usuario.nombre});
                res.status(200).json({ ok: true, token })
            })

    });


});



usuarioService.registro=(function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                message: "Auto Repetido",
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

usuarioService.editarUsuario=(function (req, res) {

    let id = req.params.id;
    let usuario=req.body

    usuario.password=bcrypt.hashSync(usuario.password, 10)

    console.log(usuario)

    Usuario.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        .exec((err, usuarioDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }



            res.json({
                ok: true,
                usuario: usuarioDB
            });

        })

});

usuarioService.borrarUsuario=('/usuario/:id', function (req, res) {


    let id = req.params.id;

    // Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

usuarioService.refresToken = (req,res) => {
    const { uid, username } = req.body.tokenPayload;
    const token = generateJWT({uid,username});
    return res.json({
        ok:true,
        token
    })
}

module.exports = usuarioService;