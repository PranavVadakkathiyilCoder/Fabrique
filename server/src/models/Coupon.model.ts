import { Schema, model, Document, Types, models } from "mongoose";

export interface ICoupon extends Document {
  code: string;
  expaire: Date;
  usedBy: Types.ObjectId[];

  createdBy: Types.ObjectId;
  maxUsage?: number;
  usageCount: number;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true },
    expaire: { type: Date, required: true },
    usedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    maxUsage: { type: Number },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Coupon = models?.Coupon || model<ICoupon>("Coupon", couponSchema);
export default Coupon;
