import { Card, CardBody, Col, Row, Image, Button } from "react-bootstrap"

export default function Post({id, titulo, resumo, conteudo, capa})
{

    return (
        <Card>
            <Card.Body>
                <Row>
                    <Col>
                        <Image src={"http://localhost:3333/" + capa} thumbnail />
                    </Col>
                    <Col>
                        <Card.Title>{titulo}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                            Exemplo de resumo aqui garai
                        </Card.Subtitle>
                        <Card.Text>
                            A rápida ovelha comeu a raposa negra
                        </Card.Text>
                        <Card.Footer>
                            <Button href={`${id}`} variant="success" size="sm">CONTINUE LENDO</Button>
                        </Card.Footer>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}