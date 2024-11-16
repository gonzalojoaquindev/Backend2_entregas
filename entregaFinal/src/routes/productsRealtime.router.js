/* const { Router } = require("express") */
import express, { json } from 'express'
import ProductsManager from '../dao/ProductsManager.js'
import __dirname from '../utils.js'

const router = express.Router()

ProductsManager.path = "./src/data/products.json"
console.log(ProductsManager.path)



router.get('/', async (req, res) => {
    let products
    try {
        products = await ProductsManager.getProducts()

    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
    /*  console.log(__dirname, "desde router product")
     console.log(products) */
    console.log("obteniendo productos")


    let { limit } = req.query
    console.log(limit)
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            return res.send("El argumento limit tiene que ser numerico")
        }
    } else {
        limit = products.length
        console.log(`el limite es ${limit}`)
    }
    let results = products.slice(0, limit)
    /*  console.log(results) */



    /* res.setHeader('Content-Type', 'application/json')
    return res.status(200).json({ results })
    return res.render('index', {
         user: testUser,
         style: 'index.css',
         isAdmin: testUser.role === "admin",
          gonzalito: "araya"
        products
    }) */
    res.render('index', {
        products
    }
    )
    /* res.render('realTimeProducts', {
        products
    }
    ) */

})

router.get('/realtimeproducts', async (req, res) => {
    let products
    try {
        products = await ProductsManager.getProducts()

    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
    /*  console.log(__dirname, "desde router product")
     console.log(products) */
    console.log("obteniendo productos")


    let { limit } = req.query
    console.log(limit)
    if (limit) {
        limit = Number(limit)
        if (isNaN(limit)) {
            return res.send("El argumento limit tiene que ser numerico")
        }
    } else {
        limit = products.length
        console.log(`el limite es ${limit}`)
    }
    let results = products.slice(0, limit)

    res.render('realTimeProducts', {
        products
    }
    )

})

router.post("/realtimeproducts", async (req, res) => {
    let { title, description, code, price, status, stock, category } = req.body;
    console.log(title)

    let newProductBody = req.body
    console.log(newProductBody)

    console.log("status", Boolean(status))

    //Por defecto status en true
    if (typeof newProductBody.status === "undefined") {
        console.log("no viene status, se crea por defecto en true")
        newProductBody.status = true
        console.log(newProductBody)
    }
    /*    id = Number(id) */
    /*  console.log("transformado", Number(price))
     console.log("solo", price) */

    console.log(Boolean(2))


    if (isNaN(Number(price)) || isNaN(Number(stock))) {
        console.log('Argumentos en formato númerico invalido')
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'Argumentos en formato númerico invalido'
        })
    }

    if (typeof title !== "string" || typeof description !== "string" || typeof code !== "string" || typeof category !== "string") {
        console.log('Argumentos en formato texto invalido')
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'Argumentos en formato invalido'
        })
    }

    //compruebo si los parámetros no están vacíos
    if (!title.trim() || !description.trim() || !code.trim() || !price || !stock || !category.trim()) {
        console.log("complete los datos")
        return res.status(400).json({
            error: 'Complete los datos necesarios',
        })
    }

    let products = await ProductsManager.getProducts()

    //evaluar si existe el producto
    let exits = products.find(p => p.title.toLowerCase() === title.toLowerCase())
    if (exits) {
        console.log(`El producto ${title} ya existe`)
        res.setHeader('Content-Type', 'application/json')
        return res.status(400).json({
            error: 'El producto ya existe',
        })
    }

    try {
        let newProduct = await ProductsManager.addProduct(newProductBody)
        //emitir el evento nuevo via socket-----
        req.socket.emit("nuevo", newProduct)
        res.render('realTimeProducts', {
            newProduct
        })


        /* res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ newProduct }) */

    } catch (error) {
        console.log("error", error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }

})

router.put("/:id", async (req, res) => {
    let products
    try {
        products = await ProductsManager.getProducts()
    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
    let { id } = req.params
    console.log(id)
    let { ...updateProduct } = req.body
    delete updateProduct.id
    console.log(updateProduct)


    console.log(`Editando el producto con id ${id}`)
    id = Number(id)
    //validar que sea un id numerico
    if (isNaN(id)) {
        return res.status(400).send("error: ingrese un id numerico")
    }

    //validar que exista el producto
    let product = products.find(p => p.id == id)
    if (!product) {
        console.log("no existe el producto")
        return res.status(404).send("error: no se ha encontrado el producto")
    }
    //Validar que no exista otro producto igual
    if (updateProduct.title) {
        let exist = products.find(p => p.title.toLowerCase() === updateProduct.title.toLowerCase())
        if (exist) {
            console.log(`Ya hay otro producto llamado ${updateProduct.title}`)
            res.setHeader('Content-Type', 'application/json')
            return res.status(400).json({
                error: `Ya hay otro producto llamado ${updateProduct.title}`,
            })
        }
    }

    try {
        let updatedProduct = await ProductsManager.updateProduct(id, updateProduct)
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ updatedProduct })

    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }

})

router.delete("/:id", async (req, res) => {
    let { id } = req.params
    console.log(`Eliminando el producto con id ${id}`)
    id = Number(id)
    //validar que sea un id numerico
    if (isNaN(id)) {
        return res.status(400).json({ "error": "ingrese un id numerico" })
    }

    try {
        let result = await ProductsManager.deleteProduct(id)
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ result })

    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
})


/* module.exports = { router } */

export default router