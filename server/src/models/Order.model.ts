import { Schema, model, Document, Types, models } from "mongoose";

interface OrderItem {
  product: Types.ObjectId;
  seller: Types.ObjectId;
  color: string;
  size: string;
  productcount: number;
  amount: number;
  name: string;
  image: string;
  Orderstatus: "Pending" | "Dispatched" | "In Transit" | "Out for Delivery" | "Delivered"|"Confirmed";
  paymentMode: "cod" | "online";
  paymentStatus: "pending" | "completed" | "failed";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
}

export interface IOrder extends Document {
  updatedAt: any;
  createdAt: any;
  user: Types.ObjectId;
  items: OrderItem[];
  name: string;
  address: string;
  pincode: number;
  phone: number;
  subtotal: number;
  deliveryFee: number;
  discount:number;
  totalAmount: number;

}

const orderItemSchema = new Schema<OrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    productcount: { type: Number, required: true },
    amount: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    Orderstatus: {
      type: String,
      enum: ["Pending","Confirmed", "Dispatched", "In Transit", "Out for Delivery", "Delivered"],
      default: "Pending",
    },
    paymentMode: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: Number, required: true },
    phone: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, default: 40 },
    discount: { type: Number },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = models?.Order || model<IOrder>("Order", orderSchema);
export default Order;
