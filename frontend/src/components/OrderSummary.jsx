import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import "./Checkout.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { invoiceId, savedShipping, orderCart, totalPrice } = location.state || {};

  if (!invoiceId || !savedShipping || !orderCart) {
    return <p className="cl">Hiba: hiányzó rendelési adatok.</p>;
  }

  const handleDownloadInvoice = async () => {
    const doc = new jsPDF("p", "mm", "a4", true);
    const pageWidth = doc.internal.pageSize.getWidth();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("hu-HU");
    const orderDate = formattedDate;
    const dueDate = formattedDate;

    
    const robotoFont = await fetch("/fonts/Roboto-Regular.ttf")
      .then(res => res.blob())
      .then(blob => new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.readAsDataURL(blob);
      }));

    doc.addFileToVFS("Roboto-Regular.ttf", robotoFont);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    
    const logoImg = await fetch("/logo152.png").then(res => res.blob()).then(blob => new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    }));

    doc.addImage(logoImg, "PNG", 14, 10, 30, 30);

    doc.setFontSize(22);
    doc.setTextColor(40);
    doc.setFont(undefined, "bold");
    doc.text("Számla", pageWidth / 2, 20, { align: "center" });

   
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.setFont(undefined, "normal");
    doc.text("Eladó:", 14, 50);
    doc.setFont(undefined, "bold");
    doc.text("WatchLux", 14, 56);
    doc.setFont(undefined, "normal");
    doc.text("Mezőtúr, Stromfeld Aurél u. 7.", 14, 62);
    doc.text("service@watchlux.hu", 14, 68);
    doc.text("+36 20 627 0071", 14, 74);
    doc.text("Adószám: 12345678-2-12", 14, 80);
    doc.text("Bankszámlaszám: 11111111-11111111-11111111", 14, 86);

    doc.setFont(undefined, "bold");
    doc.text("Számla információk:", 14, 94);
    doc.setFont(undefined, "normal");
    doc.text(`Számla azonosító: ${invoiceId}`, 14, 100);
    doc.text(`Teljesítés dátuma: ${orderDate}`, 14, 106);
    doc.text(`Kiállítás dátuma: ${formattedDate}`, 14, 112);
    doc.text(`Fizetési határidő: ${dueDate}`, 14, 118);
    doc.text(`Fizetési mód: Banki átutalás`, 14, 124);

    
    doc.line(105, 40, 105, 135);
    let y = 50;
    doc.setFont(undefined, "normal");
    doc.text("Vevő:", 120, y);
    doc.setFont(undefined, "bold");
    doc.text(savedShipping.name, 120, (y += 6));
    doc.setFont(undefined, "normal");
    doc.text(`${savedShipping.postalCode} ${savedShipping.city}`, 120, (y += 6));
    doc.text(savedShipping.address, 120, (y += 6));
    doc.text(savedShipping.email, 120, (y += 6));
    doc.text(savedShipping.phone, 120, (y += 6));
    if (savedShipping.taxId) {
      doc.text(`Adószám: ${savedShipping.taxId}`, 120, (y += 6));
    }

    const tableData = orderCart.map((item) => {
      const qty = item.mennyiseg || 1;
      const brutto = Number(item.ar);
      const netto = +(brutto / 1.27).toFixed(2);
      const totalNetto = +(netto * qty).toFixed(2);
      const totalBrutto = +(brutto * qty).toFixed(2);
      const afa = +(totalBrutto - totalNetto).toFixed(2);

      return [
        item.megnevezes,
        `${qty} db`,
        `${netto.toLocaleString("hu-HU")} Ft`,
        `27%`,
        `${afa.toLocaleString("hu-HU")} Ft`,
        `${totalBrutto.toLocaleString("hu-HU")} Ft`,
      ];
    });

    tableData.push([
      "Szállítási díj", "1 alkalom", "0 Ft", "0%", "0 Ft", "0 Ft (Ingyenes)"
    ]);

    autoTable(doc, {
      startY: 140,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 20 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15 },
        4: { cellWidth: 30 },
        5: { cellWidth: 35 },
      },
      head: [["Megnevezés", "Mennyiség", "Nettó egységár", "ÁFA", "ÁFA összeg", "Bruttó"]],
      body: tableData,
    });

    const nettoOsszesen = +(totalPrice / 1.27).toFixed(2);
    const afaOsszesen = +(totalPrice - nettoOsszesen).toFixed(2);
    const yEnd = doc.lastAutoTable.finalY + 10;

    doc.setFont(undefined, "bold");
    doc.text(`Nettó összesen: ${nettoOsszesen.toLocaleString("hu-HU")} Ft`, 14, yEnd);
    doc.text(`ÁFA összesen: ${afaOsszesen.toLocaleString("hu-HU")} Ft`, 14, yEnd + 6);
    doc.setFontSize(14);
    doc.setTextColor(50, 50, 150);
    doc.text(`Fizetendő végösszeg: ${Number(totalPrice).toLocaleString("hu-HU")} Ft`, 14, yEnd + 16);

    doc.save(`szamla_${invoiceId}.pdf`);
  };

  return (
    <div className="checkout-page">
      <h2 className="cl">✅ Sikeres megrendelés!</h2>
      <div className="checkout-content">
        <div className="checkout-cart-summary">
          <p><strong>Számla azonosító:</strong> {invoiceId}</p>
          <p><strong>Név:</strong> {savedShipping.name}</p>
          <p><strong>Email:</strong> {savedShipping.email}</p>
          <p><strong>Telefonszám:</strong> {savedShipping.phone}</p>
          <p><strong>Cím:</strong> {savedShipping.address}</p>
          <p><strong>Város:</strong> {savedShipping.city}</p>
          <p><strong>Irányítószám:</strong> {savedShipping.postalCode}</p>
          {savedShipping.taxId && (
            <p><strong>Adószám:</strong> {savedShipping.taxId}</p>
          )}

          <h4>Megrendelt termékek:</h4>
          <ul>
            {orderCart.map((item) => (
              <li key={item.oraaz}>
                {item.megnevezes} – {item.mennyiseg || 1} db – {Number(item.ar).toLocaleString()} Ft
              </li>
            ))}
          </ul>

          <h4>Végösszeg: {Number(totalPrice).toLocaleString()} Ft</h4>

          <button className="payment-button" onClick={handleDownloadInvoice}>
            Számla letöltése
          </button>
          <button className="vissza2" onClick={() => navigate("/")}>Vissza a főoldalra</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;