import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login({showLogin, handleLoginClose}) {
    return (
        <Modal show={showLogin} onHide={handleLoginClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Bejelentkezés</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formLoginEmail">
              <Form.Label>Email cím</Form.Label>
              <Form.Control type="email" placeholder="Adja meg az email címét" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLoginPassword">
              <Form.Label>Jelszó</Form.Label>
              <Form.Control type="password" placeholder="Adja meg a jelszavát" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Bejelentkezés
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    )
}