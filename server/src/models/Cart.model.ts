import { Schema, model, Document, Types, models } from "mongoose";

export interface ICart extends Document {
  product: Types.ObjectId;
  color: string;
  size: string;
  productcount: number;
  amount:number;
  user: Types.ObjectId;
}
 
const cartSchema = new Schema<ICart>(
  {
    product:{type: Schema.Types.ObjectId, ref: "Product", required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    productcount: { type: Number, required: true },
    amount: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Cart = models?.Cart || model<ICart>("Cart", cartSchema);
export default Cart;
