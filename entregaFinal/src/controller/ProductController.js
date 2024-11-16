import { productService } from "../services/productService.js";
import { procesaErrores } from "../utils.js";

export default class ProductController {
    static async getProducts(req, res) {
        try {
            let products = await productService.getProducts()
            res.setHeader('Content-Type', 'application/json');
            return res.status(200).json({ products });
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static async createProduct(req, res) {

        console.log('desde createProduct ', req.user)

        if (req.user.role !== 'admin') {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No tienes los privilegios de administrador para crear productos` })
        }

        let { title, ...otros } = req.body  //... rest
        if (!title) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `Complete las props requeridas` })
        }

        // validaciones... 
        try {
            let nuevoProducto = await productService.createProduct({ title, ...otros })  // ...spread
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ nuevoProducto });
        } catch (error) {
            return procesaErrores(res, error)
        }
    }

    static async deleteProduct(req, res) {


        if (req.user.role !== 'admin') {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({ error: `No tienes los privilegios de administrador para eliminar productos` })
        }
        let { id } = req.params
        console.log(`Eliminando el producto con id ${id}`)

        try {
            let result = await productService.deleteProductById(id)
            console.log(`Producto ${id} eliminado correctamente`)
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
    }


}