import postgres from "postgres"
import bcrypt from "bcrypt"
import sql from "../db.js"

export async function userAuth(username, password) {

    // Primeiro verificaremos se há o e-mail no banco de dados, para fazer a comparação de senhas
    const fetchUser = await sql`
        SELECT * FROM usuario
        WHERE email=${username}
        LIMIT 1
    `

    
    
    if(fetchUser.count > 0) {
        // segunda parte: checaremos a senha com o bcrypt
        const match = await bcrypt.compare(password, fetchUser[0].senha)
        
        if(match) {
            
            // antes de retornar, teremos que remover a senha criptografada.
            delete fetchUser[0].senha
            return Promise.resolve(fetchUser[0])

        } else return false
    } else return false
}