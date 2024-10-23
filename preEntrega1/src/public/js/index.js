console.log("hola mundo desde socket io")
const inputMensaje = document.getElementById("mensaje")
const inputTitle = document.getElementById("title")


const socket = io()
const divTemperatura = document.getElementById('temperatura')

socket.on("nuevaLecturaTemperatura", datos => {
    //console.log(`La temperatura actual es de °${datos}`) 
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
})

/* socket.on("nuevo", datos => {
    //console.log(`La temperatura actual es de °${datos}`) 
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
}) */




/* este está casi listo */
socket.on("nuevo", dato => {
    console.log(dato)
    let p = document.createElement("p")
    p.classList.add("producto")
    let s = document.createElement("strong")
    let sp = document.createElement("span")
    let i = document.createElement("i")
    s.textContent = nombre
    sp.textContent = " dice "
    i.textContent = dato.title
    p.append(s, sp, i)
    divProductos.append(p)
    divProductos.scrollTop = divProductos.scrollHeight
})

/* socket.on("nuevo", datos => {
    console.log(`Se ha creado un nuevo producto ${datos.title}`)
}) */

/* //ejemplo mandando dos datos
socket.on("nuevo2", (user, dato) => {
    console.log(`se ha creado el usuario ${user}`, dato)
})
 */



console.log("hola mundo desde socket io")
const inputMensaje = document.getElementById("mensaje")
const divProductos = document.getElementById("productos")


const socket = io()
const divTemperatura = document.getElementById('temperatura')


socket.on("nuevaLecturaTemperatura", datos => {
    //console.log(`La temperatura actual es de °${datos}`) 
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
})

/* socket.on("nuevo", datos => {
    //console.log(`La temperatura actual es de °${datos}`) 
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
}) */


/* este está casi listo */
socket.on("nuevo", dato => {
    console.log(dato)
    let p = document.createElement("p")
    p.classList.add("producto")
    let s = document.createElement("strong")
    let sp = document.createElement("span")
    let i = document.createElement("i")

    s.textContent = nombre
    sp.textContent = " dice "
    i.textContent = dato.title
    p.append(s, sp, i)
    divProductos.append(p)
    divProductos.scrollTop = divProductos.scrollHeight

})

/* socket.on("nuevo", datos => {
    console.log(`Se ha creado un nuevo producto ${datos.title}`)
}) */

/* //ejemplo mandando dos datos
socket.on("nuevo2", (user, dato) => {
    console.log(`se ha creado el usuario ${user}`, dato)
})
 */
socket.on("saludo", saludo => {
    console.log(saludo)
    if (nombre) {
        socket.emit("id", nombre)

    }
}
)

//para escuchar cuando otros usuarios se conectan 
socket.on("nuevoUsuario", nombre => {
    console.log(`${nombre} se ha unido al server..!`);

})