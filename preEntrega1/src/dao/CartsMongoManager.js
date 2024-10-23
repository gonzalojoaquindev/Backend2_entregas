
import { cartsModels } from "./models/cartsModels.js"
class CartManager {

    static async getCarts() {
        return await cartsModels.find().lean()
    }//fin read

    static async getCartsById(id) {
        return await cartsModels.findOne({ _id: id })

    }

    static async addCart() {
        return await cartsModels.create({ products: [] })
    }

    /* static async addCart(cart = {}) {
        let newCart = await cartsModels.create(cart)
        return newCart.toJSON()
        //se envía en toJSON para desidratarlo ya que el  create no tiene el metodo .lean
    }//fin create */

    /* static async updateCart(id, updateCart = {}) {
        return await cartsModels.findByIdAndUpdate(id, updateCart, { new: true }).lean()
    }//fin update */

    static async updateCart(id, cart) {
        return await cartsModels.updateOne({ _id: id }, cart)
    }

    static async deleteCart(id) {
        return await cartsModels.findByIdAndDelete(id).lean()

    }//fin delete

}


export default CartManager

