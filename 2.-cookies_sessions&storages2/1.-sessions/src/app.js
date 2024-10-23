import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';
import sessions from "express-session"
// import mongoose from 'mongoose';
import { router as productosRouter } from './routes/productosRouter.js';
import { router as sessionsRouter } from './routes/sessionsRouter.js';
import { router as vistasRouter } from './routes/vistas.router.js';
import { connDB } from './ConnDB.js';
import { config } from './config/config.js';

const PORT = config.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    // store: 
}))
app.use(express.static("./src/public"))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use("/api/productos", productosRouter)
app.use("/api/sessions", sessionsRouter)
app.use('/', vistasRouter)

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});


connDB()
// const conectar=async()=>{
//     try {
//         await mongoose.connect("mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&dbName=comis70145clase02")
//         console.log(`Conexión a DB establecida`)
//     } catch (err) {
//         console.log(`Error al conectarse con el servidor de BD: ${err}`)
//     }
// }

// conectar();



