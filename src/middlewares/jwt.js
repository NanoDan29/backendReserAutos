const { verify } = require('jsonwebtoken');

const verifyToken = (req,res,next) => {

    try {
        const token = req.header('X-token');

        if( !token ){
            return res.status(400).json({
                ok: false,
                message: 'No existe el token'
            })
        }else {
            const { SEED } = process.env;
            verify(token,SEED, (err,payload) => {
                if( err ) return res.status(403).json({
                    ok: false,
                    message: 'El token es invalido'
                });

                req.body.tokenPayload = payload;
                return next();
            })
        }
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        }) 
    }
}

module.exports = verifyToken;