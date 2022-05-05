const path = require('path');
const axios = require('axios').default;


// Nivel 1 Ejercicio 1 ##################################################################
const getUser = (req, res) => {
    res.status(200).json({
        name: 'Luis',
        edad: 41,
        url: req.protocol + "://" + req.get('Host') + req.originalUrl,
        //url2: req.protocol + "://" + req.get('Host') + req.url  
    });
}


// Nivel 1 Ejercicio 2 ##################################################################
const uploadFile = (req, res) => {
    
    const img = req.files?.imgfile;
    //const img = (req.files) ? req.files.img : null; 
    const f = (new Date()).toISOString();
    const marcaFecha = f.replaceAll(':','-').replace('T','-').replace('.','-').replace('Z','');
    const imgPath = path.join(__dirname, "../uploads/", marcaFecha  + "-" + img.name);

    img.mv(imgPath, ( err ) => {
        if ( err ){
            res.status(500).json({
                status:"Error",
                msg:"Error al subir fichero",
                err
            });

            return;
        }

        res.status(200).json({
            status:"OK",
            msg:"imagen subida"
        });
    });    
}

const postTime = ( req, resp ) => {
    
    const today =(new Date()).toISOString().split('T');
    resp.status(200).json({
        fecha: today[0],
        hora: today[1].substring(0,8)
    })
}

const getPokemon = async (req, res) => {
    const { id } = req.params;

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    //const data = await response.json();





    
    res.status(200).json({
        status:"OK",
        response
    })

}


module.exports = {
    getUser,
    uploadFile,
    postTime,
    getPokemon
}