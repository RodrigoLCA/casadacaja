import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export default function LoginPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function login(ev) {
        ev.preventDefault();
            
            const response = await fetch("http://localhost:3333/login", {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {'Content-Type': 'application/json'},
            })

            
    }

    return (
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
    )
}