import express from "express"
import cors from "cors"
import { userAuth } from "./models/User.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import cookieParser from "cookie-parser"

const app = express()

// JWT Secret from .ENV file
const jwt_secret = process.env.jwt_secret

console.log(jwt_secret)

app.use(cors({
    credentials: true,
    origin: true,
}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res) => {
    res.json('test ok!')
})

/* criação da área interna de administração */
app.get('/area', (req, res) => {

    const { token } = req.cookies;

    // se o token não existir, o usuário
    // teoricamente não tem login. retorna 501

    if( token !== undefined) {

        // token existe. verifica?
        jwt.verify(token, jwt_secret, {}, (err, info) => {
            if( err ) throw err;

            res.json(info);
        })
    } else res.status(501).send()
})

app.post("/login", (req, res) => {

    const { username, password } = req.body

    // enviaremos os dados pra autenticação
    userAuth( username, password).then((data) => {

        if(!data) {
            // erro no login
            res.status(404).json({error: "Email ou senha incorretos."})
        } else {
            // login com sucesso
            // Iremos criar o token de acesso
            jwt.sign({
                username,
                id:data.id
            }, jwt_secret, {}, (err, token) => {
                if( err ) throw err;

                res.cookie('token', token).json('OK')
            })
        }
    
    });
})

app.listen(3333)