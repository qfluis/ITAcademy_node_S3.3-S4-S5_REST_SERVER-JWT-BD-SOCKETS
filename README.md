# Entrega 4.2: Node REST + DB + JWT
## inicializar proyecto
Es necesario tener instalado npm.
### Instalar dependencias
```
npm install
```
### Configurar variables de entorno:
configurar fichero .env en la carpeta raiz del proyecto. Puedes encontrar en .env-dev las variables de entorno utilizadas en desarrollo.
```
PORT=3333
MYSQL_DB_NAME=dado_juego
MYSQL_USER=root
MYSQL_PASS=olakease1234!
MYSQL_HOST=localhost
MYSQL_PORT=3306
API_LOGIN_EMAIL=qfluis@gmail.com
API_LOGIN_PASS=123456
JWT_SECRET_PRIVATE_KEY=noselodigasanadie
```
### Base de datos
Es necesario tener una base de datos creada en mysql, con el nombre indicado en la variable de entorno *MYSQL_DB_NAME*. Las tablas se crean automáticamente.
Puedes encontrar el script SQL para crear la BD en el fichero `./mysql/create_bd.sql`, el código que contiene es el siguiente:
```
CREATE SCHEMA `dado_juego` DEFAULT CHARACTER SET utf8mb4 ;
```

### Iniciar el servidor:
```
npm start
```
## Servidor web
Este servidor puede mostrar los archivos situados en la carpeta public. El endpoint es "/"

## Endpoints API
A tener en cuenta:
- Todas las peticiones a endpoints (excepto POST api/auth/login), deberán incluir en headers la key **jwt-token**, con el valor del token de autenticación. 
- Para todas las peticiones que requieran un body, este deberá estar en formato JSON.
### POST /api/auth/login
Esta petición nos permite autenticarnos. Deberemos incluir en el body de la petición los atributos *email* y *pass*.
Si el login es correcto recibiremos como respuesta el JWT token necesario para poder realizar todas las peticiones a la api.
Ejemplo de body de la petición:
```
{
    "email":"qfluis@gmail.com",
    "pass":"123456"
}
```
Ejemplo de respuesta:
```
{
    "msg": "login correcto 👍",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InFmbHVpc0BnbWFpbC5jb20iLCJpYXQiOjE2NTIxMzE3NDMsImV4cCI6MTY4MzY2Nzc0M30.Vcx_QXRf0ZFT8KOtilIJJiP8sbzZFoREUNxXUXOYtIw"
}
```
### POST /api/players
Crea un jugador, si se le facilita el atributo *nombre*, creará el jugador con ese nombre, siempre y cuando no esté ya en la base de datos. Si no se le facilita *nombre* lo dará de alta sin especificar el nombre.
Si el usuario se ha creado con éxito obtendremos una respuesta con status 201. Si el usuario ya existe obtendrás una respuesta con status 400.
Ejemplo del body de una petición, enviando el nombre:
```
{
    "nombre":"Luis"
}
```

### PUT /api/players
Modifica un jugador, pasando el *id* o *nombre* además del *nuevoNombre*. Si se facilitan *id* y *nombre* el sistema hará la petición teniendo en cuenta el *id*. Si la petición es exitosa recibirás una respuesta con status 201. Si el *nuevoNombre* ya está en la base de datos obtendrás una respuesta con status 400.
Ejemplo del body de la petición:
```
{
    "id":4,
    "nuevoNombre":"Wow"
}
```
### POST /api/players/{id}/games
El jugador con el *id* especificado como parámetro, realiza una tirada. El resultado se envia como respuesta a la petición, además de guardarse en la base de datos.
No hay que incluir parámetros en el body.
Ejemplo de respuesta a la petición:
```
{
    "msg": "Tirada efectuada",
    "jugada": {
        "id": 78,
        "idJugador": 1,
        "dado1": 1,
        "dado2": 2,
        "resultado": 3,
        "exito": false,
        "updatedAt": "2022-05-09T21:09:18.628Z",
        "createdAt": "2022-05-09T21:09:18.628Z"
    }
}
```
### DELETE /api/players/{id}/games
Elimina todos los juegos que haya hecho un jugador, cuyo *id* se facilita como parámetro de la petición. Las estadísticas del jugador también serán eliminadas.
Si la petición es exitosa se recibe una respuesta con status 200.

