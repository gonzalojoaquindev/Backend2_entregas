
import express, { json } from 'express'
/* import ProductsManager from '../dao/ProductsManager.js' */
import { __dirname } from '../utils.js'
import ProductsManager from '../dao/ProductsMongoManager.js'
import { isValidObjectId } from 'mongoose';



const router = express.Router()

ProductsManager.path = "./src/data/products.json"
console.log(ProductsManager.path)

//Leer todos los productos
router.get('/', async (req, res) => {
    let { page, limit, sort } = req.query
    console.log('Ejecutando get desde productsRealtimeMongo');

    console.log(`limit ${limit}, page ${page} sort ${sort}`)
    /* console.log(isNaN(Number(page))) */
    if (!page || isNaN(Number(page))) {
        console.log("no viene el parametro page, se establecerá en 1")
        page = 1
    }

    if (!limit || isNaN(Number(limit))) {
        limit = 10
        console.log("no viene el parametro limit, se establecerá en 1")
    }

    if (!sort || sort != "asc" && sort != "desc") {
        console.log("sort", sort)
        sort = { code: 1 }
    } else {
        if (sort == "asc") {
            console.log('Ordenado precios de forma ascendente');
            sort = { price: 1 }
        }

        if (sort == "desc") {
            console.log('Ordenado precios de forma descendente');
            sort = { price: -1 }
        }
    }

    console.log(sort)

    console.log(`obteniendo pagina ${page} con limite en ${limit}con sort ${{ code: 1 }}`)
    /* let products = await ProductsManager.getProducts() */

    try {
        let products = await ProductsManager.getProductsPaginate(page, limit, sort)
        console.log("obtienendo productos desde DB")
        res.setHeader('Content-Type', 'application/json');

        return res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json(
            {
                error: `No se logró obtener productos - Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
                detalle: `${error.message}`
            }
        )
    }


})



//Leer un producto por su id
router.get('/:id', async (req, res) => {

    let { id } = req.params
    if (!isValidObjectId(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `id formato inválido` })
    }

    try {
        let product = await ProductsManager.getUserBy({ _id: id })
        if (!product) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No existe producto con id ${id}` })
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({ product });
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

})

//Leer productos realtime
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

//Crear un producto
router.post("/", async (req, res) => {
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

        /* res.render('realTimeProducts', {
            newProduct
        })
 */

        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ newProduct })

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
    if (!isValidObjectId(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `id invalido` })
    }

    console.log(id)
    let { ...updateProduct } = req.body
    delete updateProduct.id
    console.log(updateProduct)


    console.log(`Editando el producto con id ${id}`)

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
        if (!updatedProduct) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No se ha podido modificar el producto` })
        }
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
    if (!isValidObjectId(id)) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `id invalido` })
    }
    console.log(`Eliminando el producto con id ${id}`)


    try {
        let removedProduct = await ProductsManager.deleteProduct(id)
        if (!removedProduct) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No se ha podido eliminar el producto` })
        }
        res.setHeader('Content-Type', 'application/json')
        return res.status(200).json({ removedProduct })

    } catch (error) {
        console.log(error)
        res.setHeader('Content-Type', 'application/json')
        return res.status(500).json({
            error: 'Error inesperado en el servidor, intente más tarde',
            detalle: `${error.message}`
        })

    }
})


export default router