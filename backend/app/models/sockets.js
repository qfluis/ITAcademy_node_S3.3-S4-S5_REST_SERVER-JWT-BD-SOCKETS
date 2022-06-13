const Salas = require('./salas');



// AUTENTICACIÓN CON JWT - https://desarrolloactivo.com/blog/jwt-socket-io/

class Sockets {
    constructor( io ) {

        this.salas = new Salas();
        // TODO: Listado usuarios x sala ¿?
        // TODO: Actualizar lista usuarios

        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        // On connection
        // TODO: revisar https://socket.io/docs/v4/server-socket-instance/
        this.io.on('connection', ( socket ) => {
            // TODO: obtener token, validarlo, obtener nickname y guardarlo en socket...
            //socket.nickname = nickname;
            //console.log("Cliente conectado", socket.id);
            //socket.join(this.salas[0]); // Por defecto en primera sala (general)

            //socket.emit('lista-salas', this.salas.getSalas());

            socket.on('disconnect', () => {
                //console.log("Cliente desconectado", socket.id);
                //TODO:desconectar de la sala¿?
            });
           
            socket.on("entrar-sala", (/*salaAnterior, */sala) => {
                // https://socket.io/docs/v3/rooms/
                //console.log('socket rooms:',socket.rooms);
                const salaAnterior = Array.from(socket.rooms)[2];

                if (salaAnterior) socket.leave(salaAnterior);
                socket.join(sala);
                //console.log(socket.id, "Entra en sala " + sala);
                
                // emit("entrar-sala ¿?")
                // emit("salir-sala ¿?")
            });

            socket.on('enviar-mensaje', ({sala, usuario, mensaje}) => {
                socket.to(sala).emit('recibir-mensaje', {usuario, mensaje});
            });   
            
            socket.on('get-lista-sala', () => {
                socket.emit('lista-salas', this.salas.getSalas());
            });

            socket.on('crear-sala', (nuevaSala)=> {    
                this.salas.addSala(nuevaSala);
                this.io.emit('lista-salas', this.salas.getSalas());                
            });


        });
    }


}

module.exports = Sockets;