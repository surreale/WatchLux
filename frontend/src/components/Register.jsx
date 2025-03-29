import { useState } from "react";
import axios from "axios";
import "./Register.css";

export default function Register({ showRegister, handleRegisterClose }) {
    const [nev, setNev] = useState("");
    const [tel, setTel] = useState("+36");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [hibaUzenet, setHibaUzenet] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);

    const handleNevChange = (e) => {
        let input = e.target.value;
        let cleanInput = input.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s-]/g, "");
        let formattedInput = cleanInput
            .toLowerCase()
            .replace(/(^\w|[\s-]\w)/g, (match) => match.toUpperCase());

        if (formattedInput.length > 40) {
            formattedInput = formattedInput.substring(0, 40);
        }

        setNev(formattedInput);
    };

    const handleEmailChange = (e) => {
        let input = e.target.value;
        if (input.length > 30) {
            input = input.substring(0, 30);
        }
        setEmail(input);
    };

    const handleTelChange = (e) => {
        let input = e.target.value;
        if (!input.startsWith("+36")) {
            input = "+36";
        }
        let cleanNumber = input.replace(/\D/g, "").substring(2, 11);
        setTel("+36" + cleanNumber);
    };

    const isValidPassword = (password) => {
        const minLength = password.length >= 8;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        return minLength && hasUpper && hasLower;
    };

    const handlePasswordChange = (e) => {
        let input = e.target.value;
        if (input.length > 30) {
            input = input.substring(0, 30);
        }
        setJelszo(input);
        setPasswordValid(isValidPassword(input));
    };

    const handlePasswordFocus = () => {
        setPasswordTouched(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setHibaUzenet("");

        const nameParts = nev.trim().split(/\s+/);
        if (nameParts.length < 2) {
            setHibaUzenet("Kérlek, add meg a teljes nevedet (pl. Vezetéknév Keresztnév)!");
            return;
        }

        if (!passwordValid) {
            setHibaUzenet("A jelszó nem felel meg a követelményeknek!");
            return;
        }

        const phoneNumber = tel.replace("+", "");

        try {
            const response = await axios.post("http://localhost:8080/auth/register", {
                nev,
                tel: phoneNumber,
                email,
                jelszo
            });

            if (!response.data.userId) {
                setHibaUzenet("Nem sikerült regisztrálni: hiányzó user ID.");
                return;
            }

            alert(response.data.message);
            handleRegisterClose();

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userId", response.data.userId);

            const savedCart = localStorage.getItem("cart");
            if (savedCart) {
                localStorage.setItem("cartRestore", savedCart);
            }

            window.location.reload();

        } catch (error) {
            setHibaUzenet(error.response?.data?.error || "Hiba történt a regisztráció során!");
        }
    };

    if (!showRegister) return null;

    return (
        <div className="modal-overlay" onClick={handleRegisterClose}>
            <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleRegisterClose} style={{ float: "right", background: "transparent", border: "none", fontSize: "20px" }}>✕</button>
                <h2 className="modal-title">Regisztráció</h2>

                {hibaUzenet && <p className="text-danger">{hibaUzenet}</p>}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Név"
                        value={nev}
                        onChange={handleNevChange}
                        className="form-control"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Telefonszám"
                        value={tel}
                        onChange={handleTelChange}
                        className="form-control"
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail cím"
                        value={email}
                        onChange={handleEmailChange}
                        className="form-control"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Jelszó"
                        value={jelszo}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        className="form-control"
                        required
                    />
                    {passwordTouched && (
                        <p className={passwordValid ? "text-success" : "text-danger"}>
                            A jelszónak legalább 8 karakter hosszúnak kell lennie,
                            kis- és nagybetűt is tartalmaznia kell.
                        </p>
                    )}

                    <button type="submit" className="btn-primary" disabled={!passwordValid}>
                        Regisztráció
                    </button>
                </form>
            </div>
        </div>
    );
}
