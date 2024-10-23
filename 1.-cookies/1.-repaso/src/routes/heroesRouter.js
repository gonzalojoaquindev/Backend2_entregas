import { Router } from 'express';
import { HeroesManager } from '../dao/HeroesManager.js';
export const router = Router()

router.get('/', async (req, res) => {

    try {
        let heroes = await HeroesManager.get()

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ heroes })
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

router.post("/", async (req, res) => {
    let { name, alias } = req.body
    if (!name) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete prop name` })
    }

    // validaciones pertinentes... 

    try {
        let nuevoHeroe = await HeroesManager.create({ name, alias })
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ nuevoHeroe });
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