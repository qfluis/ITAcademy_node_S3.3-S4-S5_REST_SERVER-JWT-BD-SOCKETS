const { Router } = require('express');
const cors = require('cors');
const path = require('path');

const router = Router();

const respuestaEstandar = (res, statusCode, status, msg) => {
    res.status(statusCode).json({
        status,
        msg
    });
}

// Nivel 1 Ejercicio 1 ##################################################################
router.get('/user', (req, res) => {
    res.status(200).json({
        name: 'Luis',
        edad: 41,
        url: req.protocol + "://" + req.get('Host') + req.originalUrl
    });
});

// Nivel 1 Ejercicio 2 ##################################################################
router.post('/upload', (req, res) => {
    
    const img = req.files?.imgfile;
    //const img = (req.files) ? req.files.img : null; 
   
    if (!img) { // !req.files || !req.files.imgfile
        respuestaEstandar(res, 400, "Error", "Nos se ha subido fichero");
        return;
    }        

    const imgNameArr = img.name.split('.');
    const imgExt = imgNameArr[imgNameArr.length-1].toLowerCase();
    const extensionesValidas = ['png','jpg','gif'];

    if (!extensionesValidas.includes(imgExt)){
        const msg = "Extensión " + imgExt + " no válida. Las extensiones válidas son: " + extensionesValidas;
        respuestaEstandar(res, 415, "Error", msg);
        return;
    }

    const f = (new Date()).toISOString();
    console.log(f);
    const marcaFecha = f.replaceAll(':','-').replace('T','-').replace('.','-').replace('Z','');
    
    const imgPath = path.join(__dirname, "../uploads/", marcaFecha  + "-" + img.name);

    img.mv(imgPath, ( err ) => {
        if ( err ){
            respuestaEstandar(res, 500, "Error", err);
            return;
        }

        respuestaEstandar(res, 200, "OK", "imagen subida");
    });    
});

// Nivel 2 Ejercicio 1 + Nivel 3 Ejercicio 1 ############################################
/*
TODO: DUDAS: no se si tienen que ser los dos middlewares en uno solo o así vale.
No tengo claro si se aplican a /time o a todo.
*/

router.use('/time', (req, res, next) => {
    //res.set('Cache-control', 'public, max-age=0');
    res.set('Cache-control', 'no-cache'); 
    next();
});

router.use('/time', cors()); 

// N3 E1
router.use('/time', (req, res, next) => {
    const user = req.headers.user;
    const pass = req.headers.pass;
    if(!user || !pass) {
        respuestaEstandar(res, 401, "Error", "Usuario y/o contraseña no proporcionados");
        return;
    }
    // damos por hecho que user y pass son correctos
    next();
});

router.post('/time', ( req, resp ) => {
    const user = req.body?.username;
    if(!user) {
        respuestaEstandar(res, 401, "Error", "Usuario no indicado");
        return
    }
    const today =(new Date()).toISOString().split('T');
    resp.status(200).json({
        fecha: today[0],
        hora: today[1].substring(0,8)
    })
})


// 404
router.use((req, res, next) => {
    respuestaEstandar(res, 404, "Error", "Ups! not found");
});








module.exports = router;