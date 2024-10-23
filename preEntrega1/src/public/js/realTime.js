console.log("hola mundo desde socket realtime")
const inputMensaje = document.getElementById("mensaje")

const divProducts = document.getElementById("divProducts")

function enviarMensaje() {
    let title = document.getElementById('title').value
    let description = document.getElementById('description').value
    let code = document.getElementById('code').value
    let price = document.getElementById('price').value
    let status = document.getElementById('status').value
    let stock = document.getElementById('stock').value
    let category = document.getElementById('category').value
    let producto = {
        title: title,
        description: description,
        code: code,
        price: price,
        status: status,
        stock: stock,
        category: category
    }

    console.log(producto)
    socket.emit("nuevoProducto", producto);
    document.getElementById('title').value = ''
    document.getElementById('description').value = ''
    document.getElementById('code').value = ''
    document.getElementById('price').value = ''
    document.getElementById('status').value = ''
    document.getElementById('stock').value = ''
    document.getElementById('category').value = ''
}



const socket = io()

/* socket.on("previousProducts", productos => {
    productos.forEach(producto => {
        let p = document.createElement("p")
        p.classList.add("producto")
        let s = document.createElement("strong")
        let sp = document.createElement("span")
        let i = document.createElement("i")
        let d = document.createElement("button")


        s.textContent = producto.title
        sp.textContent = " - "
        i.textContent = producto.description
        d.textContent = "Eliminar"
        d.classList.add('btn', 'waves-effect', 'waves-light')
        p.append(s, sp, i, d)
        d.onclick = function () {
            console.log("me eliminaste", producto.id)
            socket.emit("deleteProduct", producto.id)
            p.remove()
        }
        divProducts.append(p)
        divProducts.scrollTop = divProducts.scrollHeight
    })
}) */

function eliminar(producto) {
    console.log(producto)
    card.remove()
}



socket.on("previousProducts", productos => {
    productos.forEach(producto => {
        let container = document.createElement("div")
        let card = document.createElement("div")
        let content = document.createElement("div")
        let title = document.createElement("span")
        let description = document.createElement("p")
        let price = document.createElement("p")
        let action = document.createElement("div")
        let button = document.createElement("a")


        container.classList.add('col', 's4', 'm4')
        card.classList.add('card', 'blue-grey', 'darken-1')
        content.classList.add('card-content', 'white-text')
        title.classList.add('card-title')
        action.classList.add('card-action')


        title.textContent = producto.title
        description.textContent = producto.description
        price.textContent = `$ ${producto.price}`
        button.textContent = "Eliminar"

        container.append(card)
        card.append(content, action)
        content.append(title, description, price)
        action.append(button)

        divProducts.append(container)
        divProducts.scrollTop = divProducts.scrollHeight
        button.onclick = function () {
            console.log("me eliminaste", producto.id)
            socket.emit("deleteProduct", producto.id)
            card.remove()
        }

    }
    )
})
/*  p.classList.add("producto") */
/* let s = document.createElement("strong")
let sp = document.createElement("span")
let i = document.createElement("i")
let d = document.createElement("button")



s.textContent = producto.title
sp.textContent = " - "
i.textContent = producto.description
d.textContent = "Eliminar"
d.classList.add('btn', 'waves-effect', 'waves-light')
p.append(s, sp, i, d)
d.onclick = function () {
    console.log("me eliminaste", producto.id)
    socket.emit("deleteProduct", producto.id)
    p.remove()
}
divProducts.append(p)
divProducts.scrollTop = divProducts.scrollHeight 
}) 
})




/*     < div class="card blue-grey darken-1" >
        <div class="card-content white-text">
            <span class="card-title">Card Title</span>
            <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
            <a href="#">This is a link</a>
            <a href="#">This is a link</a>
        </div>
    </div >
*/


