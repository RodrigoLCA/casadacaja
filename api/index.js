import express from "express"
import cors from "cors"
import { userAuth } from "./models/User.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import cookieParser from "cookie-parser"
import multer from "multer"
import fs from "fs"
import { join } from "path"
import { listPost, postCreate } from "./models/Post.js"

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

    console.log(typeof token)
    console.log(token)
    if( token !== undefined && token) {

        // token existe. verifica?
        jwt.verify(token, jwt_secret, {}, (err, info) => {
            if( err ) throw err;

            res.json(info);
        })
    } else res.status(501).send()
})

app.post('/logout', (req, res) => {
    res.cookie("token", "").status(200).send()
})

app.get("/post/list", async (req, res) => {
    const obterPosts = await listPost()


    res.json(obterPosts).send()
})

/* Na rota /post/create nós iremos capturar as informações
   Vindas do usuário, e inclusive a imagem que ele enviou
   Para salvar no banco de dados, e fornecer de volta uma resposta.
   */
const uploadMiddleware = multer({ dest: "uploads" })
app.post("/post/create", uploadMiddleware.single("capa"), async (req, res) => {

    const { token } = req.cookies;

    if(token !== undefined && token) {
        jwt.verify(token, jwt_secret, {}, async (err, info) => {
            if( err ) throw err

            const {titulo, resumo, conteudo} = req.body
            const {originalname, path} = req.file;

            const parts = originalname.split("."),
                  DOT = '.',
                  ext = parts[parts.length-1],
                  newPath = [path, ext].join(DOT)

            fs.renameSync(path, newPath)

            await postCreate({
                titulo,
                resumo,
                conteudo,
                capa: newPath,
                user_id: info.id
            })

            console.log(postCreate)
        })
    } else {
        res.status(404).json({status:"User not allowed to perform this action."})
    }

    

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

                res.cookie('token', token).json({
                    id: data.id,
                    username: username
                })
            })
        }
    
    });
})

app.listen(3333)