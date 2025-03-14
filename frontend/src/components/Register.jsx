import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./Register.css";

export default function Register({ showRegister, handleRegisterClose }) {
    const [nev, setNev] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.post("http://localhost:8080/auth/register", {  // 🔥 8080-as portot használunk
            nev,
            tel,
            email,
            jelszo
        });
        
            alert(response.data.message);
            handleRegisterClose(); // Bezárja a modált sikeres regisztráció után
        } catch (error) {
            alert(error.response?.data?.error || "Hiba történt a regisztráció során!");
        }
    };

    return (
        <Modal show={showRegister} onHide={handleRegisterClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Regisztráció</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Név</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Adja meg a nevét"
                            value={nev}
                            onChange={(e) => setNev(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Telefonszám</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Adja meg a telefonszámát"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>E-mail cím</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Adja meg az e-mail címét"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Adja meg a jelszavát"
                            value={jelszo}
                            onChange={(e) => setJelszo(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Regisztráció
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