socket.on("newProduct", producto => {
    let container = document.createElement("div")
    let card = document.createElement("div")
    let content = document.createElement("div")
    let title = document.createElement("span")
    let description = document.createElement("p")
    let category = document.createElement("span")
    let price = document.createElement("p")
    let action = document.createElement("div")
    let button = document.createElement("a")


    container.classList.add('col', 's4', 'm4')
    card.classList.add('card', 'blue-grey', 'darken-1')
    content.classList.add('card-content', 'white-text')
    title.classList.add('card-title')
    category.classList.add("new", "badge")
    action.classList.add('card-action')


    title.textContent = producto.title
    description.textContent = producto.description
    category.textContent = producto.category
    price.textContent = `$ ${producto.price}`
    button.textContent = "Eliminar"

    container.append(card)
    card.append(content, action)
    content.append(title, description, price, category)
    action.append(button)

    divProducts.append(container)
    divProducts.scrollTop = divProducts.scrollHeight
    button.onclick = function () {
        console.log("me eliminaste", producto.id)
        socket.emit("deleteProduct", producto.id)
        card.remove()
    }

})

socket.on("deletedProduct", id => {
    console.log("Producto eliminado", id)

})


socket.on("nuevoMensaje", (nombre, mensaje) => {
    let p = document.createElement("p")
    p.classList.add("mensaje")
    let s = document.createElement("strong")
    let sp = document.createElement("span")
    let i = document.createElement("i")

    s.textContent = nombre
    sp.textContent = " dice "
    i.textContent = mensaje
    p.append(s, sp, i)
    divMensajes.append(p)
    divMensajes.scrollTop = divMensajes.scrollHeight

})


/* const divTemperatura = document.getElementById('temperatura')
 */
/* socket.on("nuevaLecturaTemperatura", datos => {
    //console.log(`La temperatura actual es de °${datos}`)
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
}) */

/* socket.on("nuevoMensaje", (nombre, mensaje) => {
    let p = document.createElement("p")
    p.classList.add("mensaje")
    let s = document.createElement("strong")
    let sp = document.createElement("span")
    let i = document.createElement("i")

    s.textContent = nombre
    sp.textContent = " dice "
    i.textContent = mensaje
    p.append(s, sp, i)
    divMensajes.append(p)
    divMensajes.scrollTop = divMensajes.scrollHeight

}) */



/* socket.on("mensajesPrevios", mensajes => {
    mensajes.forEach(datos => {
        let p = document.createElement("p")
        p.classList.add("mensaje")
        let s = document.createElement("strong")
        let sp = document.createElement("span")
        let i = document.createElement("i")

        s.textContent = datos.nombre
        sp.textContent = " dice "
        i.textContent = datos.mensaje
        p.append(s, sp, i)
        divMensajes.append(p)
        divMensajes.scrollTop = divMensajes.scrollHeight
    })
}) */


/* socket.on("nuevo", datos => {
    //console.log(`La temperatura actual es de °${datos}`)
    divTemperatura.textContent = `La temperatura actual es de °${datos}`
}) */

/*
socket.on("previousProducts", products => {
    console.log(products)
    products.forEach(product => {
        let p = document.createElement("p")
        p.classList.add("mensaje")
        let s = document.createElement("strong")
        let sp = document.createElement("span")
        let i = document.createElement("i")

        s.textContent = product.title
        sp.textContent = " dice "
        i.textContent = product.description
        p.append(s, sp, i)
        divMensajes.append(p)
        divMensajes.scrollTop = divMensajes.scrollHeight
    })
}) */

/* este está casi listo */
/* socket.on("nuevo", dato => {
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
 */
/* socket.on("nuevo", datos => {
    console.log(`Se ha creado un nuevo producto ${datos.title}`)
}) */

/* //ejemplo mandando dos datos
socket.on("nuevo2", (user, dato) => {
    console.log(`se ha creado el usuario ${user}`, dato)
})
 */
/* socket.on("saludo", saludo => {
    console.log(saludo)
    if (nombre) {
        socket.emit("id", nombre)
    }
}
) */

//para escuchar cuando otros usuarios se conectan 
/* socket.on("nuevoUsuario", nombre => {
    console.log(`${nombre} se ha unido al server..!`);

}) */

