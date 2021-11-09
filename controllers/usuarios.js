const { response, request } = require("express")

const crear=(req=request,res=response)=>{
    res.json({
        ok:true,
        msg:'Estas en el controlador crear usuario !!!!'
    })
}
module.exports={
    crear
}