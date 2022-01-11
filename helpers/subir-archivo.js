const path = require('path')
const { v4: uuidv4 } = require('uuid');
const subirArchivo = (files, extencionesValidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { img } = files
        const nombreCortado = img.name.split('.')
        const extencion = nombreCortado[nombreCortado.length - 1]
        if (!extencionesValidas.includes(extencion)) {
            reject(`La extencion ${extencion} no es permitida ${extencionesValidas}`)
        }
        const nombreTemp = uuidv4() + '.' + extencion
        const uploadPath = path.join(__dirname + '../../uploads/' + nombreTemp);
        console.log(uploadPath)
        // Use the mv() method to place the file somewhere on your server
        img.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
            resolve(uploadPath)
        });
    })


}


module.exports = {
    subirArchivo
}