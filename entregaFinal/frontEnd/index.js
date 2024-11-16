const divPedidos = document.querySelector("#pedidos")
const btnPedidos = document.querySelector("#btnPedidos")

btnPedidos.addEventListener("click", async (e) => {
    e.preventDefault()
    divPedidos.textContent = ""

    let respuesta = await fetch("http://localhost:8080/api/ordenes")
    if (respuesta.status >= 400) {
        divPedidos.textContent = `Error al cargar pedidos`
        return
    }

    let { ordenes } = await respuesta.json()
    console.log(ordenes)
    ordenes.forEach(o => {
        let parrafo = document.createElement("p")
        parrafo.innerHTML = `Cliente: <b>${o.cliente.nombre}</b> | Negocio: <b>${o.negocio.nombre}</b> | Nro. Pedido: <b>${o.nroOrden}</b> - Total a Pagar: <b>$${o.total}</b>`
        let hr = document.createElement("hr")
        divPedidos.append(parrafo, hr)
    })

})
