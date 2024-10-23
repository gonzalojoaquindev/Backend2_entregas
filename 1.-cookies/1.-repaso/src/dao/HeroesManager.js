import { heroesModel } from "./models/heroesModel.js";

export class HeroesManager {
    static async get() {
        return await heroesModel.find().lean()
    }

    static async create(heroe) {
        return await heroesModel.create(heroe)
    }
}