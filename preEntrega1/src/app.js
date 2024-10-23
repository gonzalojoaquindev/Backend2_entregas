
import express from 'express'
import handlebars from 'express-handlebars'
/* import __dirname from './utils.js' */
import { Server } from 'socket.io'
/* import productRouter from "./routes/products.router.js" */
/* import cartRouter from "./routes/cart.router.js" */
/* import viewsRouter from './routes/views.router.js' */
import { connDB } from './connDB.js';
import { config } from './config/config.js';
import { auth } from "./middleware/auth.js";
import { iniciarPassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { passportCall, __dirname } from './utils.js';

import productRouter from './routes/productsRealtimeMongo.router.js';
import cartRouter from './routes/cartMongo.router.js'

import { router as sessionsRouter } from "./routes/sessionsRouter.js";
import { router as vistasRouter } from './routes/viewsRouter.js'

import ProductsManager from './dao/ProductsManager.js'
import ProductsMongoManager from './dao/ProductsMongoManager.js'

/* import { join } from "path"
import path from 'path';
const currentDir = path.dirname(__filename); */

/* console.log(__dirname, "desde app") */

const PORT = config.PORT

let serverSocket
/* console.log(productRouter) */

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Configuración de handlebars-------------------------
app.engine('handlebars', handlebars.engine())
app.set('view engine', 'handlebars')
app.set("views", "./src/views")

//indicamos que deseamos que public se vuelva estático. en la ruta raíz se mostrará el index.html
app.use(express.static("./src/public"))//define la ruta estatica para el fronted


iniciarPassport()
app.use(passport.initialize())

app.use("/", vistasRouter)
app.use("/api/sessions", sessionsRouter)

//configuración de rutas------------------------
app.use(
    "/api/products",
    // pongo un middleware para poder usar el serverSocket en el fronted
    (req, res, next) => {
        req.socket = serverSocket
        next()
    },
    productRouter

)
/* app.use("/api/products", productRouter) */
app.use("/api/carts", cartRouter)


/* app.use('/', viewsRouter) */

const serverHTTP = app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))

serverSocket = new Server(serverHTTP)

serverSocket.on("connection", async socket => {
    console.log(`se conectó un cliente con id ${socket.id}`)

    let products = await ProductsManager.getProducts()
    socket.emit("previousProducts", products)

    socket.on("nuevoProducto", async data => {
        console.log(data)
        let { title, description, code, price, status, stock, category, thumbnails } = data
        console.log(title)

        let newProductBody = data
        console.log(newProductBody)

        console.log("status", Boolean(status))

        //Por defecto status en true
        if (typeof newProductBody.status === "undefined") {
            console.log("no viene status, se crea por defecto en true")
            newProductBody.status = true
            console.log(newProductBody)
        }


        if (isNaN(Number(price)) || isNaN(Number(stock))) {
            console.log('Argumentos en formato númerico invalido')
        }

        if (typeof title !== "string" || typeof description !== "string" || typeof code !== "string" || typeof category !== "string") {
            console.log('Argumentos en formato texto invalido')
        }

        //compruebo si los parámetros no están vacíos
        if (!title.trim() || !description.trim() || !code.trim() || !price || !stock || !category.trim()) {
            console.log("complete los datos")
        }

        let products = await ProductsManager.getProducts()

        //evaluar si existe el producto
        let exits = products.find(p => p.title.toLowerCase() === title.toLowerCase())
        if (exits) {
            console.log(`El producto ${title} ya existe`)
        }

        try {
            let newProduct = await ProductsManager.addProduct(newProductBody)


        } catch (error) {
            console.log("error", error)

        }
        socket.emit("newProduct", newProductBody)

    })

    socket.on("deleteProduct", async id => {
        console.log(`Eliminando el producto con id ${id}`)
        id = Number(id)

        try {
            let result = await ProductsManager.deleteProduct(id)

        } catch (error) {
            console.log(error)
        }
        socket.emit("deletedProduct", id)
    })



    //envia solo al que se acaba de conectar
    socket.emit("saludo", `Bienvenido. soy el server. Identificate...`)

    // a todos menos al que acaba de emitir el evento
    socket.on("id", nombre => {
        console.log(`el cliente ${socket.id} se ha identificado como ${nombre}`)
        socket.broadcast.emit("nuevoUsuario", nombre)
    })

    //emitir a todos
})

connDB(config.MONGO_URL, config.DB_NAME)


/* app.listen(8080, () => console.log("Servidor arriba en el puerto 8080")) */

