import express from 'express';
import mongoose from 'mongoose';
import sessions from 'express-session'
import { config } from './config/config.js';
import { router as heroesRouter } from './routes/heroesRouter.js';
import cookieParser from 'cookie-parser'
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* app.use(cookieParser("gonzalo")) */
app.use(sessions({
    secret: "gonzalo",
    resave: true,
    saveUninitialized: true
}))

app.get('/', (req, res) => {
    let respuesta = `Bienvenido...!!!`
    if (req.session.contador) {
        req.session.contador++
        respuesta += `visitas al sitio ${req.session.contador}`
    } else {
        req.session.contador = 1
    }
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(respuesta);
})

app.get("/contador", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: req.session });
})



const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

const connDB = async () => {
    try {
        await mongoose.connect(
            config.MONGO_URL,
            {
                dbName: config.DB_NAME
            }
        )
        console.log("DB conectada...!!!")
    } catch (error) {
        console.log(`Error al conectar a DB: ${error.message}`)
    }
}
connDB()
