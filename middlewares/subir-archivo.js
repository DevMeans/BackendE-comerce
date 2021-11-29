const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');


cloudinary.config({
    cloud_name: "personal-proyect",
    api_key: "441393425591382",
    api_secret: "nkyXIA0VB-K8sno_YXdiczuZnPQ",
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "DEV",
    }
});

const upload = multer({ storage: storage }).array('img') //tomar esta funcion aparte como disparador del evento
module.exports = {
    upload
}