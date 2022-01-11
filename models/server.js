const express = require('express')
const cors = require('cors')
const { ConexionMongoDB } = require('../database/config')
const fileUpload = require('express-fileupload');
class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            usuario: '/api/usuario',
            auth: '/api/auth',
            categoria: '/api/categoria',
            producto: '/api/producto',
            upload: '/api/upload'
        }
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.conexMongoDB()
        this.middlewares()
        this.routes()
        this.sockets()
    }
    async conexMongoDB() {
        await ConexionMongoDB()
    }

    middlewares() {

        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(fileUpload({
            createParentPath: true,
            useTempFiles: true
        }));

    }
    sockets() {
        this.io.on('connection', socket => {
            console.log('Cliente conectado',socket.id)
            socket.on('disconnect', () => {
                console.log('Cliente Desconectado',socket.id)
            })
            socket.on('enviar-mensaje',(payload)=>{
                console.log(payload)
            })
        })
    }

    routes() {
        this.app.use(this.paths.usuario, require('../routes/usuario'))
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.categoria, require('../routes/categoria'))
        this.app.use(this.paths.producto, require('../routes/producto'))
        this.app.use(this.paths.upload, require('../routes/upload'))
    }
    listen() {
        this.server.listen(this.port, () => console.log(`Servidor corriendo en el puerto  ${this.port}`))
    }

}
module.exports = {
    Server
}