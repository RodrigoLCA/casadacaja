import { useContext, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Row } from 'react-bootstrap'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../userContext'

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUserInfo} = useContext(UserContext)

    async function login(ev) {
        ev.preventDefault();
            
            const response = await fetch("http://localhost:3333/login", {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',

            })

            // Deu certo? Redirecionaremos para homepage
            if(response.ok) {
                response.json().then(userInfo => {
                    setUserInfo(userInfo)
                    setRedirect(true)
                })
                console.log("home peige")
                
            } else {
                alert('Usuário ou senha incorretos')
            }
            
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <Container>
            <Row>
                <Card className="my-4">
                    <CardBody>
                        <div className='mx-4 mt-4'>
                            <h1 className='text-center'>Acesso</h1>
                            <Form method='post' onSubmit={login}>
                                <Form.Group className="mb-3 "
                                    controlId="formEmail">
                                        <Form.Label>E-mail</Form.Label>
                                        <Form.Control type="email"
                                            placeholder="E-mail"
                                            value={username}
                                            onChange={ev => setUsername(ev.target.value)}/>
                                </Form.Group>

                                <Form.Group className="mb-3"
                                    controlId="formPassword">
                                        <Form.Label>Senha</Form.Label>
                                        <Form.Control type="password"
                                            placeholder="Senha"
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)}/>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Acessar
                                </Button>
                            </Form>
                        </div>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    
    )
}