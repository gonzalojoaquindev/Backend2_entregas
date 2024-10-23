import { usuariosModel } from "./models/usuariosModel.js"

export class UsuariosManager {
    static async getBy(filtro = {}) {
        return await usuariosModel.findOne(filtro).lean()

    }

    static async addUser(usuario = {}) {
        let newUser = await usuariosModel.create(usuario)
        return newUser.toJSON()
    }
}