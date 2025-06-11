import { Schema, model, Document, Types, models } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price:number,
  oldprice:number,
  images: string[]; // URLs
  colors: string[];
  sizes: string[];
  totalStock: number;
  seller: Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    oldprice: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    colors: [{ type: String, required: true }],
    sizes: [{ type: String, required: true }],
    totalStock: { type: Number, required: true },
    seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProduct>("Product", productSchema);
export default Product;
