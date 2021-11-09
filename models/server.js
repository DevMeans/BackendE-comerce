const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express()
        this.port = 3000
        this.paths = {
            usuario: '/api/usuario'
        }
        this.middlewares()
        this.routes()
    }
    middlewares() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    routes() {
        this.app.use(this.paths.usuario, require('../routes/usuario'))
    }
    listen(){
        this.app.listen(this.port, () => console.log(`Servidor corriendo en el puerto  ${this.port}`))
    }

}
module.exports = {
    Server
}