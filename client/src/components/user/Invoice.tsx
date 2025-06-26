import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";

const Invoice: React.FC = () => {
  const printRef = useRef<HTMLDivElement | null>(null);
  const { state } = useLocation();
  const order = state?.order;

  if (!order) return <p>No order data received.</p>;

  const download = async () => {
    const elem = printRef.current;
    if (!elem) return;

    const canvas = await html2canvas(elem, { scale: 2 });
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();

    pdf.addImage(img, "PNG", 0, 0, pageWidth, 0);
    pdf.save(`invoice-${order._id.slice(-6)}.pdf`);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "20px", backgroundColor: "#f0f0f0" }}>
      <div
        ref={printRef}
        style={{
          maxWidth: "794px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "32px",
          boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)",
          minHeight: "1123px",
          fontFamily: "Arial, sans-serif",
          color: "#000",
          fontSize: "14px",
        }}
      >
        {/* Header */}
        <div style={{ borderBottom: "1px solid #000", paddingBottom: "16px", marginBottom: "24px", display: "flex", justifyContent: "space-between" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>INVOICE</h1>
          <div style={{ textAlign: "right" }}>
            <p><strong>YourStore Pvt Ltd</strong></p>
            <p>www.yourstore.com</p>
            <p>Email: support@yourstore.com</p>
          </div>
        </div>

        {/* Order Info */}
        <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between" }}>
          <div>
            <p><strong>Order ID:</strong> #{order._id.slice(0, 8)}</p>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div>
            <p><strong>Customer:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}, {order.pincode}</p>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <thead>
            <tr>
              {["Product", "Color", "Size", "Qty", "Unit Price", "Total"].map((head) => (
                <th
                  key={head}
                  style={{
                    border: "1px solid #000",
                    padding: "8px",
                    backgroundColor: "#ddd",
                    textAlign: head === "Unit Price" || head === "Total" ? "right" : "left",
                  }}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: any, index: number) => (
              <tr key={index}>
                <td style={{ border: "1px solid #000", padding: "8px" }}>{item.name}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>{item.color}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>{item.size}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>{item.productcount}</td>
                <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>₹{item.amount}</td>
                <td style={{ border: "1px solid #000", padding: "8px", textAlign: "right" }}>
                  ₹{item.amount * item.productcount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Summary */}
        <div style={{ width: "250px", marginLeft: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Subtotal:</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Delivery Fee:</span>
            <span>₹{order.deliveryFee}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Discount:</span>
            <span>{order.discount}%</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", borderTop: "1px solid #000", paddingTop: "8px", marginTop: "8px" }}>
            <span>Total:</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", fontSize: "12px", marginTop: "40px", color: "#555" }}>
          <p>Thank you for shopping with us!</p>
          <p>This is a computer-generated invoice and does not require a signature.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "24px" }}>
        <button
          onClick={download}
          style={{
            padding: "10px 20px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Invoice;
 