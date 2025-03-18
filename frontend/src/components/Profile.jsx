import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function Profile({ showProfile, handleProfileClose }) {
    const [userData, setUserData] = useState({ nev: "", tel: "", email: "" });
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        // Betöltjük a felhasználó adatait
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
                console.error("Hiba történt a profiladatok betöltésekor:", error);
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

    // Profil frissítése (név, telefonszám)
    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            const userId = localStorage.getItem("userId");
            await axios.put("http://localhost:8080/auth/update", 
                { userId, nev: userData.nev, tel: userData.tel }
            );
    
            setSuccess("Profil sikeresen frissítve!");
            setError("");
        } catch (error) {
            setError("Hiba történt a profil frissítésekor!");
        }
    };
    

    // Jelszó módosítása
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
    

    return (
        <Modal show={showProfile} onHide={handleProfileClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Profilom</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                
                <Form onSubmit={handleProfileUpdate}>
                    <h5>Személyes adatok</h5>
                    <Form.Group className="mb-3">
                        <Form.Label>Név</Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.nev}
                            onChange={(e) => setUserData({ ...userData, nev: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Telefonszám</Form.Label>
                        <Form.Control
                            type="text"
                            value={userData.tel}
                            onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>E-mail (nem módosítható)</Form.Label>
                        <Form.Control type="email" value={userData.email} disabled />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Adatok frissítése
                    </Button>
                </Form>

                <hr />

                <h5>Jelszó módosítása</h5>
                <Form onSubmit={handlePasswordChange}>
                    <Form.Group className="mb-3">
                        <Form.Label>Régi jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Új jelszó</Form.Label>
                        <Form.Control
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Új jelszó megerősítése</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="btndes">
                        Jelszó módosítása
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
