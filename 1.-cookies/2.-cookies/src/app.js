import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/config.js';
import { router as heroesRouter } from './routes/heroesRouter.js';
import cookieParser from 'cookie-parser'
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/heroes", heroesRouter)
app.use(cookieParser("gonzalo"))

app.get('/', (req, res) => {
    console.log(req.headers);

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

app.get("/setcookie", (req, res) => {
    let preferencias = {
        font: "arial",
        size: 22,
    }
    res.cookie("cookie01", preferencias, { maxAge: 1000 * 5 })
    res.cookie("cookie2", preferencias)
    res.cookie("cookiefirmada", preferencias, { signed: true })
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "cookies configuradas" });
})

app.get("/getcookie", (req, res) => {
    let cookies = req.cookies
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: cookies });
})

app.get("/delcookie", (req, res) => {
    res.clearCookie("cookie2")

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "cookies eliminadas" });
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
