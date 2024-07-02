import { Card, FloatingLabel, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import { quill_default_formats, quill_default_modules } from "../helpers/quill-config";

export default function ConfigPage()
{
    return(
        <Card className="mt-4">
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Conteúdo</Form.Label>
                        <ReactQuill value={""} modules={quill_default_modules()} formats={quill_default_formats()} />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    )
}