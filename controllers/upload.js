const { request, response } = require("express");

const guardarImagen = (req=request,res=response)=>{
    return res.json({
        ok:true,
        msg:`estas en el guardar imagen`
    })

}
module.exports={
    guardarImagen
}