import { useEffect, useState } from "react";
import { Card, CardBody, Container, Row } from "react-bootstrap";
import Post from "../components/Post";

export default function IndexPage() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("http://localhost:3333/post/list").then(response => {
            response.json().then(posts => {
                setPosts(posts)   
    
            })
        })
    }, [])

    return (
        <Container>
            <Row>
                {/* Card de apresentação */}
                <Card className="my-4">
                    <Card.Body>
                        Olá!
                    </Card.Body>
                </Card>

                {/* Iremos fazer iterações nas publicações para exibí-las */}
                {posts.length > 0 && posts.map(post => (
                    <Post id={post.id} titulo={post.titulo} resumo={post.resumo} capa={post.imagem} conteudo={post.content} />

                ))}
            </Row>
        </Container>
    )
}