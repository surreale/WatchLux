import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./Register.css";

export default function Register({showRegister, handleRegisterClose}) {
    return (
        <Modal show={showRegister} onHide={handleRegisterClose} centered>
<Modal.Header closeButton>
  <Modal.Title>Regisztráció</Modal.Title>
</Modal.Header>
<Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="formRegisterName">
      <Form.Label>Felhasználónév</Form.Label>
      <Form.Control type="text" className='des' placeholder="Adja meg a felhasználónevét" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formRegisterEmail">
      <Form.Label>E-mail cím</Form.Label>
      <Form.Control type="email" className='des' placeholder="Adja meg az e-mail címét" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formRegisterPassword">
      <Form.Label>Jelszó</Form.Label>
      <Form.Control type="password" className='des' placeholder="Adja meg a jelszavát" />
    </Form.Group>

    <Button variant="primary" className='btn' type="submit">
      Regisztráció
    </Button>
  </Form>
</Modal.Body>
</Modal>
    )
}