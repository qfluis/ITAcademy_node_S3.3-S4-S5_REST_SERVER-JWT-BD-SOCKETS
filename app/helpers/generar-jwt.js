const jwt = require('jsonwebtoken');

const generarJWT = async ( email ) =>{
    const payload = { email };
    // Tiempo de expiración largo para facilitar el desarrollo
    // Una vez en producción es recomendable un tiempo más corto.
    const token = jwt.sign( payload, process.env.JWT_SECRET_PRIVATE_KEY, {
        expiresIn:"365d"
    });

    return token;       
}


module.exports = {
    generarJWT
}