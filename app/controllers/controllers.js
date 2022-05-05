const path = require('path');
const axios = require('axios').default;

const getUser = (req, res) => {
    res.status(200).json({
        name: 'Luis',
        edad: 41,
        url: req.protocol + "://" + req.get('Host') + req.originalUrl,
        //url2: req.protocol + "://" + req.get('Host') + req.url  
    });
}

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
    let response;

    try {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
    } catch ( err ){
        console.log();
        res.status(err.response.status).json({
            status: "Error",
            msg: err.message
        });
        return
    }
     
    
    const {name, height, weight, sprites} = response.data;
    
    const pokemon = {
        name,
        height,
        weight,
        sprite: sprites.front_default || "no sprite available"
    }
    
    res.status(200).json({
        status:"OK",
        pokemon
    });

}


module.exports = {
    getUser,
    uploadFile,
    postTime,
    getPokemon
}