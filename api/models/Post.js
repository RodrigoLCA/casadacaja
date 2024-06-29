import postgres from "postgres";
import sql from "../db.js";

export async function listPost(category = null)
{
    try {
        const obterPosts = await sql`
            SELECT * FROM noticia
        `

        return obterPosts
    } catch (err) {
        console.log("Erro ao capturar dados:", err.stack)
    }
}

export async function postCreate(data)
{
    const {titulo, resumo, conteudo, capa, user_id} = data

    try {
    const saveData = await sql`
        INSERT INTO noticia(
                titulo, subtitulo, conteudo, data_publicacao,
                id_categoria, imagem, status, visualizacoes,
                destaque, id_autor) VALUES (
                ${titulo},
                ${resumo},
                ${conteudo},
                CURRENT_TIMESTAMP,
                -10,
                ${capa},
                'publicado',
                0,
                FALSE,
                ${user_id}
                )
        `

        console.log("Nova publicação inserida!")
    } catch(err) {
        console.log("Erro ao inserir dados:", err.stack)
    }
}