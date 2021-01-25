const Auto = require('../models/auto.model')
const autoService = {}

autoService.getAutos = (req, res) => {
    Auto.find()
        .exec((err, autos) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                autos
            })
        })
}

autoService.registrarAuto = (req, res) => {

    let body = req.body
    console.log(body)
    let auto = new Auto({
        nombre: body.nombre,
        marca: body.marca,
        cantidad: body.cantidad,
        caracteristicas: body.caracteristicas,
        costoAlquiler:body.costoAlquiler
    })

    auto.save((err, autoDB) => {
        if (err) return res.status(400).json({
            ok: false,
            message: "Usuario Repetido",
            err
        });

        res.json({
            ok: true,
            usuario: autoDB
        });

    })
}


autoService.editarAuto = (req, res) => {
    let id = req.params.id
    let body = req.body
    Auto.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        .exec((err, autoDB) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }



            res.json({
                ok: true,
                message: "Auto editado con exito",
                usuario: autoDB
            });

        })

}

module.exports = autoService