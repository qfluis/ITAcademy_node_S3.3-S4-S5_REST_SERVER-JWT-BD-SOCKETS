const respuestaEstandar = (res, statusCode, status, msg) => {
    res.status(statusCode).json({
        status,
        msg
    });
}




// Nivel 1 Ejercicio 1 ##################################################################
const getUser = (req, res) => {
    res.status(200).json({
        name: 'Luis',
        edad: 41,
        url: req.protocol + "://" + req.get('Host') + req.originalUrl
    });
}


// Nivel 1 Ejercicio 2 ##################################################################
const uploadFile = (req, res) => {
    
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
}








const postTime = ( req, resp ) => {
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
}


module.exports = {
    getUser,
    uploadFile,
    postTime
}