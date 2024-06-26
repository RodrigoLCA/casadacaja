import { Card, CardBody, Container, Row } from "react-bootstrap";

export default function IndexPage() {
    return (
        <Container>
            <Row>
                <Card className="my-4">
                    <CardBody>
                        Olá, mundo!
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}