### GET /api/players
Obtenemos listado de jugadores junto con sus estadísticas.
Ejemplo de respuesta exitosa (status 200): 
```
{
    "msg": "Listado obtenido",
    "jugadores": [
        {
            "id": 1,
            "nombre": "Luisetete",
            "juegos": 43,
            "juegosGanados": 7,
            "ratio": "0.16"
        },
        {
            "id": 2,
            "nombre": "Cris",
            "juegos": 22,
            "juegosGanados": 3,
            "ratio": "0.14"
        },
        {
            "id": 3,
            "nombre": "Kika",
            "juegos": 0,
            "juegosGanados": 0,
            "ratio": "0.00"
        }
    ]
}
```
### GET /api/players/{id}/games
Obtenemos el listado de juegos de un jugador. Debemos especificar el *id* del usuario como parámetro de la petición.
Ejemplo de respuesta exitosa (status 200):
```
{
    "msg": "Listado obtenido correctamente",
    "jugadas": [
        {
            "id": 1,
            "idJugador": 1,
            "dado1": 4,
            "dado2": 2,
            "resultado": 6,
            "exito": false,
            "createdAt": "2022-05-03T13:25:03.000Z",
            "updatedAt": "2022-05-03T13:25:03.000Z"
        },
        {
            "id": 2,
            "idJugador": 1,
            "dado1": 4,
            "dado2": 5,
            "resultado": 9,
            "exito": false,
            "createdAt": "2022-05-03T13:25:04.000Z",
            "updatedAt": "2022-05-03T13:25:04.000Z"
        },
        {
            "id": 3,
            "idJugador": 1,
            "dado1": 4,
            "dado2": 5,
            "resultado": 9,
            "exito": false,
            "createdAt": "2022-05-03T13:25:05.000Z",
            "updatedAt": "2022-05-03T13:25:05.000Z"
        }      
    ]
}
```
### GET /api/players/ranking
Esta petición nos devuelve el ratio de aciertos de los jugadores.
Un ejemplo de respuesta exitosa (status 200):
```
{
    "msg": "Promedio aciertos jugadores obtenido correctamente",
    "ratioAciertos": 0.15384615384615385
}
```
### GET /api/players/ranking/loser
Esta petición nos devuelve el peor jugador.
Un ejemplo de la respuesta exitosa (status 200):
```
{
    "msg": "Loser obtenido correctamente",
    "loser": {
        "id": 3,
        "nombre": "Kika",
        "juegos": 0,
        "juegosGanados": 0,
        "ratio": "0.00"
    }
}
```
### GET /api/players/ranking/winner
Esta petición nos devuelve el mejor jugador.
Un ejemplo de la respuesta exitosa (status 200):
```
{
    "msg": "Winner obtenido correctamente",
    "winner": {
        "id": 1,
        "nombre": "Luisetete",
        "juegos": 43,
        "juegosGanados": 7,
        "ratio": "0.16"
    }
}
```

TODO:BORRAR 
# CORRECCIONES
- [x] Habría que quitar todas las vistas del server! Las rutas que no sean los endpoints especificados tienen que devolver 404 con un mensaje de not found, ninguna un HTML (ni un 400 bad request, que hay alguna!) ❗
- [ ] En el ranquing loser y winner, si hay jugadores empatados deberias devolverlos todos
- [ ] No entiendo el login! Puedo hacer login y obtener el token, pero he podido hacer todo sin loguearme hasta llegar a la ruta de despues de obtener el token que no me la admite (y no encuentro la diferencia con las anteriores 😅)
- [ ] La colección de postman habría que simplificarla: no hace falta probar todos los errores y las rutas inexistentes... Con crear una petición para cada endpoint que funcione es suficiente, el cliente ya se encargará de hacerlas fallar si hace falta. Como mucho se puede añadir alguna extra en "ejemplos" si hay alguna cosa muy concreta que es importante hacer notar
# TODOs
- Persistencia Mongo
- Colección postman (test) / Colección postman ejemplo API
