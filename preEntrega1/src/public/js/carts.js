const ulProducts = document.querySelector("ul")

const getCartById = async () => {

    let params = new URLSearchParams(location.search)
    console.log(params)
    let cid = params.get("id")
    if (!cid) {
        console.log("No es id valido")
    } else {
        let res = await fetch(`/api/carts/${cid}`)
        console.log(res)
        let data = await res.json()
        console.log(data);
        console.log(data.cart.products)


        let cart = document.createElement("h2")
        cart.textContent = `Carrito id ${data.cart._id}`
        divCarts.append(cart)

        data.cart.products.forEach(producto => {
            let container = document.createElement("div")
            let card = document.createElement("div")
            let content = document.createElement("div")
            let title = document.createElement("span")
            let description = document.createElement("p")
            let category = document.createElement("span")
            let price = document.createElement("p")
            let priceTotal = document.createElement("div")
            let action = document.createElement("div")
            let quantity = document.createElement("div")

            container.classList.add('col', 's4', 'm4')
            card.classList.add('card', 'blue-grey', 'darken-1')
            content.classList.add('card-content', 'white-text')
            title.classList.add('card-title', 'white-text')
            category.classList.add("new", "badge", "orange")

            title.textContent = producto.product.title
            description.textContent = producto.product.description
            category.textContent = producto.product.category
            price.textContent = `Precio unitario $ ${producto.product.price}`
            priceTotal.textContent = `Precio total $ ${producto.product.price * producto.quantity}`
            quantity.textContent = `Cantidad: ${producto.quantity}`

            container.append(card)
            card.append(content, action)
            content.append(title, description, price, category, quantity, priceTotal)
            /* action.append(button) */
            /*             button.append(icon) */

            divCarts.append(container)
            divCarts.scrollTop = divCarts.scrollHeight
            /* socket.emit("deleteProduct", producto.id) */
            /*  card.remove() */
        })




    }
}

getCartById()