
import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css"; 

export default function Profile({ showProfile, handleProfileClose }) {
  const [userData, setUserData] = useState({ nev: "", tel: "", email: "" });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [orders, setOrders] = useState([]);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    if (showProfile) {
      document.body.classList.add("modal-open");
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      axios
        .get(`http://localhost:8080/auth/profile?userId=${userId}`)
        .then((res) => setUserData(res.data))
        .catch(() => setError("Nem sikerült betölteni a profiladatokat!"));

      axios
        .get(`http://localhost:8080/auth/orders/${userId}`)
        .then((res) => setOrders(res.data))
        .catch(() => setOrders([]));

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
      setSuccess("");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showProfile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      await axios.put("http://localhost:8080/auth/update", {
        userId,
        nev: userData.nev,
        tel: userData.tel,
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
        userId,
        oldPassword,
        newPassword,
      });
      setSuccess("Jelszó sikeresen megváltoztatva!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Hibás régi jelszó!");
    }
  };

  const handleDeleteProfile = async () => {
    const confirmDelete = window.confirm("Biztosan törölni szeretnéd a profilodat?");
    if (!confirmDelete) return;

    try {
      const userId = localStorage.getItem("userId");
      await axios.delete("http://localhost:8080/auth/delete-profile", {
        data: { userId },
      });
      localStorage.clear();
      setShowDeleteSuccess(true);
      setTimeout(() => {
        setShowDeleteSuccess(false);
        window.location.href = "/";
      }, 2500);
    } catch {
      alert("Hiba történt a profil törlésekor.");
    }
  };

  if (!showProfile) return null;

  return (
    <div className="modal-overlay" onClick={handleProfileClose}>
      <div className="modal-custom" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleProfileClose}
          style={{ float: "right", background: "transparent", border: "none", fontSize: "20px" }}
        >
          ✕
        </button>
        <h2>Profilom</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        {showDeleteSuccess && (
          <div className="delete-success-box">Fók sikeresen törölve!</div>
        )}

        <form onSubmit={handleProfileUpdate} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="text"
            value={userData.nev}
            onChange={(e) => setUserData({ ...userData, nev: e.target.value })}
            placeholder="Név"
            required
          />
          <input
            type="text"
            value={userData.tel}
            onChange={(e) => setUserData({ ...userData, tel: e.target.value })}
            placeholder="Telefonszám"
            required
          />
          <input type="email" value={userData.email} disabled placeholder="E-mail" />
          <button type="submit" className="modal-buttons">
            Adatok frissítése
          </button>
        </form>

        <hr />

        <h3 style={{ textAlign: "center" }}>Jelszó módosítása</h3>
        <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Régi jelszó"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Új jelszó"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Új jelszó megerősítése"
            required
          />
          <button type="submit" className="modal-buttons">
            Jelszó módosítása
          </button>
        </form>

        <button
          onClick={handleDeleteProfile}
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            borderRadius: "30px",
            fontWeight: "bold",
            border: "none",
            width: "100%",
          }}
        >
          Profil törlése
        </button>

        <hr />
        <h3 style={{ textAlign: "center", marginTop: "20px" }}>Korábbi rendeléseim</h3>
        {orders.length === 0 ? (
          <p style={{ textAlign: "center" }}>Még nincs rendelésed.</p>
        ) : (
          <div className="order-history">
            {orders.map((order, index) => (
              <div key={index} className="order-item">
                <strong>{order.megnevezes}</strong> – {order.db} db – {order.ar} Ft<br />
                <small>Számla: #{order.szamlaaz} – {new Date(order.datum).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}