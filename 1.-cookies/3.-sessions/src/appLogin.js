import express from 'express';
import sessions from "express-session"
import { auth } from './middleware/auth.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessions({
    secret: "CoderCoder123", resave: true, saveUninitialized: true
}))


let usuarios = [
    {
        nombre: 'Diego', password: '123',
        rol: 'usuario'
    },
    {
        nombre: 'Laura', password: '123',
        rol: 'usuario'
    },
    {
        nombre: 'Admin', password: 'codercoder',
        rol: 'admin'
    },
]

app.get('/', (req, res) => {


    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send("OK");
})

app.get("/login", (req, res) => {
    let { nombre, password } = req.query
    if (!nombre || !password) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(400).json({ error: `Complete nombre y password` })
    }

    let usuario = usuarios.find(u => u.nombre === nombre && u.password === password)
    if (!usuario) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ error: `Credenciales invalidas` })
    }

    req.session.usuario = usuario

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: `Login exitoso para ${usuario.nombre}` });

})

app.get("/logout", (req, res) => {

    req.session.destroy(error => {
        if (error) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(500).json({ error: `Error interno del server` })
        }
    })

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Logout exitoso" });
})

app.get('/datos', auth, (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({ payload: "Datos protegidos", usuarioLogueado: req.session.usuario });
})

const server = app.listen(PORT, () => {
    console.log(`login escuchando en puerto ${PORT}`);
});