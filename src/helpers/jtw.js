const { sign } = require("jsonwebtoken");


const generateJWT = ({uid,username}) => {
    const { SEED } = process.env;
    const payload = { uid,username };

    console.log('generando token');
    
    return sign( payload, SEED, {
        expiresIn: '2h'
    });
}

module.exports = generateJWT;
