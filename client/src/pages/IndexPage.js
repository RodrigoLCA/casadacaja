import { useEffect, useState } from "react";
import { Card, CardBody, Container, Row } from "react-bootstrap";

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
                {posts.length > 0 && posts.map(post => (
                    <Card className="my-4">
                    <CardBody>
                        {post.titulo}
                    </CardBody>
                </Card>
                ))}
            </Row>
        </Container>
    )
}