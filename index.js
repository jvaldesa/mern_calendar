const express = require('express')
require('dotenv').config()
const cors = require('cors')
const {dbConnection} = require('./database/config')


// Crear el servidor de express
const app = express()


// Base de datos
dbConnection()


// CORS => Intercambio de Recursos de Origen Cruzado (CORS) es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador.
app.use(cors())

//Directorio publico
app.use(express.static('public'))

// Lectura y parseo del body
app.use(express.json())

//Rutas
// TODO: auth // crear, login, renew
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))
// TODO: CRUD: Eventos


app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

//Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})
