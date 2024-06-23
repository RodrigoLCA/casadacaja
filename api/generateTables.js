import sql from "./db.js"
import bcrypt from "bcrypt"

async function generateUsuarioTable() {
    await sql`
        CREATE TABLE usuario (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(128) NOT NULL,
            email VARCHAR(128) NOT NULL,
            senha VARCHAR(256) NOT NULL,
            data_criacao TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `.then(() => {
        console.log("Tabela de Usuários gerada com sucesso!");

        return true
    })
}

async function createSuperUser() {
    
    const saltRounds = 10;
    const myPlaintextPassword = 'batatinha2025';

    bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
        // Store hash in your password DB.
        await sql`
            INSERT INTO usuario (nome, email, senha)
            VALUES ('Graça Maria Lopes', 'gmlopes2007@gmail.com', ${hash})
        `.then(() => {
            console.log("Usuario inserido com sucesso!")
        })
    });
}