import { useEffect, useState } from "react"
import {Container, Row, Card, CardBody, Form, FloatingLabel, Button} from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate, useParams } from "react-router-dom"
import { quill_default_formats, quill_default_modules } from "../helpers/quill-config"

export default function EditSinglePostPage()
{
    const {id} = useParams();
    const [titulo, setTitulo] = useState("")
    const [resumo, setResumo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [capa, setCapa] = useState("")
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        fetch(`http://localhost:3333/post/${id}`)
            .then(res => {
                res.json().then(info => {
                    setTitulo(info[0].titulo)
                    setResumo(info[0].resumo)
                    setConteudo(info[0].conteudo)

                    console.log("setamos.")
                })

            })
    }, [])

    async function updatePost(ev)
    {
        ev.preventDefault()

        const data = new FormData();
        data.set('post_id', id)
        data.set('titulo', titulo??'')
        data.set('resumo', resumo??'')
        data.set('conteudo', conteudo??'')

        if(capa?.[0])
            data.set('capa', capa?.[0])

        await fetch(`http://localhost:3333/post/${id}`, {
            method: "PUT",
            body: data,
            credentials: "include"
        }).then(() => {
            setRedirect(true)
        })

        
    }

    if(redirect) {
        return <Navigate to={`/${id}`} />
    }
    
    return (
        <Container>
            <Row>
                <Card className="my-4">
                    <CardBody>
                        <div className='mx-4 mt-4'>
                            <h1 className='text-center'>Editar Publicação</h1>
                            <hr />
                            <Form onSubmit={updatePost}>
                                <Form.Group className="mb-3" controlId="pubTitulo">
                                    <FloatingLabel
                                        controlId="pubTitulo"
                                        label="Título"
                                        className="mb-3">
                                        <Form.Control
                                            type="text"
                                            placeholder="Sua nova publicação"
                                            value={titulo}
                                            onChange={ev => {setTitulo(ev.target.value)}}
                                            />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="pubResumo">
                                    <FloatingLabel
                                        controlId="pubResumo"
                                        label="Resumo do conteúdo em poucas palavras"
                                        className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Resumo do conteúdo em poucas palavras"
                                        value={resumo}
                                        onChange={ev => {setResumo(ev.target.value)}}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Control type="file" className="mb-3"
                                    onChange={ev => setCapa(ev.target.files)}/>
                                <ReactQuill value={conteudo} onChange={setConteudo} modules={quill_default_modules()} formats={quill_default_formats()}/>
                                <div className="d-grid gap-2 mt-3">
                                    <Button type="submit" variant="success">Publicar</Button>
                                </div>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}