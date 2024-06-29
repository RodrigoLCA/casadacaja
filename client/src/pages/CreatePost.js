import { useState } from "react"
import {Container, Row, Card, CardBody, Form, FloatingLabel, Button} from "react-bootstrap"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Navigate } from "react-router-dom"

const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

export default function CreatePost()
{
    const [titulo, setTitulo] = useState("")
    const [resumo, setResumo] = useState("")
    const [conteudo, setConteudo] = useState("")
    const [capa, setCapa] = useState("")
    const [redirect, setRedirect] = useState(false)

    async function createNewPost(ev) {
        

        const data = new FormData();
        data.set('titulo', titulo)
        data.set('resumo', resumo)
        data.set('conteudo', conteudo)
        data.set('capa', capa[0])


        ev.preventDefault()

        const response = await fetch('http://localhost:3333/post/create', {
            method: "POST",
            body: data,
            credentials: "include"
        })

        if(response.ok) {
            setRedirect(true)
        }
    }

    if(redirect) {
        <Navigate to={"/"} />
    }

    return (
        <Container>
            <Row>
                <Card className="my-4">
                    <CardBody>
                        <div className='mx-4 mt-4'>
                            <h1 className='text-center'>Nova Publicação</h1>
                            <hr />
                            <Form onSubmit={createNewPost}>
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
                                <ReactQuill value={conteudo} onChange={setConteudo} modules={modules} formats={formats}/>
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