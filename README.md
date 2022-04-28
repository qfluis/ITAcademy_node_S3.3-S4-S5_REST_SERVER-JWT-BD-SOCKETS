🧬 #Instruccions per a iniciar el projecte:
Instal·lar els mòduls amb "npm install"

Per a iniciar el server:

Mode producció: npm start
Mode desenvolupament: npm run dev

Si fem a un navegador o al postman:

(GET) localhost:3009/user : Et retorna un json amb el meu nom, la meva edat i la URL.

(POST) localhost:3009/upload : Carrega arxius amb extensions .jpg .png y .gif i els guarda al servidor

(POST) localhost:3009/time : Rep per POST com a paràmetre un JSON amb el nom d'usuari i et retorna un json que conté l'hora i data actual, després d'haver comprovat una autorització bàsica