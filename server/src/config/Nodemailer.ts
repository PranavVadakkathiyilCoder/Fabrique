import nodemailer from "nodemailer";

interface OrderItem {
  name: string;
  size?: string;
  color?: string;
  productcount: number;
  amount: number;
}

interface EmailData {
  name: string;
  address: string;
  pincode: string;
  phone: string;
  paymentMode: string;
  email: string;
  items: OrderItem[];
  totalAmount: number;
}

export const sendOrderConfirmationEmail = async (data: EmailData) => {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "438029c991e843",
      pass: "4f88b35625a7a6",
    },
  });

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 8px; border: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border: 1px solid #eee;">${item.size || "-"}</td>
        <td style="padding: 8px; border: 1px solid #eee;">${item.color || "-"}</td>
        <td style="padding: 8px; border: 1px solid #eee;">${item.productcount}</td>
        <td style="padding: 8px; border: 1px solid #eee;">₹${item.amount}</td>
      </tr>
    `
    )
    .join("");

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color: #4CAF50;">Thank you for your order, ${data.name}!</h2>
      <p>We’ve received your order and will process it soon. Here's a summary:</p>

      <h3>Shipping Details</h3>
      <p>
        <strong>Address:</strong> ${data.address}, ${data.pincode}<br />
        <strong>Phone:</strong> ${data.phone}<br />
        <strong>Payment Mode:</strong> ${data.paymentMode}
      </p>

      <h3>Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
        <thead>
          <tr>
            <th style="padding: 8px; background: #f4f4f4; border: 1px solid #ccc;">Product</th>
            <th style="padding: 8px; background: #f4f4f4; border: 1px solid #ccc;">Size</th>
            <th style="padding: 8px; background: #f4f4f4; border: 1px solid #ccc;">Color</th>
            <th style="padding: 8px; background: #f4f4f4; border: 1px solid #ccc;">Qty</th>
            <th style="padding: 8px; background: #f4f4f4; border: 1px solid #ccc;">Amount</th>
          </tr>
        </thead> 
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="margin-top: 20px; font-size: 16px;"><strong>Total Amount:</strong> ₹${data.totalAmount}</p>

      <p style="margin-top: 30px;">We’ll send another email once your items are shipped. Thank you for shopping with <strong>FABRIQUE.CO</strong>!</p>

      <footer style="margin-top: 40px; font-size: 12px; color: #777;">
        <hr/>
        <p>&copy; ${new Date().getFullYear()} FABRIQUE.CO — All rights reserved.</p>
      </footer>
    </div>
  `;

  await transport.sendMail({
    from: '"FABRIQUE.CO" <fabrique.com>',
    to: data.email,
    subject: "🛍️ Your Order has been Successfully Placed!",
    html: htmlBody,
  });
};
