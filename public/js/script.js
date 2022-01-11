const con=document.querySelector('#con')
const des=document.querySelector('#des')
const boton =document.querySelector('#btn')
const texto =document.querySelector('#text')
const socket = io();

socket.on('connect',() =>{
    console.log('Conectado')
    des.style.display = 'none'
    con.style.display=''
})

socket.on('disconnect',() =>{
    console.log('Disconnect del servidor')
    des.style.display = ''
    con.style.display='none'
 //   con.style.display='none'
})

boton.addEventListener('click',() =>{
    const mensaje=texto.value;
    console.log(mensaje)
    socket.emit('enviar-mensaje',mensaje);
})