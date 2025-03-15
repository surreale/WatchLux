import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Login({ showLogin, handleLoginClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/auth/login", { email, jelszo: password });
            console.log(response.data.user); // Felhasználói adatokat visszakapjuk
            handleLoginClose();
            navigate("/"); // 🔹 Sikeres bejelentkezés után navigálás
        } catch (error) {
            setError(error.response?.data?.error || "Hiba történt!");
        }
    };

    return (
        <Modal show={showLogin} onHide={handleLoginClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bejelentkezés</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleLogin}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email cím</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Adja meg az email címét"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Adja meg a jelszavát"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <Button variant="primary" type="submit">
                        Bejelentkezés
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
