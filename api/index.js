import express from "express"
import cors from "cors"
import { userAuth } from "./models/User.js"
import jwt from "jsonwebtoken"
import "dotenv/config"

const app = express()

// JWT Secret from .ENV file
const jwt_secret = process.env.jwt_secret

console.log(jwt_secret)

app.use(cors({
    credentials: true,
    origin: true,
}))
app.use(express.json())

app.get("/", (req, res) => {
    res.json('test ok!')
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