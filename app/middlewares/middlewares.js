const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}


const authUser = (req, res, next) => {
    const { user, pass } = req.headers;
    const { USER, PASS } = process.env;

    if(user !== USER || pass !== PASS) {
        res.status(401).json({
            status:"Error", 
            msg:"Usuario y/o password incorrectos"
        });
        return;
    }
    next();
}



module.exports = {
    validarCampos,
    authUser
}
