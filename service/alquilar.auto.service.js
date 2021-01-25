const AlquilarAuto = require('../models/alquilar.auto.model')
const autos = require("../models/auto.model")
const alquilerService = {}

alquilerService.getAlquileres = (req, res) => {
    AlquilarAuto.find()
        .exec((err, alquiler) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                alquiler
            })
        })
}

alquilerService.getAlquileresCorreo = (req, res) => {
    let body = req.params
    console.log(body)
    AlquilarAuto.find({ correo: body.correo })
        .exec((err, alquiler) => {
            if (err) return res.status(400).json({
                ok: false,
                err
            });
            res.status(200).json({
                ok: true,
                alquiler
            })
        })
}

alquilerService.registrarAlquiler = (req, res) => {

    let body = req.body
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + Number(body.totalDias))



    let alquiler = new AlquilarAuto({
        correo: body.correo,
        id_auto: body.id_auto,
        totalDias: body.totalDias,
        costoAuto: body.costoAuto,
        fechasArriendo: body.fechasArriendo,
        fechasEntraga: fecha,
    })

    alquiler.save((err, alquilerDB) => {
        if (err) return res.status(400).json({
            ok: false,
            message: "Alquiler Repetido",
            err
        });

        res.json({
            ok: true,
            usuario: alquilerDB
        });

    })
}

alquilerService.alquilar = (req, res) => {

    let body = req.body
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + Number(body.totalDias))

    let alquiler = new AlquilarAuto({
        correo: body.correo,
        id_auto: body.id_auto,
        totalDias: body.totalDias,
        costoAuto: body.costoAuto,
        fechasArriendo: body.fechasArriendo,
        fechasEntraga: fecha,
    })

    autos.findById(body.id_auto, (err, data) => {
        let cantidadRestar = Number(data.cantidad)
        if (cantidadRestar !== 0) {
            cantidadRestar = cantidadRestar - 1
            let datoAlquiler = {
                _id: data._id,
                nombre: data.nombre,
                marca: data.marca,
                cantidad: cantidadRestar,
                caracteristicas: data.caracteristicas,
                costoAlquiler: data.costoAlquiler
            }
            autos.findByIdAndUpdate(body.id_auto, datoAlquiler, (err, autoBD) => {
                if (err) return res.status(400).json({
                    ok: false,
                    message: "Alquiler Repetido",
                    err
                });

                alquiler.save((err, alquilerDB) => {
                    if (err) return res.status(400).json({
                        ok: false,
                        message: "Alquiler Repetido",
                        err
                    });

                 return   res.json({
                        ok: true,
                        usuario: alquilerDB
                    });

                })
            })
            // autos.findByIdAndUpdate(body.id_auto)
        }else{
            return   res.status(404).json({
                ok: false,
            }); 
        }
    })
}
alquilerService.devolverAuto = (req, res) => {

    let body = req.body
    const fecha = new Date()
    fecha.setDate(fecha.getDate() + Number(body.totalDias))



    let alquiler = new AlquilarAuto({
        correo: body.correo,
        id_auto: body.id_auto,
        totalDias: body.totalDias,
        costoAuto: body.costoAuto,
        fechasArriendo: body.fechasArriendo,
        fechasEntraga: fecha,
    })

    autos.findById(body.id_auto, (err, data) => {
        let cantidadRestar = Number(data.cantidad)
        if (cantidadRestar >= 0) {
            cantidadRestar = cantidadRestar + 1
            let datoAlquiler = {
                _id: data._id,
                nombre: data.nombre,
                marca: data.marca,
                cantidad: cantidadRestar,
                caracteristicas: data.caracteristicas,
                costoAlquiler: data.costoAlquiler
            }
            autos.findByIdAndUpdate(body.id_auto, datoAlquiler, (err, autoBD) => {
                if (err) return res.status(400).json({
                    ok: false,
                    message: "Alquiler Repetido",
                    err
                });

                res.json({
                    ok: true,
                    usuario: autoBD
                });
            })
            // autos.findByIdAndUpdate(body.id_auto)
        }
    })

}

module.exports = alquilerService