import { Router } from "express"
import { auth } from '../middleware/auth.js';
export const router = Router()

router.get('/', (req, res) => {
    res.render('home')
})

router.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render("productsPaginate")
})

router.get('/carts', (req, res) => {
    console.log("renderizando carritos")
    res.setHeader('Content-Type', 'text/html')
    res.status(200).render("carts")
})


/* DELETE api / carts /: cid / products /:pid deberá eliminar del carrito el producto seleccionado.
    - PUT api / carts /:cid deberá actualizar todos los productos del carrito con un arreglo de productos.
    - PUT api / carts /: cid / products /:pid deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body
    - DELETE api / carts /:cid deberá eliminar todos los productos del carrito 
 */




