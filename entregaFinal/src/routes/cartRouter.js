import { Router } from 'express';
import { addProductToCart, createCart, getCartById, purchaseCart } from '../controller/CartController.js';
import passport from 'passport';
export const router = Router()

//Crear un carrito
router.post('/', createCart)
//Obtener un carrito por su id
router.get('/:cid', getCartById)
//Llenar carrito con producto
router.post("/:cid/product/:pid", passport.authenticate("current", { session: false }), addProductToCart)
//Comprar carrito
router.post("/:cid/purchase", passport.authenticate("current", { session: false }), purchaseCart)