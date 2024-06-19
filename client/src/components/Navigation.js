import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Logo from '../assets/images/navlogo.png'


export default function Navigation({current, lang})
{
    return (
        <Navbar expand="lg" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src={Logo}
                        height="70"
                        className="d-inline-block align-top"
                        alt="Logomarca do Coletivo da Casa do Pé da Cajá"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">

                        <Nav.Link href="#"
                            active={current==='home'??"true"}
                            >Início</Nav.Link>

                        <Nav.Link href="/ponto-cultural"
                            active={current==='ponto'??"true"}
                            >Conheça o Ponto Cultural</Nav.Link>

                        <Nav.Link href="#"
                            active={current==='noticias'??"true"}
                            >Notícias & Eventos</Nav.Link>

                        <Nav.Link href="#"
                            active={current==='educacao'??"true"}
                            >Educação Ambiental</Nav.Link>

                        <Nav.Link href="#"
                            active={current==='projetos'??"true"}
                            >Projetos</Nav.Link>

                        <Nav.Link href="#"
                            active={current==='contato'??"true"}
                            >Contato</Nav.Link>

                        <NavDropdown title={lang==='br'||lang==undefined?"Português":"English"} id="language-nav-dropdown">
                            <NavDropdown.Item href="#">Português</NavDropdown.Item>
                            <NavDropdown.Item href="#">English</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}