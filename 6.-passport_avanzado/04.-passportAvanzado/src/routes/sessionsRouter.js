import { Router } from 'express';
import passport from 'passport'
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import cookieParser from 'cookie-parser'
import { passportCall } from '../utils.js';
export const router = Router()

router.get('/error', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(401).json({ error: `error al autenticar` })
})

//paso3
router.post(
    "/registro",
    // passport.authenticate("registro", {session: false, failureRedirect:"/api/sessions/error"}),
    // passport.authenticate("registro", {session: false}),
    passportCall("registro"),
    (req, res) => {
        // req.user // lo deja passport.authenticate si todo sale OK
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ payload: `Registro exitoso para ${req.user.nombre}`, usuario: req.user });
    }
)

router.post("/login",
    passport.authenticate("login",
        {
            session: false,
            failureRedirect: "/api/sessions/error"
        }
    ),
    (req, res) => {
        let token = jwt.sign(req.user, config.SECRET, { expiresIn: 3600 })

        //token = jwt.sign(objeto con datos usuarios, clave secreta, objeto literl para configurar diferentes opciones)
        res.cookie("tokenCookie", token, { httpOnly: true })

        res.setHeader('Content-Type', 'application/json');
        /* return res.status(201).json({ payload: `Login existoso para ${req.user.nombre}`, usarioLogueado: req.user, token }); */
        return res.status(201).json({ payload: `Login existoso para ${req.user.nombre}`, usarioLogueado: req.user });

    }
)