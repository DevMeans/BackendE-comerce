const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require('multer');
cloudinary.config({
    cloud_name: "personal-proyect",
    api_key: "441393425591382",
    api_secret: "nkyXIA0VB-K8sno_YXdiczuZnPQ",
});

const storage = new CloudinaryStorage({//hacer dinamico el folder de guardado
    cloudinary: cloudinary,
    params: {
        folder: "DEV"
    }
});
const upload = multer({ storage: storage }).array('img')

module.exports = {
    upload
}