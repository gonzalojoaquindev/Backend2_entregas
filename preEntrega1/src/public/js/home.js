const inputEmail = document.getElementById("email")
const inputPass = document.getElementById("password")
const btnSubmit = document.getElementById("btnSubmit")

const divProductos = document.getElementById("divProductos")
const aProductos = document.getElementById("aProductos")

btnSubmit.addEventListener("click", async (e) => {
    e.preventDefault()

    let email = inputEmail.value
    let password = inputPass.value
    if (!email || !password) {
        alert("Complete datos...!!!")
        return
    }
    console.log(email, password)
    const body = { email, password }

    let respuesta = await fetch("/api/sessions/login", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    if (respuesta.status >= 400) {
        let { error } = await respuesta.json()
        alert(error)
        return
    } else {
        let datos = await respuesta.json()
        console.log(datos)
        /* localStorage.setItem("token", datos.token) */
    }
})

aProductos.addEventListener("click", async (e) => {
    e.preventDefault()
    console.log("Obteniendo productos")
    divProductos.textContent = ""

    let respuesta = await fetch("api/products?limit=15&page=1&sort=asc", {
        /* headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        } */
    })
    /* data = await respuesta.json()
    console.log(data) */
    if (respuesta.status >= 400) {
        let { error } = await respuesta.json()
        divProductos.textContent = error
        console.log(error)
        /*  divVillanos.textContent = "No tiene permisos para ver los villanos" */
    } else {
        data = await respuesta.json()
        let productos = data.products.docs
        console.log(productos)

        let ulProductos = document.createElement("ul")
        productos.forEach(producto => {
            let li = document.createElement("li")
            li.textContent = producto.title
            ulProductos.append(li)

        });
        divProductos.append(ulProductos)
    }

})