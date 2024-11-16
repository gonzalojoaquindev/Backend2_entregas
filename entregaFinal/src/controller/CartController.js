import { isValidObjectId } from "mongoose"
import { cartService } from "../services/cartService.js"
import { procesaErrores } from "../utils.js"
import { productService } from "../services/productService.js"
import { CartMongoManager } from "../dao/CartMongoDAO.js"
import { ProductsMongoDAO } from "../dao/ProductsMongoDAO.js"
import { ticketModel } from "../dao/models/ticketModel.js"

export const createCart = async (req, res) => {
    try {
        let nuevoCart = await cartService.createCart()
        res.setHeader('Content-Type', 'application/json')
        res.status(201).json({ nuevoCart })
    } catch (error) {
        procesaErrores(res, error)
    }
}

export const addProductToCart = async (req, res) => {
    let { cid, pid } = req.params
    if (!cid || !pid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `complete pid / cid` })
    }



    console.log(cid, req.user.cart)
    if (cid != req.user.cart) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Carrito no pertenece al usuario logueado` })
    }

    if (!isValidObjectId(cid) || !isValidObjectId(pid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `fomato invalido cid / pid` })
    }

    try {
        let product = await productService.getProductById(pid)
        console.log(product)
        if (!product) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe producto con id ${pid}` })
        }

        let cart = await cartService.getCartById(cid)
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe cart con id ${cid}` })
        }

        let indiceProducto = cart.products.findIndex(p => p.product._id == pid)
        if (indiceProducto === -1) {
            cart.products.push({ product: pid, quantity: 1 })
        } else {
            cart.products[indiceProducto].quantity++
        }

        let cartActualizado = await cartService.updateCart(cid, cart)

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ cartActualizado });

    } catch (error) {
        procesaErrores(res, error)
    }
}

export const getCartById = async (req, res) => {
    try {
        let { cid } = req.params
        if (!isValidObjectId(cid)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Ingrese id en formato válido` })
        }

        let cart = await CartMongoManager.getBy({ _id: cid })
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe cart ${cid}` })
        }

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ cart });
    } catch (error) {
        procesaErrores(res, error)
    }
}

export const purchaseCart = async (req, res) => {
    let { cid } = req.params
    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `No existe carrito con id ${cid}` })
    }

    // console.log(req.user)
    if (req.user.cart != cid) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `El cart que quiere comprar no pertenece al usuario autenticado` })
    }

    try {
        let carrito = await CartMongoManager.getBy({ _id: cid })
        if (!carrito) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe carrito` })
        }

        const conStock = []
        const sinStock = []
        let error = false

        // console.log(JSON.stringify(carrito, null, 5))
        for (let i = 0; i < carrito.products.length; i++) {
            let codigo = carrito.products[i].product._id
            let cantidad = carrito.products[i].quantity
            let producto = await ProductsMongoDAO.getBy({ _id: codigo })
            if (!producto) {
                // console.log("entra acá")
                error = true
                sinStock.push({
                    product: codigo,
                    quantity: cantidad
                })
            } else {
                if (producto.stock >= cantidad) {
                    conStock.push({
                        codigo,
                        cantidad,
                        precio: producto.price,
                        descrip: producto.title,
                        subtotal: producto.price * cantidad
                    })
                    producto.stock = producto.stock - cantidad
                    await ProductsMongoDAO.update(codigo, producto)
                } else {
                    error = true
                    sinStock.push({
                        product: codigo,
                        quantity: cantidad
                    })
                }
            }
        }  // fin for

        // ver si hay productos en condiciones de facturar
        if (conStock.length == 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existen ítems en condiciones de ser facturados` })
        }

        let code = Date.now()
        let purchase_datetime = new Date()
        let amount = conStock.reduce((acum, item) => acum += item.cantidad * item.precio, 0)
        let purchaser = req.user.email

        let ticket = await ticketModel.create({
            code,
            purchase_datetime,
            amount,
            purchaser,
            detalle: conStock
        })

        carrito.products = sinStock
        await CartMongoManager.update({ _id: cid }, carrito)

        // enviar un mail
        // try {

        // } catch (error) {

        // }

        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ ticket, alerta: `Atención: algún ítem no pudo ser procesado por falta de inventario. Consulte al administrador` });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json(ticket);
        }
    } catch (error) {
        procesaErrores(res, error)
    }


}

