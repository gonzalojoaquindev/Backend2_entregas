import { Router } from 'express'
/* import CartsManager from '../dao/CartsManager.js' */
import CartsManager from '../dao/CartsMongoManager.js'

import ProductsManager from '../dao/ProductsMongoManager.js'
import { isValidObjectId } from 'mongoose';

const router = Router()

CartsManager.path = "./data/carts.json"

console.log(CartsManager.path)
//Obtener un carrito por su id
router.get("/:cid", async (req, res) => {

    console.log("ejecutando obtener carritos")
    let carts
    try {
        carts = await CartsManager.getCarts()
    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
    /* console.log("carts", carts) */

    let { cid } = req.params
    //validar id
    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `id formato inválido` })
    }

    try {
        let cart = await CartsManager.getCartsById({ _id: cid })
        //validar si el carro existe
        if (!cart) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe el carrito de compra 🛒 con id ${cid}` })
        }
        /*  console.log(`carrito obtenido: ${JSON.stringify(cart, null, 5)}`) */
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ cart });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }


})//Obtener un carrito por su id



//DELETE api / carts /:cid deberá eliminar todos los productos del carrito
router.delete("/:cid/", async (req, res) => {
    let { cid } = req.params;

    if (!isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'El id tiene formato invalido'
        })
    }
    console.log(`Eliminando todos los productos del carrito ${cid}`);

    try {
        //Obtengo el carro
        let cart = await CartsManager.getCartsById(cid)
        //valido si existe el carro
        if (!cart) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe carro con id ${cid}` })
        }
        /* console.log(JSON.stringify(cart.products, null, 2)); */

        cart.products = []

        let result = await CartsManager.updateCart(cid, cart)

        if (result.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: "Cart actualizado" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Fallo en la actualizacion` })
        }
    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
})//eliminar todos los productos del carrito

//DELETE api / carts /: cid / products /:pid deberá eliminar del carrito el producto seleccionado.
router.delete("/:cid/products/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    if (!isValidObjectId(pid) || !isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'Algún id tiene formato invalido'
        })
    }
    console.log(`Eliminando el producto ${pid} del carrito ${cid}`);

    try {
        //Obtengo el carro
        let cart = await CartsManager.getCartsById(cid)
        //valido si existe el carro
        if (!cart) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe carro con id ${cid}` })
        }
        //Obtengo el producto
        let product = await ProductsManager.getProductsById({ _id: pid })
        //valido si existe el producto
        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe el producto con id ${pid}` })
        }
        /* console.log(JSON.stringify(cart.products, null, 2)); */

        let indexProduct = cart.products.findIndex(p => p.product._id == pid)
        console.log(`indice del producto ${indexProduct}`)
        if (indexProduct === -1) {
            console.log(`El producto no existe dentro del carro`)
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe el producto con id ${pid} en el carrito ${cid}` })
        } else {
            //evalúo si ya existe al menos 1 producto para descontarlo
            if (cart.products[indexProduct].quantity > 1) {
                cart.products[indexProduct].quantity--
            } else {
                console.log(`Se eliminó el último porducto con id ${pid}`);
                cart.products.splice(indexProduct, 1)
            }
        }

        let result = await CartsManager.updateCart(cid, cart)

        if (result.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: "Cart actualizado" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Fallo en la actualizacion` })
        }
        /* res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ message: "Cart actualizado" }); */


    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
})//eliminar del carrito el producto seleccionado

//Crear carro vacío
router.post("/", async (req, res) => {
    console.log("Creando carrito vacío 🛒")
    try {
        let newCart = await CartsManager.addCart()
        console.log(`Carrito creado con id ${newCart._id}`);

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ newCart })

    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
})//Crear carro vacío

//Agregar producto al carro
router.post("/:cid/product/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    if (!isValidObjectId(pid) || !isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'Algún id tiene formato invalido'
        })
    }

    console.log("id carrito", cid)
    console.log("id producto", pid)

    try {
        //Obtengo el carro con su id
        let cart = await CartsManager.getCartsById(cid)
        //Valido si existe el carro
        if (!cart) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe carro con id ${cid}` })
        }
        //Obtengo el producto con su id
        let product = await ProductsManager.getProductsById({ _id: pid })
        //Valido si existe
        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe el producto con id ${pid}` })
        }
        console.log(`Agreando producto ${pid} al carro ${cid}`)
        /* console.log(JSON.stringify(cart, null, 5)); */

        let indexProduct = cart.products.findIndex(p => p.product._id == pid)
        if (indexProduct === -1) {
            console.log(`El producto no existe dentro del carro`)
            cart.products.push({
                product: pid,
                quantity: 1
            })
            console.log("Se agrega 1 producto al carro")
        } else {
            console.log("Ya existe el mismo producto en el carro, Se suma 1 producto más")
            cart.products[indexProduct].quantity++
        }

        let result = await CartsManager.updateCart(cid, cart)

        if (result.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: "Cart actualizado" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Fallo en la actualizacion` })
        }


    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })
    }
})//Agregar producto al carro


//PUT api / carts /:cid deberá actualizar todos los productos del carrito con un arreglo de productos.


//PUT api / carts /: cid / products /:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

router.put("/:cid/product/:pid", async (req, res) => {
    let { cid, pid } = req.params;

    let { quantity } = req.body

    console.log(quantity)

    if (!isValidObjectId(pid) || !isValidObjectId(cid)) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'Algún id tiene formato invalido'
        })
    }

    console.log("id carrito", cid)
    console.log("id producto", pid)

    try {
        //Obtengo el carro con su id
        let cart = await CartsManager.getCartsById(cid)
        //Valido si existe el carro
        if (!cart) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe carro con id ${cid}` })
        }
        //Obtengo el producto con su id
        let product = await ProductsManager.getProductsById({ _id: pid })
        //Valido si existe
        if (!product) {
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({ error: `No existe el producto con id ${pid}` })
        }
        console.log(`Actualizando cantidad de producto ${pid} en carro ${cid}`)
        /* console.log(JSON.stringify(cart, null, 5)); */

        let indexProduct = cart.products.findIndex(p => p.product._id == pid)
        if (indexProduct === -1) {
            console.log(`El producto no existe dentro del carro`)
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `El producto no existe dentro del carro` })

        } else {
            console.log("Actualizando cantidad de producto")
            cart.products[indexProduct].quantity = quantity
        }

        let result = await CartsManager.updateCart(cid, cart)

        if (result.modifiedCount > 0) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ message: "Cart actualizado" });
        } else {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Fallo en la actualizacion` })
        }

    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })
    }
})//Actualizar cantidad de producto al carro



export default router