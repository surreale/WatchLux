import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./toast.css"; // A toast CSS-hez

export default function Login({ showLogin, handleLoginClose, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

    // 🔹 Ha a modal megnyílik, törölje a mezőket
    useEffect(() => {
        if (showLogin) {
            setEmail("");
            setPassword("");
            setError("");
            setIsLoggingIn(false);
        }
    }, [showLogin]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
    
        if (isLoggingIn) return;
        setIsLoggingIn(true);
    
        if (!email.trim() || !password.trim()) {
            setError("Az e-mail és a jelszó megadása kötelező!");
            setIsLoggingIn(false);
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:8080/auth/login", { email, jelszo: password });
    
            if (response.status === 200 && response.data.user) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", response.data.user.vasarloaz); // 🔥 Helyes oszlopnév használata
    
                onLoginSuccess();
    
                setShowToast(true);
                setTimeout(() => {
                    setShowToast(false);
                    navigate("/products");
                    handleLoginClose();
                }, 2000);
            } else {
                setError("Hibás e-mail vagy jelszó!");
                setIsLoggingIn(false);
            }
        } catch (error) {
            setError(error.response?.data?.error || "Hiba történt!");
            setIsLoggingIn(false);
        }
    };
    

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setIsLoggingIn(false);
        setError("");
    };

    return (
        <>
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
                                onChange={handleInputChange(setEmail)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Jelszó</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Adja meg a jelszavát"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                            />
                        </Form.Group>

                        {error && <p style={{ color: "red" }}>{error}</p>}

                        <Button variant="primary" type="submit" disabled={isLoggingIn}>
                            {isLoggingIn ? "Bejelentkezés..." : "Bejelentkezés"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* 🔥 Smooth toast üzenet a lap tetején */}
            <div className={`toast-container ${showToast ? "show" : "hide"}`}>
                ✅ Sikeres bejelentkezés!
            </div>
        </>
    );
}
