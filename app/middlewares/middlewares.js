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

const validarImagen = (req, res, next) => {

    const img = req.files?.imgfile; //const img = (req.files) ? req.files.img : null; 
    // comprobar si hay fichero imagen
    if (!img) {
        res.status(400).json({
            status:"Error",
            msg:"No se ha subido fichero"
        });
        return;
    }    

    // Comprobar extensión
    const imgNameArr = img.name.split('.');
    const imgExt = imgNameArr[imgNameArr.length-1].toLowerCase();
    const extensionesValidas = ['png','jpg','gif'];

    if (!extensionesValidas.includes(imgExt)){
        res.status(415).json({
            status:"Error",
            msg:"Extensión " + imgExt + " no válida. Las extensiones válidas son: " + extensionesValidas
        });
        return;
    }

    next();
}




const noCacheControl = (req, res, next) => {
    //res.set('Cache-control', 'public, max-age=0');
    res.set('Cache-control', 'no-cache'); 
    next();
}

module.exports = {
    validarCampos,
    authUser,
    validarImagen,
    noCacheControl
}
