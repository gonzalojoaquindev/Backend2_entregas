import express from "express";
import { engine } from "express-handlebars"
import { router as sessionsRouter } from "./routes/sessionsRouter.js";
import { router as villanosRouter } from "./routes/villanosRouter.js";
import { router as vistasRouter } from './routes/viewsRouter.js'
import { connDB } from "./connDB.js";
import { config } from "./config/config.js";
import { auth } from "./middleware/auth.js";
import { iniciarPassport } from "./config/passport.config.js";
import passport from "passport";
import cookieParser from "cookie-parser";


const PORT = config.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")
//paso 2
iniciarPassport()
app.use(passport.initialize())
//app.use(passport.session())//solo si usamos session
app.use(express.static("./src/public"))//define la ruta estatica para el fronted

app.use("/api/sessions", sessionsRouter)
/* app.use("/api/villanos", auth, villanosRouter) */
app.use("/api/villanos", passport.authenticate("current", { session: false }), villanosRouter)
app.use("/", vistasRouter)



app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`)
})

connDB(config.MONGO_URL, config.DB_NAME)





