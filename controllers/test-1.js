const { request, response } = require("express");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');

const uploadTest = (req = request, res = response) => {
    //console.log(req.files)
    return res.json({
        ok: true,
        msg: `estas en el subir archivo`
    })
}

module.exports = {
    uploadTest
}