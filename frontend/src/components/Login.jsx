import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./toast.css";
import "./Cart.css"; // közös modal stílus

export default function Login({ showLogin, handleLoginClose, onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const navigate = useNavigate();

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
            const response = await axios.post("http://localhost:8080/auth/login", {
                email,
                jelszo: password,
            });

            if (response.status === 200 && response.data.user) {
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userId", response.data.user.vasarloaz);
            
                // 🧹 Vendégként megadott adatok törlése
                localStorage.removeItem("savedBilling");
                localStorage.removeItem("savedShipping");
            
                onLoginSuccess();
                window.location.reload();
            
                const savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    localStorage.setItem("cartRestore", savedCart);
                }
            
                handleLoginClose();
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

    if (!showLogin) return null;

return (
    <>
        <div className="modal-overlay" onClick={handleLoginClose}>
            <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleLoginClose} style={{ float: "right", background: "transparent", border: "none", fontSize: "20px" }}>✕</button>
                <h2>Bejelentkezés</h2>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                    <input type="email" placeholder="E-mail cím" value={email} onChange={handleInputChange(setEmail)} required />
                    <input type="password" placeholder="Jelszó" value={password} onChange={handleInputChange(setPassword)} required />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button className="modal-buttons" type="submit" disabled={isLoggingIn}>
                        {isLoggingIn ? "Bejelentkezés..." : "Bejelentkezés"}
                    </button>
                </form>
            </div>
        </div>
        <div className={`toast-container ${showToast ? "show" : "hide"}`}>
            Sikeres bejelentkezés!
        </div>
    </>
);

}
