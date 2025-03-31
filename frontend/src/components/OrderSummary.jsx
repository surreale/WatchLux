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
    const doc = new jsPDF("p", "mm", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
  
    
    const dejaVuFont = await fetch("/fonts/dejavu-base64.txt").then(res => res.text());
    doc.addFileToVFS("DejaVuSans.ttf", dejaVuFont);
    doc.addFont("DejaVuSans.ttf", "DejaVu", "normal");
    doc.setFont("DejaVu");
  
    const today = new Date();
    const formattedDate = today.toLocaleDateString("hu-HU");
    const orderDate = formattedDate;
    const dueDate = formattedDate;
  
    
    const logoImg = await fetch("/logo152.png")
      .then(res => res.blob())
      .then(blob => new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }));
    doc.addImage(logoImg, "PNG", 15, 10, 25, 25);
  
   
    doc.setFontSize(16);
    doc.text("WatchLux", 45, 15);
    doc.setFontSize(10);
    doc.text("Mezőtúr, Stromfeld Aurél u. 7.", 45, 21);
    doc.text("service@watchlux.hu | +36 20 627 0071", 45, 26);
    doc.text("Adószám: 12345678-2-12 | Bankszámlaszám: 12345678-12345678-12345678", 45, 31);
  
    
    doc.setFontSize(22);
    doc.text("Számla", pageWidth / 2, 45, { align: "center" });
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Számla azonosító: ${invoiceId}`, pageWidth - 70, 52);
  
    
    doc.setTextColor(0);
    doc.setFontSize(11);
    doc.text("Szállító:", 15, 65);
    doc.text("WatchLux", 15, 71);
    doc.text("Mezőtúr, Stromfeld Aurél u. 7.", 15, 76);
    doc.text("service@watchlux.hu", 15, 81);
    doc.text("+36 20 627 0071", 15, 86);
    doc.text("Adószám: 12345678-2-12", 15, 91);
  
    doc.text("Vevő:", 110, 65);
    doc.text(`Név: ${savedShipping.name}`, 110, 71);
doc.text(`Cím: ${savedShipping.postalCode} ${savedShipping.city}`, 110, 76);
doc.text(`Utca: ${savedShipping.address}`, 110, 81);
doc.text(`Email: ${savedShipping.email}`, 110, 86);
doc.text(`Telefonszám: ${savedShipping.phone}`, 110, 91);
if (savedShipping.taxId) {
  doc.text(`Adószám: ${savedShipping.taxId}`, 110, 96);
}

   
doc.setFillColor(230);
doc.rect(15, 105, pageWidth - 30, 10, "F");

doc.setTextColor(0);
doc.setFontSize(9);


const leftMargin = 20;
const colWidth = (pageWidth - 2 * leftMargin) / 3;

doc.text(`Teljesítés dátuma: ${orderDate}`, leftMargin, 112);
doc.text(`Kiállítás dátuma: ${formattedDate}`, leftMargin + colWidth, 112);
doc.text(`Fizetési határidő: ${dueDate}`, leftMargin + colWidth * 2, 112);





  
    
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
        "27%",
        `${afa.toLocaleString("hu-HU")} Ft`,
        `${totalBrutto.toLocaleString("hu-HU")} Ft`
      ];
    });
  
    tableData.push([
      "Szállítási díj",
      "1 alkalom",
      "0 Ft",
      "0%",
      "0 Ft",
      "0 Ft (Ingyenes)"
    ]);
  
    autoTable(doc, {
      startY: 120,
      head: [["Megnevezés", "Mennyiség", "Nettó egységár", "ÁFA", "ÁFA összeg", "Bruttó"]],
      body: tableData,
      styles: { fontSize: 10, font: "DejaVu" },
      headStyles: { fillColor: [50, 50, 50], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 25 },
        2: { cellWidth: 30 },
        3: { cellWidth: 15 },
        4: { cellWidth: 30 },
        5: { cellWidth: 35 },
      }
    });
  
    
    const nettoOsszesen = +(totalPrice / 1.27).toFixed(2);
    const afaOsszesen = +(totalPrice - nettoOsszesen).toFixed(2);
    const yEnd = doc.lastAutoTable.finalY + 10;
  
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(`Nettó összesen: ${nettoOsszesen.toLocaleString("hu-HU")} Ft`, 15, yEnd);
    doc.text(`ÁFA összesen: ${afaOsszesen.toLocaleString("hu-HU")} Ft`, 15, yEnd + 6);
  
    doc.setFontSize(14);
    doc.setTextColor(30, 30, 180);
    doc.text(
      `Fizetendő végösszeg: ${Number(totalPrice).toLocaleString("hu-HU")} Ft`,
      15,
      yEnd + 16
    );
  
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