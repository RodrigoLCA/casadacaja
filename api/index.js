import express from "express"
import cors from "cors"
import { userAuth } from "./models/User.js"

const app = express()

app.use(cors())
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

            res.json({error: "Email ou senha incorretos."})
        } else {
            // login com sucesso
            res.json(data);
        }
    
    });
})

app.listen(3333)