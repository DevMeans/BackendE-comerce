const mongoose = require('mongoose');

const ConexionMongoDB = async () => {
    try {

        await mongoose.connect(process.env.CN_MONGO);
        console.log('Conexion existosa')

    } catch (error) {
        throw new Error('Conexion no existosa')
    }

}
module.exports = {
    ConexionMongoDB
}