import { useContext, useEffect, useState } from "react"
import { Card, Col, Container, Row, Image, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import Post from "../components/Post";
import {format} from "date-fns"
import { UserContext } from "../userContext";

export default function SinglePostPage()
{
    const {id} = useParams();
    const [postInfo, setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext)

    console.log(userInfo)

    useEffect(() => {
        fetch(`http://localhost:3333/post/${id}`)
            .then( response => {
                response.json().then(postInfo => {
                    setPostInfo(postInfo[0])
                })
            })
    }, [])

    if(!postInfo) return ''

    if(postInfo)
        console.log(postInfo)

    return (
        <Container className="mt-4">
            <Row>
                <Card>
                    <Card.Body>
                        <Row>
                            {userInfo && userInfo.id != undefined && (
                                <Button variant="success" href={`${postInfo.id}/edit`}>Editar esta Publicação</Button>
                            )}
                            <h1 className="text-center">{postInfo.titulo}</h1>
                            <Image src={`http://localhost:3333/${postInfo.imagem}`} thumbnail />
                            <span>Data da publicação: <time>{format(new Date(postInfo.data_publicacao), "dd/MM/yyyy")}</time></span>
                            <div className="mt-3">
                                <Card.Text>
                                    <div dangerouslySetInnerHTML={{__html:"A rápida ovelha comeu a raposa negra"}} />
                                </Card.Text>
                            </div>
                        </Row>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}