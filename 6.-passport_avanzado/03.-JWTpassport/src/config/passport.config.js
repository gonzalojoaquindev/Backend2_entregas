import passport from "passport"
import local from "passport-local"
import github from "passport-github2"
import passportJWT from "passport-jwt"

import { UsuariosManager } from "../dao/UsuariosManager.js"
import { generaHash, validaHash } from "../utils.js"
import { config } from "../config/config.js"

const buscarToken = req => {
    let token = null
    console.log("passport recibe token ...!")
    if (req.cookies.tokenCookie) {
        token = req.cookies.tokenCookie
    }
    return token
}

export const iniciarPassport = () => {

    //paso 1
    passport.use(
        "registro"//1er argumento: nombre que le damos a la estrategia localmente
        , new local.Strategy(
            {
                passReqToCallback: true,
                usernameField: "email"

            },
            async (req, username, password, done) => {
                console.log("ingresa")
                try {
                    let { nombre } = req.body
                    if (!nombre) {
                        console.log("falta nombre")
                        return done(null, false)//(error, usuario)
                    }
                    let existe = await UsuariosManager.getBy({ email: username })

                    if (existe) {
                        console.log("existe")
                        console.log(existe)
                        return done(null, false)
                    }

                    password = generaHash(password)

                    let nuevoUsuario = await UsuariosManager.addUser({ nombre, email: username, password })
                    return done(null, nuevoUsuario)



                } catch (error) {
                    console.log(error)
                    return done(error)

                }

            }
        )//2do arg: una nueva instancia de la estrategia
    )



    //paso2
    passport.use("login",
        new local.Strategy(
            {
                usernameField: "email"
            },
            async (username, password, done) => {
                try {
                    let usuario = await UsuariosManager.getBy({ email: username })
                    if (!usuario) {
                        return done(null, false)
                    }
                    if (!validaHash(password, usuario.password)) {
                        return done(null, false)
                    }

                    //limpia data sensible /confidencial
                    delete usuario.password
                    return done(null, usuario)
                } catch (error) {

                    return done(error)

                }

            }
        )
    )
}

passport.use("current",
    new passportJWT.Strategy(
        {
            secretOrKey: config.SECRET,
            jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken])
        },
        async (usuario, done) => {
            try {
                return done(null, usuario)

            } catch (error) {
                console.log(error)

            }
        }

    )
)

/* passport.use("nombreEstrategia",
    new local.Strategy(
        { objetoParametrizable },
        async (done) => {

        }//funcion async que tiene como minimo el arg done que es una funcion de callback que le va a permitir emiitr respuestas desde passport
    )
) */