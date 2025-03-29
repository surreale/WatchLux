import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css"; // Egységes modal dizájn

export default function Profile({ showProfile, handleProfileClose }) {
    const [userData, setUserData] = useState({ nev: "", tel: "", email: "" });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("Nincs bejelentkezett felhasználó!");
                    return;
                }
                const response = await axios.get("http://localhost:8080/auth/profile", {
                    params: { userId }
                });
                if (!response.data) {
                    setError("Felhasználó nem található!");
                    return;
                }
                setUserData(response.data);
            } catch (error) {
                setError("Nem sikerült betölteni a profiladatokat!");
            }
        };

        if (showProfile) {
            fetchUserData();
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
            setSuccess("");
        }
    }, [showProfile]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId");
            await axios.put("http://localhost:8080/auth/update", {
                userId, nev: userData.nev, tel: userData.tel
            });
            setSuccess("Profil sikeresen frissítve!");
            setError("");
        } catch {
            setError("Hiba történt a profil frissítésekor!");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Az új jelszavak nem egyeznek!");
            return;
        }
        try {
            const userId = localStorage.getItem("userId");
            await axios.put("http://localhost:8080/auth/change-password", {
                userId, oldPassword, newPassword
            });
            setSuccess("Jelszó sikeresen megváltoztatva!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setError("");
        } catch (error) {
            setError(error.response?.data?.error || "Hibás régi jelszó!");
        }
    };

    const handleDeleteAccount = async () => {
        const confirmed = window.confirm("Biztosan törölni szeretnéd a profilodat?");
        if (!confirmed) return;

        try {
            const userId = localStorage.getItem("userId");
            await axios.delete(`http://localhost:8080/auth/delete/${userId}`);
            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            setError("Nem sikerült törölni a profilt!");
        }
    };

    if (!showProfile) return null;

    return (
        <div className="modal-overlay" onClick={handleProfileClose}>
            <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
                <button onClick={handleProfileClose} style={{ float: "right", background: "transparent", border: "none", fontSize: "20px" }}>✕</button>
                <h2>Profilom</h2>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="text"
                        placeholder="Név"
                        value={userData.nev}
                        onChange={(e) => setUserData({ ...userData, nev: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Telefonszám"
                        value={userData.tel}
                        onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        value={userData.email}
                        disabled
                    />
                    <button className="modal-buttons" type="submit">
                        Profil frissítése
                    </button>
                </form>

                <hr />

                <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="password"
                        placeholder="Régi jelszó"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Új jelszó"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Új jelszó megerősítése"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button className="modal-buttons" type="submit">
                        Jelszó módosítása
                    </button>
                </form>

                <hr />

                <button
                    className="modal-buttons"
                    style={{ backgroundColor: "#dc3545", marginTop: "10px" }}
                    onClick={handleDeleteAccount}
                >
                    Profil törlése
                </button>
            </div>
        </div>
    );
}
