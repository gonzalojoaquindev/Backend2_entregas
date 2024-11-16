import { Router } from 'express';
import ProductController from '../controller/ProductController.js';
export const router = Router()
import passport from 'passport';

router.get('/', ProductController.getProducts)
router.post('/', passport.authenticate("current", { session: false }), ProductController.createProduct)
router.delete('/:id', passport.authenticate("current", { session: false }), ProductController.deleteProduct)